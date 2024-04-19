import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
// import User from "./user";
import AuthContext from '../../store/auth-context';
function MyProfile() {
    const authCtx = useContext(AuthContext);
    const isAdmin = authCtx.role === 0 || authCtx.role === "0";
    const isManager = authCtx.role === 1 || authCtx.role === "1";
    const isUser = authCtx.role === 2 || authCtx.role === "2";
    const [formData, setFormData] = useState({
        name: authCtx.name,
        communityid: isManager ? authCtx.communityid : "0",
        thaaliuser: "0",
        email: authCtx.email,
        role: isAdmin ? 0 : 1,
        password: authCtx.password,
        headcount: authCtx.headcount,
        // unit: '',
        phoneno: authCtx.phoneno,
        // planValidTill: "",
        status: 1,
        address: authCtx.address,
        // createdat: Date.now(),
        updatedat: Date.now(),
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const intValue = [
                "role",
            ].includes(name)
                ? parseInt(value, 10)
                : value;
            const formattedValue = name.endsWith("at")
                ? new Date(value).toISOString()
                : intValue;

            return {
                ...prevData,
                [name]: formattedValue,
            };
        });
    };

    const handleUpdateMe = async (e) => {
        e.preventDefault();
        try {
            setFormData((prevData) => ({
                ...prevData,
                updatedat: new Date().toISOString(),
            }));
            const response = await fetch("http://localhost:3000/dashboard/updateMe", {
                method: "POST",
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("User Updated successfully");
                authCtx.updateUser(formData);
                window.location.reload();
            } else {
                console.error("Failed to create user");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className="page-wrapper">
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <div className="page-pretitle">Overview</div>
                            <h2 className="page-title">My Profile</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12">
                {/* <Toast ref={toast} /> */}
                <div className="page-body">
                    <div className="container-xl">
                        <div className="row row-deck row-cards">
                            <div className="container-fluid">
                                <div className="row">
                                    <div class="col-md-12">
                                        <div class="card">
                                            <div class="card-header">
                                                <ul class="nav nav-tabs card-header-tabs nav-fill" data-bs-toggle="tabs">
                                                    <li class="nav-item">
                                                        <a href="#tabs-home-7" class="nav-link active" data-bs-toggle="tab">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                                                            Profile</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#tabs-profile-7" class="nav-link " data-bs-toggle="tab">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                                                            Update Password</a>
                                                    </li>

                                                    <li class="nav-item">
                                                        <a href="#tabs-activity-7" class="nav-link" data-bs-toggle="tab">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12h4l3 8l4 -16l3 8h4" /></svg>
                                                            Forget Password</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="card-body">
                                                <div class="tab-content">
                                                    <div class="tab-pane active show" id="tabs-home-7">

                                                        <div className="card">
                                                            <div className="card-body">
                                                                <form method="post" onSubmit={handleUpdateMe}>
                                                                    <div className="modal-content">
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




                                                                                    <div className="col-lg-6">
                                                                                        <div className="mb-3">
                                                                                            <label className="form-label required">
                                                                                                Email Id
                                                                                            </label>
                                                                                            <div className="input-group input-group-flat">
                                                                                                <span className="input-group-text">
                                                                                                </span>
                                                                                                <input
                                                                                                    type="text"
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
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">

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
                                                                                <div className="col-lg-4">
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
                                                                                <div className="col-lg-6">
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
                                                                                data-bs-dismiss="modal"
                                                                            ></a>
                                                                            <button
                                                                                type="submit"
                                                                                className="btn btn-primary ms-auto"
                                                                            // data-bs-dismiss="modal"
                                                                            >

                                                                                Save
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div class="tab-pane" id="tabs-profile-7">
                                                        <h4>Update Password</h4>
                                                        <div>Fringilla egestas nunc quis tellus diam rhoncus ultricies tristique enim at diam, sem nunc amet, pellentesque id egestas velit sed</div>
                                                    </div>
                                                    <div class="tab-pane" id="tabs-activity-7">
                                                        <h4>Forget Password</h4>
                                                        <div>Donec ac vitae diam amet vel leo egestas consequat rhoncus in luctus amet, facilisi sit mauris accumsan nibh habitant senectus</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MyProfile;