// import React, { useState, useEffect } from "react";
import axios from 'axios';
// import PopupVariety from "../Menu/PopupVariety";
import React, { useState, useEffect, useContext } from "react";
// import axios from 'axios';
import AuthContext from '../../store/auth-context';

function EditVarity({ formData, handleChange, handleUpdate, handleKeyUp, ComValues }) {
    const authCtx = useContext(AuthContext);
    const isAdmin = authCtx.role === 0 || authCtx.role === "0";
    const isManager = authCtx.role === 1 || authCtx.role === "1";
    const isUser = authCtx.role === 2 || authCtx.role === "2";
    return (
        // <></>
        <div
            className="modal modal-blur fade"
            id="modal-edit"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
        >
            <form method="post" onSubmit={handleUpdate}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Variety</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-selectgroup-boxes row mb-3">
                                <div className="col-lg-6">
                                    <label className="form-label"> Variety Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                {isAdmin && (
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                communityid
                                            </label>
                                            <select
                                                className="form-select"
                                                name="communityid"
                                                value={formData.communityid}
                                                onChange={handleChange}
                                            >
                                                <option
                                                    value="0"
                                                    defaultValue="true"
                                                    // selected="true"
                                                    // isselected="true"
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
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Gujarati Name
                                        </label>
                                        <div className="input-group input-group-flat">
                                            <span className="input-group-text">
                                            </span>
                                            <textarea
                                                className="form-control ps-0"
                                                id="data1"
                                                name="gujaratiName"
                                                placeholder="Gujarati Name"
                                                autoComplete="off"
                                                onKeyUp={handleKeyUp}
                                                value={formData.gujaratiName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            calories
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="calories"
                                            name="calories"
                                            rows="3"
                                            value={formData.calories}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div>
                                        <label className="form-label">
                                            Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            placeholder="Description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
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
                                data-bs-dismiss="modal"
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
                                Edit Variety
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <script type="text/javascript">

            </script>
            {/* <PopupVariety /> */}
        </div>

    );
}
export default EditVarity;
