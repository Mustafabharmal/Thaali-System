import React, { useState, useEffect, useRef } from "react";
import { Toast } from 'primereact/toast';
function CreateMenu() {
    const toast = useRef(null);
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
                    right: 'prev,next'
                },
                selectable: true,
                selectHelper: true,
                nowIndicator: true,
                views: {
                    dayGridMonth: { buttonText: 'month' },
                    timeGridWeek: { buttonText: 'week' },
                    timeGridDay: { buttonText: 'day' }
                },
                defaultView: 'dayGridMonth',
                timeFormat: 'H(:mm)',
                events: [
                    {
                        title: 'All Day Event',
                        start: new Date(y, m, 1),
                        className: 'bg-blue-lt'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: new Date(y, m, 7, 6, 0),
                        allDay: false,
                        className: 'bg-blue-lt'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: new Date(y, m, 14, 6, 0),
                        allDay: false,
                        className: 'bg-lime-lt'
                    },
                    {
                        title: 'Meeting',
                        start: new Date(y, m, 4, 10, 30),
                        allDay: false,
                        className: 'bg-green-lt'
                    },
                    {
                        title: 'Lunch',
                        start: new Date(y, m, 5, 12, 0),
                        end: new Date(y, m, 5, 14, 0),
                        allDay: false,
                        className: 'bg-red-lt'
                    },
                    {
                        title: 'LBD Launch',
                        start: new Date(y, m, 19, 12, 0),
                        allDay: true,
                        className: 'bg-azure-lt'
                    },
                    {
                        title: 'Birthday Party',
                        start: new Date(y, m, 16, 19, 0),
                        end: new Date(y, m, 16, 22, 30),
                        allDay: false,
                        className: 'bg-orange-lt'
                    }
                ],
                dateClick: function(info) {
                    console.log('Clicked on: ' + info.dateStr);
                    // Here you can open a popup or perform any action when a day is clicked
                },
                // Callback function for when an event is clicked
                eventClick: function(info) {
                    console.log('Event clicked: ' + info.event.title);
                    // Here you can open a popup or perform any action when an event is clicked
                }
            });
            calendar.render();
        }
    
        // Return cleanup function
        return () => {
            if (calendar) {
                calendar.destroy();
            }
        };
    }, []);
    
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
              <div id="calendar-main" className="card-calendar"/>
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