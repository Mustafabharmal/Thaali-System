import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
// import User from "./user";
import AuthContext from '../../store/auth-context';
function MyProfile() {
    const authCtx = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const [updatePass, setupdatePass] = useState({
        email: authCtx.email,
        oldPassword: "",
        newPassword: "",
    });
    const handlePassChange = (e) => {
        setupdatePass({
            ...updatePass,
            [e.target.name]: e.target.value
        });
    };
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
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        console.log("Form Submitted");
        // e.preventDefault();
        // console.log(email);
        // console.log("Form Submitted");
        try {
            const response = await fetch("http://localhost:3000/auth/UpdatePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(updatePass),

            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                alert("Password updated successfully");
                window.location.href = "/";
            } else if (response.status === 404) {
                console.log("Password Didn't matched");
                alert("Password Didn't matched");
            } else {
                console.log("Error occurred");
                alert("Error occurred");
            }
        } catch (error) {
            console.log("Error occurred");
            console.log(error);
            alert("Error occurred");
        }
    };

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
                const responseData = await response.json(); // Extract error message from response
                if (response.status === 400 && responseData.error === "Another user with this email already exists") {
                    // Show error message for duplicate email
                    alert("Another user with this email already exists");
                } else {
                    console.error("Failed to create user");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleForgetPassword = async (e) => {
        e.preventDefault();
        // console.log(email);
        console.log("Form Submitted");
        try {
            const response = await fetch("http://localhost:3000/auth/forgetPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ email: authCtx.email }),

            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                alert("Email sent with new password");
                window.location.href = "/";
            } else if (response.status === 404) {
                console.log("User not found");
                alert("User not found");
            } else {
                console.log("Error occurred");
                alert("Error occurred");
            }
        } catch (error) {
            console.log("Error occurred");
            console.log(error);
            alert("Error occurred");
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
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <ul className="nav nav-tabs card-header-tabs nav-fill" data-bs-toggle="tabs">
                                                    <li className="nav-item">
                                                        <a href="#tabs-home-7" className="nav-link active" data-bs-toggle="tab">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                                                            Profile</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href="#tabs-profile-7" className="nav-link " data-bs-toggle="tab">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                                                            Update Password</a>
                                                    </li>

                                                    {/* <li className="nav-item">
                                                        <a href="#tabs-activity-7" className="nav-link" data-bs-toggle="tab">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12h4l3 8l4 -16l3 8h4" /></svg>
                                                            Forget Password</a>
                                                    </li> */}
                                                </ul>
                                            </div>
                                            <div className="card-body">
                                                <div className="tab-content">
                                                    <div className="tab-pane active show" id="tabs-home-7">
                                                        <h4>Profile</h4>
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
                                                    <div className="tab-pane" id="tabs-profile-7">
                                                        <h4>Update Password</h4>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <form method="post" onSubmit={handleUpdatePassword}>
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <div className="mb-3">
                                                                                <label className="form-label required">
                                                                                    Current Password
                                                                                </label>
                                                                                <input
                                                                                    type="password"
                                                                                    className="form-control"
                                                                                    placeholder="Current Paasword"
                                                                                    name="oldPassword"
                                                                                    value={updatePass.oldPassword}
                                                                                    onChange={handlePassChange}
                                                                                    required
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <div className="mb-3">
                                                                                <label className="form-label required">
                                                                                    New Password
                                                                                </label>
                                                                                <input
                                                                                    type="password"
                                                                                    className="form-control"
                                                                                    placeholder="New Paasword"
                                                                                    name="newPassword"
                                                                                    value={updatePass.newPassword}
                                                                                    onChange={handlePassChange}
                                                                                    required
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="modal-footer d-flex justify-content-end">
                                                                            <button type="button" className="btn btn-danger me-2" onClick={handleForgetPassword}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                                                                                Forget Password
                                                                            </button>
                                                                            <button type="submit" className="btn btn-primary">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                                                                                Change Password
                                                                            </button>
                                                                        </div>

                                                                    </div>

                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="tab-pane" id="tabs-activity-7">
                                                        <h4>Forget Password</h4>

                                                        <div className="card">
                                                            <div className="card-body">
                                                                <form method="post" onSubmit={handleForgetPassword} >
                                                                    <div className="card-body">  <div className="mb-3">
                                                                        <label className="form-label required">Email address</label>
                                                                        <input type="email" name="email" onChange={handleEmailChange} value={email} className="form-control" placeholder="Enter email" required />
                                                                    </div>
                                                                        <div className="modal-footer">
                                                                            <button type="submit" className="btn btn-primary ms-auto">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                                                                                Send me new password
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div> */}
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