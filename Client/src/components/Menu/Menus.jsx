import React, { useState, useEffect, useRef } from "react";
import { Toast } from 'primereact/toast';
import CreateMenu from "./CreateMenu";
import axios from 'axios';
// import { use } from "../../../../server/routes/MenuRoutes";
function Menu() {
    const toast = useRef(null);
    const [selectedDates, setSelectedDates] = useState('');
    const [dataTableValues, setDataTableValues] = useState([]);
    const [events, setEvents] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/menu', {
                withCredentials: true,
            });
            const transformedData = response.data.map(item => ({
                _id: item._id,
                name: item.name,
                date: item.date,
                gujaratiName: item.gujaratiName,
                description: item.description,
                calories: item.calories,
                status: item.status,
                communityid: item.communityid,
                createdat: item.createdat,
                updatedat: item.updatedat,
            }));
            setDataTableValues(transformedData);
            console.log('Data fetched:', transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const formattedEvents = dataTableValues.map(item => ({
            id: item._id,
            title: item.name,
            start: item.date,
            end: item.date,
            extendedProps: {
                name: item.name,
                gujaratiName: item.gujaratiName,
                description: item.description,
                calories: item.calories,
                status: item.status,
                communityid: item.communityid,
                createdat: item.createdat,
                updatedat: item.updatedat,
            },
        }));
        setEvents(formattedEvents);
    }, [dataTableValues]);

    useEffect(() => {
        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth();
        const calendarEl = document.getElementById('calendar-main');

        let calendar = null;
        if (calendarEl) {
            calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: ['interaction', 'dayGrid'],
                themeSystem: 'standard',
                header: {
                    left: 'title',
                    center: '',
                    right: 'prev,next',
                },
                selectable: true,
                selectHelper: true,
                nowIndicator: true,
                views: {
                    dayGridMonth: { buttonText: 'month' },
                    timeGridWeek: { buttonText: 'week' },
                    timeGridDay: { buttonText: 'day' },
                },
                defaultView: 'dayGridMonth',
                timeFormat: 'H(:mm)',
                events: events,
                dateClick: function (info) {
                    setSelectedDates(info.dateStr);
                    const modal = document.getElementById('modal-report');
                    if (modal) {
                        new bootstrap.Modal(modal).show();
                    } else {
                        console.error('Modal element with ID "modal-report" not found');
                    }
                },
                eventClick: function (info) {
                    console.log('Event clicked: ' + info.event.id);
                },
            });
            calendar.render();
        }

        return () => {
            if (calendar) {
                calendar.destroy();
            }
        };
    }, [events]);

    return (
        <>
            <div className="page-wrapper">
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <div className="page-pretitle">Overview</div>
                                <h2 className="page-title">Menu</h2>
                            </div>

                            <div className="col-auto ms-auto d-print-none">
                                <div className="btn-list">
                                    <a
                                        href="#"
                                        className="btn btn-primary d-none d-sm-inline-block"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modal-report"
                                    // href="/Menus"
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
                                        Create Menu
                                    </a>
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



                                                {/* <div class="card-body"> */}
                                                <div id="calendar-main" className="card-calendar" />
                                                {/* </div> */}



                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreateMenu selectedDates={selectedDates} />
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
export default Menu