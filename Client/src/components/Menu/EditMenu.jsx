import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import PopupEditVariety from "./PopupEditVariety";
import { Button } from "primereact/button";
import AuthContext from '../../store/auth-context';
function EditMenu({ selectedDates, formData, setFormData }) {
    const authCtx = useContext(AuthContext);
    const isAdmin = authCtx.role === 0 || authCtx.role === "0";
    const isManager = authCtx.role === 1 || authCtx.role === "1";
    const isUser = authCtx.role === 2 || authCtx.role === "2";
    const calendarRef = useRef(null);
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
    // const [formData, setFormData] = useState({
    //     // _id:'',
    //     date: selectedDates ? new Date(selectedDates).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    //     name: "",
    //     calories: 1,
    //     description: "",
    //     gujaratiName: "",
    //     communityid: "",
    //     status: 1,
    //     createdat: Date.now(),
    //     updatedat: Date.now(),
    // });
    const deleteRow = async (rowData) => {
        console.log('Delete row:', rowData);
        setFormData(rowData);
        $('#modal-small').modal('show');

    };
    const handleConfirmDelete = async () => {
        $('#modal-small').modal('hide');

        try {

            const response = await fetch(`http://localhost:3000/menu/delete/${formData._id}`, {
                method: "PUT",
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: 0,
                }),
            });
            if (response.ok) {
                console.log("Variety deleted successfully");
                window.location.reload();
            } else {
                console.error("Failed to delete Variety");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const [ComValues, setComValues] = useState([]);
    useEffect(() => {
        isAdmin && (
            fetchComData())
        const input = document.getElementById("data1");
        enableTransliteration1(input, "gu");
        return () => {
            disableTransliteration(input);
        };
    }, []);
    const handleDateSelect = (date) => {
        setFormData({
            ...formData,
            date: date.format('YYYY-MM-DD')
        });
    };
    const handleKeyUp = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            gujaratiName: e.target.value,
        }));
        console.log(formData.gujaratiName);
    };
    const fetchComData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/community",
                {
                    headers: {
                        authorization: `Mustafa ${authCtx.token}`,
                    },
                    withCredentials: true,
                }
            );
            const transformedData = response.data.map((item) => ({
                _id: item._id,
                name: item.name,
                address: `${item.address}`,
                status: item.status,
                createdat: item.createdat,
                updatedat: item.updatedat,
            }));

            setComValues(transformedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const handleChange = (e) => {
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
            console.log(formattedValue);
            return {
                ...prevData,
                gujaratiName: document.getElementById("data1").value,
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
                // _id: '',
                gujaratiName: document.getElementById("data1").value,
                createdat: new Date().toISOString(),
                updatedat: new Date().toISOString(),
            }));
            // console.log(formData);
            const response = await fetch(`http://localhost:3000/menu/update/${formData._id}`, {
                method: "PUT",
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    updatedat: Date.now(),
                    gujaratiName: document.getElementById('data1').value,
                }),
            });
            // console.log(formData)
            if (response.ok) {
                console.log("User created successfully");
                window.location.reload();
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
            id="modal-edit"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
        >
            <form method="post" onSubmit={handleSubmit}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Menu Edit</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-selectgroup-boxes row mb-3">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Datepicker
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
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Fetch Variety
                                            </label>
                                            <a
                                                href="#"
                                                className="btn btn-primary col-lg-12 col-md-12"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    $('#modal-verity1').modal('show');
                                                }}
                                            >
                                                Select Variety
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                {" "}
                                                Variety Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
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
                                                        // selected="true"
                                                        // isselected="true"
                                                        disabled={true}
                                                    >
                                                        select One
                                                    </option>
                                                    {ComValues.map((community) => (
                                                        <option
                                                            key={community._id}
                                                            value={community._id}
                                                        >
                                                            {community.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Gujarati Name
                                        </label>
                                        <div className="input-group input-group-flat">
                                            <span className="input-group-text"></span>
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
                                {/* </div>
                            <div className="row"> */}
                                <div className="col-lg-4">
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
                            >
                                Cancel
                            </a>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => deleteRow(formData)} // Call deleteRow function with formData
                            >
                                Delete Menu
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary ms-auto"
                                data-bs-dismiss="modal"
                            >
                                {/* <svg
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
        </svg> */}
                                Update Menu for {formData.date}
                            </button>

                        </div>
                    </div>
                </div>
            </form>
            <script type="text/javascript"></script>
            <PopupEditVariety setFormData={setFormData} formData={formData} />
            <div
                className="modal modal-blur fade"
                id="modal-small"
                tabIndex="-2"
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
                            <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>

                                Yes, delete Menu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditMenu;