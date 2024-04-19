import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import User from "./user";
import AuthContext from '../../store/auth-context';
function addUser() {
    const authCtx = useContext(AuthContext);
    // const authCtx = useContext(AuthContext);

    // console.log(authCtx);
    const isAdmin = authCtx.role === 0 || authCtx.role === "0";
    const isManager = authCtx.role === 1 || authCtx.role === "1";
    const isUser = authCtx.role === 2 || authCtx.role === "2";
    const [formData, setFormData] = useState({
        name: "",
        communityid: isManager ? authCtx.communityid : "0",
        thaaliuser: "0",
        email: "",
        role: isAdmin ? 0 : 1,
        password: "",
        headcount: "1",
        // unit: '',
        phoneno: "",
        // planValidTill: "",
        status: 1,
        address: "",
        createdat: Date.now(),
        updatedat: Date.now(),
    });
    const [ComValues, setComValues] = useState([]);

    useEffect(() => {
        isAdmin && (
            fetchComData())
    }, []);

    const fetchComData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/community', {
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                },
                withCredentials: true,
            });

            const transformedData = response.data.map(item => ({
                _id: item._id,
                name: item.name,
                address: `${item.address}`,
                status: item.status,
                createdat: item.createdat,
                updatedat: item.updatedat,
            }));

            setComValues(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleChange = (e) => {
        // const { name, value } = e.target;
        // setFormData((prevData) => ({
        // ...prevData,
        // [name]: value,
        // }));
        const { name, value } = e.target;
        setFormData((prevData) => {
            // Convert strings to integers for specific fields
            const intValue = [
                // "communityid",
                // "thaaliuser",
                "role",

            ].includes(name)
                ? parseInt(value, 10)
                : value;

            // Format date fields
            const formattedValue = name.endsWith("at")
                ? new Date(value).toISOString()
                : intValue;

            return {
                ...prevData,
                [name]: formattedValue,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            setFormData((prevData) => ({
                ...prevData,
                createdat: new Date().toISOString(),
                updatedat: new Date().toISOString(),
            }));
            const response = await fetch("http://localhost:3000/users/add", {
                method: "POST",
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("User created successfully");
                window.location.reload();
                // Optionally, you can reset the form or perform any other actions
            } else {
                console.error("Failed to create user");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div
            className="modal modal-blur fade"
            id="modal-report"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
        >
            <form method="post" onSubmit={handleSubmit}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New User</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-selectgroup-boxes row mb-3">
                            <div className="row">
                                <div className="col-lg-6">
                                    <label className="form-label required">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {isAdmin && (
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label required">
                                                communityid
                                            </label>
                                            <select
                                                className="form-select"
                                                name="communityid"
                                                value={formData.communityid}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option
                                                    value="0"
                                                    defaultValue="true"
                                                    disabled={true}
                                                >
                                                    select One
                                                </option>
                                                {/* <option value="1">Upleta</option>
                                            <option value="2">Rajkot</option>
                                            <option value="3">Jamnagar</option> */}
                                                {ComValues.map(community => (
                                                    <option key={community._id} value={community._id}>
                                                        {community.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>)}
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                            <label className="form-label required">User type</label>
                            <div className="form-selectgroup-boxes row mb-3">
                                <div className="col-lg-6">
                                    <label className="form-selectgroup-item">
                                        <input
                                            type="radio"
                                            name="thaaliuser"
                                            value="0"
                                            className="form-selectgroup-input"
                                            defaultChecked={
                                                formData.thaaliuser === "0"
                                            }
                                            onChange={handleChange}
                                        />
                                        <span className="form-selectgroup-label d-flex align-items-center p-3">
                                            <span className="me-3">
                                                <span className="form-selectgroup-check"></span>
                                            </span>
                                            <span className="form-selectgroup-label-content">
                                                <span className="form-selectgroup-title strong mb-1">
                                                    Thaali User
                                                </span>
                                                <span className="d-block text-secondary">
                                                    Paid and wants Thaali
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <div className="col-lg-6">
                                    <label className="form-selectgroup-item">
                                        <input
                                            type="radio"
                                            //   name="thaaliuser"
                                            //   value="2"
                                            //   className="form-selectgroup-input"
                                            //   checked={formData.thaaliuser === '1'}
                                            //   onChange={handleChange}
                                            name="thaaliuser"
                                            value="1"
                                            className="form-selectgroup-input"
                                            defaultChecked={
                                                formData.thaaliuser === "1"
                                            }
                                            onChange={handleChange}
                                        />
                                        <span className="form-selectgroup-label d-flex align-items-center p-3">
                                            <span className="me-3">
                                                <span className="form-selectgroup-check"></span>
                                            </span>
                                            <span className="form-selectgroup-label-content">
                                                <span className="form-selectgroup-title strong mb-1">
                                                    Non Thaali User
                                                </span>
                                                <span className="d-block text-secondary">
                                                    Don't want Thaali
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="mb-3">
                                        <label className="form-label required">
                                            Email Id
                                        </label>
                                        <div className="input-group input-group-flat">
                                            <span className="input-group-text">
                                            </span>
                                            <input
                                                type="email"
                                                className="form-control ps-0"
                                                // defaultValue="report-01"
                                                placeholder="Email Id"
                                                autoComplete="off"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="mb-3">
                                        <label className="form-label required">
                                            Role
                                        </label>
                                        <select
                                            className="form-select"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required
                                        >
                                            {isAdmin && (
                                                <option value="0" defaultValue={true}>
                                                    Admin
                                                </option>)}
                                            <option value="1">Manager</option>
                                            <option value="2">User</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="mb-3">
                                        <label className="form-label required">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Paasword"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="mb-3">
                                        <label className="form-label required">
                                            Head Count
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Head Count"
                                            name="headcount"
                                            value={formData.headcount}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label required">
                                            phoneno No.
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="phoneno No."
                                            name="phoneno"
                                            value={formData.phoneno}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div>
                                        <label className="form-label required">
                                            Address
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            placeholder="Address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a
                                href="#"
                                className="btn btn-link link-secondary"
                                // data-bs-dismiss="modal"
                            ></a>
                            <button
                                type="submit"
                                className="btn btn-primary ms-auto"
                                // data-bs-dismiss="modal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <path d="M12 5l0 14" />
                                    <path d="M5 12l14 0" />
                                </svg>
                                Create new User
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default addUser;
