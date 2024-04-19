import React from "react";
function EditCommunity({ formData, setFormData, handleChange, handleUpdate }) {
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
                <input type="hidden" name="_id" value={formData._id} />
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Community</h5>
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
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div>
                                        <label className="form-label required">
                                            Location
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            placeholder="Location"
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
export default EditCommunity;
