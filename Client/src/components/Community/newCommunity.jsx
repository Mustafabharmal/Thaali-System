import React, { useState } from "react";
function NewCommunity() {
    const [formData, setFormData] = useState({
        name: "",
        location: "0",
      
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
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
                            <h5 className="modal-title">New Community</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-selectgroup-boxes row mb-3">
                                <div className="col-lg-12">
                                    <label className="form-label">Name of Community</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Name of Community"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* <div className="col-lg-6">
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
                                                disabled={true}
                                            >
                                                select One
                                            </option>
                                            <option value="1">Upleta</option>
                                            <option value="2">Rajkot</option>
                                            <option value="3">Jamnagar</option>
                                        </select>
                                    </div>
                                </div> */}
                            </div>
                            {/* <label className="form-label">User type</label>
                            <div className="form-selectgroup-boxes row mb-3">
                                <div className="col-lg-6">
                                    <label className="form-selectgroup-item">
                                        <input
                                            type="radio"
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
                                            value="2"
                                            className="form-selectgroup-input"
                                            defaultChecked={
                                                formData.thaaliuser === "2"
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
                            </div> */}
                          
                            {/* </div> */}
                            {/* <div className="modal-body"> */}
                            {/* <div className="row">
                                <div className="col-lg-4">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Paasword"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Head Count
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Head Count"
                                            name="headcount"
                                            value={formData.headcount}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            unit
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="unit"
                                            name="unit"
                                            value={formData.unit}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div> */}
                            <div className="row">
                                {/* <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            phoneno No.
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="phoneno No."
                                            name="phoneno"
                                            value={formData.phoneno}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Plan Valid till
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="planValidTill"
                                            value={formData.planValidTill}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div> */}
                                <div className="col-lg-12">
                                    <div>
                                        <label className="form-label">
                                            Address
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            placeholder="Address"
                                            name="address"
                                            value={formData.address}
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
                                Create new Community
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default NewCommunity;
