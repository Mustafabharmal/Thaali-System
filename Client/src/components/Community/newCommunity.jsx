import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../../store/auth-context';
function NewCommunity() {
    const authCtx = useContext(AuthContext);
    const [formData, setFormData] = useState({
        // _id: "",
        name: "",
        status: 1,
        address: "",
        createdat: Date.now(),
        updatedat: Date.now(),
    });
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
                // "role",

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
        console.log(formData);
        try {
            setFormData((prevData) => ({
                ...prevData,
                createdat: new Date().toISOString(),
                updatedat: new Date().toISOString(),
            }));
            const response = await fetch("http://localhost:3000/community/add", {
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
                                    <label className="form-label required">Name of Community</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Name of Community"
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
