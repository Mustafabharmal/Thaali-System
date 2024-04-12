import React, { useState, useEffect, useRef } from "react";
import { Toast } from 'primereact/toast';
function CreateMenu() {
    const toast = useRef(null);
    return (
        <>
        <div className="page-wrapper">
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <div className="page-pretitle">Overview</div>
                            <h2 className="page-title">Create Menu</h2>
                        </div>

                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <a
                                    // href="#"
                                    className="btn btn-primary d-none d-sm-inline-block"
                                    // data-bs-toggle="modal"
                                    // data-bs-target="#modal-report"
                                    href="/Menus"
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
                                    Back to All Menu
                                </a>
                                {/* <a
                                    href="#"
                                    className="btn btn-primary d-sm-none btn-icon"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal-report"
                                    aria-label="Create new report"
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
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <Toast ref={toast} />
                <div className="page-body">
                    <div className="container-xl">
                        <div className="row row-deck row-cards">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="card">
                                        <div className="card-body">







                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal modal-blur fade"
                id="modal-small"
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-sm modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="modal-title">Are you sure?</div>
                            <div>If you proceed, the Menu will be deleted.</div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-link link-secondary me-auto"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger">
                                {/* onClick={deleteMenu} */}
                                Yes, delete Menu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateMenu