// import React, { useState, useEffect } from "react";
import axios from 'axios';
// import PopupVariety from "../Menu/PopupVariety";
import React, {  useState, useEffect, useContext,useRef } from "react";
// import axios from 'axios';
import AuthContext from '../../store/auth-context';

function EditComplain({ formData, handleChange, handleUpdate, handleKeyUp,setFormData, ComValues }) {
    const [selectedDates, setSelectedDates] = useState("");
    const calendarRef = useRef(null);
    // console.log(authCtx);
    const authCtx = useContext(AuthContext);
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
                element: document.getElementById("datepicker-icon-prepend1"),
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
                            <h5 className="modal-title">New Complain</h5>
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
                            <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label required">
                                                Complain For
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
                                                    id="datepicker-icon-prepend1"
                                                    value={formData.date ? formData.date : new Date().toISOString().split('T')[0]}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {!isUser&&(
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
                                            <option value="Will be done">Will be Done</option>
                                            <option value="Completed">Completed</option>
                                                {/* {ComValues.map(community => (
                                                    <option key={community._id} value={community._id}>
                                                        {community.name}
                                                    </option>
                                                ))} */}
                                            </select>
                                        </div>
                                    </div>)}
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
                                Create new Complain
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
export default EditComplain;