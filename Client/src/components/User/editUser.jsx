import React from "react";
function EditUser({ formData, setFormData, handleChange,handleUpdate }) {
    // console.log("hello from me" + formData.id);
    // console.log(typeof formData.id);
    // console.log("hello from me"+formData)
    // console.log(formData.action)
    return (
        <div
            className="modal modal-blur fade"
            id="modal-edit"
            tabIndex="-1"
            role="dialog"
            aria-hidden="false"
        >
            <form onSubmit={handleUpdate}>
            <input type="hidden" name="_id" value={formData.id} />
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update User</h5>
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
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
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
                                                disabled={true}
                                            >
                                                select One
                                            </option>
                                            <option value="1">Upleta</option>
                                            <option value="2">Rajkot</option>
                                            <option value="3">Jamnagar</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <label className="form-label">User type</label>
                            <div className="form-selectgroup-boxes row mb-3">
                                <div className="col-lg-6">
                                    <label className="form-selectgroup-item">
                                        <input
                                            type="radio"
                                            name="thaaliuser"
                                            value="0"
                                            className="form-selectgroup-input"
                                            checked={formData.thaaliuser === 0}
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
                                            name="thaaliuser"
                                            value="1"
                                            className="form-selectgroup-input"
                                            checked={formData.thaaliuser === 1}
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

                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Email Id
                                        </label>
                                        <div className="input-group input-group-flat">
                                            <span className="input-group-text">
                                                {/* Email Id */}
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
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="mb-3">
                                        <label className="form-label">Role</label>
                                        <select
                                            className="form-select"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                        >
                                            <option value="0" defaultValue={true}>
                                                Admin
                                            </option>
                                            <option value="2">Manager</option>
                                            <option value="3">User</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                            {/* <div className="modal-body"> */}
                            <div className="row">
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
                                {/* <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                unit
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="unit"
                                                name='unit'
                                                value={formData.unit}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div> */}
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            phoneno No.
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="phoneno No."
                                            name="phoneno"
                                            value={formData.number}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Plan Valid till
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name='planValidTill'
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
                                Update User
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default EditUser;