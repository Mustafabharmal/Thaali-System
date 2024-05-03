import React, { useState, useEffect, useContext,useRef } from "react";
import axios from 'axios';
import AuthContext from '../../store/auth-context';
function AddFeedback() {
    const authCtx = useContext(AuthContext);
    // const authCtx = useContext(AuthContext);
const [selectedDates, setSelectedDates] = useState("");
    const calendarRef = useRef(null);
    // console.log(authCtx);
    const isAdmin = authCtx.role === 0 || authCtx.role === "0";
    const isManager = authCtx.role === 1 || authCtx.role === "1";
    const isUser = authCtx.role === 2 || authCtx.role === "2";

    useEffect(() => {
        if (window.Litepicker) {
            const today = new Date();
            const formattedSelectedDate = selectedDates ? new Date(selectedDates).toISOString().split('T')[0] : today.toISOString().split('T')[0];
            setFormData({
                ...formData,
                date: formattedSelectedDate,
            });
            const calendar = new Litepicker({
                element: document.getElementById("datepicker-icon-prepend"),
                buttonText: {
                    previousMonth: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>`,
                    nextMonth: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>`,
                },
                singleMode: true,
                autoApply: true,
                startDate: formattedSelectedDate,
                format: "YYYY-MM-DD",
                onSelect: handleDateSelect
            });
            calendarRef.current = calendar;
            calendar.on("selected", (startDate, endDate) => {
                const formattedDate = startDate.format("YYYY-MM-DD");
                setFormData((formData) => ({
                    ...formData,
                    date: formattedDate,
                }));
                // setFormData({
                //     ...formData,
                //     date: formattedDate,
                // });
            });
        }

        return () => {
            if (calendarRef.current) {
                calendarRef.current.destroy();
            }
        };
    }, [selectedDates]);

    const handleDateSelect = (date) => {
        setFormData({
            ...formData,
            date: date.format('YYYY-MM-DD')
        });
    };
    const [formData, setFormData] = useState({
        _id: "",
        userid: authCtx.userid,
        communityid: isAdmin ?  "0":authCtx.communityid,
        type: "Feedback",
        title: "",
        description: "",
        status: 1,
        date: "",
        completed: "Pending",
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
        // console.log(formData);
        try {
            setFormData((prevData) => ({
                ...prevData,
                createdat: new Date().toISOString(),
                updatedat: new Date().toISOString(),
            }));
            const response = await fetch("http://localhost:3000/FeedComReq/add", {
                method: "POST",
                headers: {
                    type: "Feedback",
                    authorization: `Mustafa ${authCtx.token}`,
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Feedback created successfully");
                window.location.reload();
                // Optionally, you can reset the form or perform any other actions
            } else {
                const responseData = await response.json(); // Extract error message from response
                if (response.status === 400 && responseData.error === "Feedback with this email already exists") {
                    // Show error message for duplicate email
                    alert("Another Feedback with this email already exists");
                } else {
                    console.error("Failed to create Feedback");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div
            className="modal modal-blur fade"
            id="modal-feedbackadd"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
        >
            <form method="post" onSubmit={handleSubmit}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Feedback</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {/* <div className="form-selectgroup-boxes row mb-3">
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
                               
                            </div>
                            </div> */}
                            {/* <div className="row">
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
                            </div> */}
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label required">
                                            Title
                                        </label>
                                        <div className="input-group input-group-flat">
                                            <span className="input-group-text">
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control ps-0"
                                                // defaultValue="report-01"
                                                placeholder="Title"
                                                autoComplete="off"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
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
                            <div className="row">
                            <div className="col-lg-6" hidden >
                                        <div className="mb-3">
                                            <label className="form-label required">
                                                Feedback For
                                            </label>
                                            <div className="input-icon">
                                                <span className="input-icon-addon">
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
                                                        <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                                                        <path d="M16 3v4" />
                                                        <path d="M8 3v4" />
                                                        <path d="M4 11h16" />
                                                        <path d="M11 15h1" />
                                                        <path d="M12 15v3" />
                                                    </svg>
                                                </span>
                                                <input
                                                    className="form-control"
                                                    placeholder="Select a date"
                                                    name="date"
                                                    id="datepicker-icon-prepend"
                                                    value={formData.date ? formData.date : new Date().toISOString().split('T')[0]}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/*{!isUser&&(
                                <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label required">
                                                Status
                                            </label>
                                            <select
                                                className="form-select"
                                                name="completed"
                                                value={formData.completed}
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
                                                <option value="Pending">Pending</option>
                                            <option value="Will be Done">Will be Done</option>
                                            <option value="Completed">Completed</option>
                                             
                                            </select>
                                        </div>
                                    </div>)}
                                    */}
                                <div className="col-lg-12">
                                    <div>
                                        <label className="form-label required">
                                            Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            placeholder="Description"
                                            name="description"
                                            value={formData.description}
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
                                Create new Feedback
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default AddFeedback