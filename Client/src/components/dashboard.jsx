import React, { useState, useEffect, useRef, useContext } from "react";
import axios from 'axios';
import AuthContext from '../store/auth-context';
function Dashboard() {
    const authCtx = useContext(AuthContext);
    function isToday(dateString) {
        const today = new Date();
        const date = new Date(dateString);
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    }

    const [dataTableValues, setDataTableValues] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/menu', {
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                },
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
            // console.log(transformedData)
            // Filter menus that are not past
            const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
            const notPastMenus = transformedData.filter(item => item.date >= today);
            // console.log(notPastMenus)
            // Display only the first 10 menus

            let firstTenMenus;
            if (notPastMenus.length <= 10) {
                firstTenMenus = notPastMenus;
            } else {
                firstTenMenus = notPastMenus.slice(0, 10);
            }
            // console.log("hello:" + firstTenMenus)

            setDataTableValues(firstTenMenus);
            // console.log(dataTableValues)
            // console.log('Data fetched:', dataTableValues);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="page-wrapper">
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <div className="page-pretitle">Overview</div>
                                <h2 className="page-title">Dashboard</h2>
                            </div>

                            <div className="col-auto ms-auto d-print-none">
                                <div className="btn-list">
                                    <a
                                        href="/menus"
                                        className="btn btn-primary d-none d-sm-inline-block"
                                    // data-bs-toggle="modal"
                                    // data-bs-target="#modal-report"
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
                                        Create Menus
                                    </a>
                                    <a
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
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-body">
                    <div className="container-xl">
                        <div className="row row-deck row-cards">
                            <div className="col-sm-6 col-lg-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="subheader">
                                                Users
                                            </div>
                                            <div className="ms-auto lh-1">
                                                <div className="dropdown">
                                                    <a
                                                        className="dropdown-toggle text-secondary"
                                                        href="#"
                                                        data-bs-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        Last 7 days
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a
                                                            className="dropdown-item active"
                                                            href="#"
                                                        >
                                                            Last 7 days
                                                        </a>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Last 30 days
                                                        </a>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Last 3 months
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h1 mb-3">{ } user counts for the pertiucular community id.</div>
                                        {/* <div className="d-flex mb-2">
                                            <div>Conversion rate</div>
                                            <div className="ms-auto">
                                                <span className="text-green d-inline-flex align-items-center lh-1">
                                                    7%
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="icon ms-1"
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
                                                        <path d="M3 17l6 -6l4 4l8 -8" />
                                                        <path d="M14 7l7 0l0 7" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div> */}
                                        {/* <div className="progress progress-sm">
                                            <div
                                                className="progress-bar bg-primary"
                                                style={{ width: "75%" }}
                                                role="progressbar"
                                                aria-valuenow="75"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                aria-label="75% Complete"
                                            >
                                                <span className="visually-hidden">
                                                    75% Complete
                                                </span>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="subheader">
                                                Community
                                            </div>
                                            <div className="ms-auto lh-1">
                                                <div className="dropdown">
                                                    <a
                                                        className="dropdown-toggle text-secondary"
                                                        href="#"
                                                        data-bs-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        Last 7 days
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a
                                                            className="dropdown-item active"
                                                            href="#"
                                                        >
                                                            Last 7 days
                                                        </a>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Last 30 days
                                                        </a>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Last 3 months
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-baseline">
                                            <div className="h1 mb-0 me-2">
                                                { } community counts for admin
                                            </div>
                                            {/* <div className="me-auto">
                                                <span className="text-green d-inline-flex align-items-center lh-1">
                                                    8%
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="icon ms-1"
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
                                                        <path d="M3 17l6 -6l4 4l8 -8" />
                                                        <path d="M14 7l7 0l0 7" />
                                                    </svg>
                                                </span>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div
                                        id="chart-revenue-bg"
                                        className="chart-sm"
                                    ></div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="subheader">
                                                Variety
                                            </div>
                                            <div className="ms-auto lh-1">
                                                <div className="dropdown">
                                                    <a
                                                        className="dropdown-toggle text-secondary"
                                                        href="#"
                                                        data-bs-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        Last 7 days
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a
                                                            className="dropdown-item active"
                                                            href="#"
                                                        >
                                                            Last 7 days
                                                        </a>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Last 30 days
                                                        </a>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Last 3 months
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-baseline">
                                            <div className="h1 mb-3 me-2">
                                                { } number of Variety created
                                            </div>
                                            {/* <div className="me-auto">
                                                <span className="text-yellow d-inline-flex align-items-center lh-1">
                                                    0%
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="icon ms-1"
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
                                                        <path d="M5 12l14 0" />
                                                    </svg>
                                                </span>
                                            </div> */}
                                        </div>
                                        <div
                                            id="chart-new-clients"
                                            className="chart-sm"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="subheader">
                                                Total Menu Created
                                            </div>
                                            <div className="ms-auto lh-1">
                                                <div className="dropdown">
                                                    <a
                                                        className="dropdown-toggle text-secondary"
                                                        href="#"
                                                        data-bs-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        Last 7 days
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a
                                                            className="dropdown-item active"
                                                            href="#"
                                                        >
                                                            Last 7 days
                                                        </a>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Last 30 days
                                                        </a>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Last 3 months
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-baseline">
                                            <div className="h1 mb-3 me-2">
                                                { } total count of the menu created
                                            </div>
                                            {/* <div className="me-auto">
                                                <span className="text-green d-inline-flex align-items-center lh-1">
                                                    4%
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="icon ms-1"
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
                                                        <path d="M3 17l6 -6l4 4l8 -8" />
                                                        <path d="M14 7l7 0l0 7" />
                                                    </svg>
                                                </span>
                                            </div> */}
                                        </div>
                                        {/* <div
                                            id="chart-active-users"
                                            className="chart-sm"
                                        ></div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row row-cards">
                                    <div className="col-sm-6 col-lg-3">
                                        <div className="card card-sm">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="bg-primary text-white avatar">
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
                                                                <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                                                                <path d="M12 3v3m0 12v3" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div className="col">
                                                        <div className="font-weight-medium">
                                                            132 Sales
                                                        </div>
                                                        <div className="text-secondary">
                                                            12 waiting payments
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                        <div className="card card-sm">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="bg-green text-white avatar">
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
                                                                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                                                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                                                <path d="M17 17h-11v-14h-2" />
                                                                <path d="M6 5l14 1l-1 7h-13" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div className="col">
                                                        <div className="font-weight-medium">
                                                            78 Orders
                                                        </div>
                                                        <div className="text-secondary">
                                                            32 shipped
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                        <div className="card card-sm">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="bg-twitter text-white avatar">
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
                                                                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div className="col">
                                                        <div className="font-weight-medium">
                                                            623 Shares
                                                        </div>
                                                        <div className="text-secondary">
                                                            16 today
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                        <div className="card card-sm">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="bg-facebook text-white avatar">
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
                                                                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div className="col">
                                                        <div className="font-weight-medium">
                                                            132 Likes
                                                        </div>
                                                        <div className="text-secondary">
                                                            21 today
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header border-0">
                                        <div className="card-title">
                                            Upcomming Menus
                                        </div>
                                    </div>
                                    {/* <div className="position-relative">
                                        <div className="position-absolute top-0 left-0 px-3 mt-1 w-75">
                                            <div className="row g-2">
                                                <div className="col-auto">
                                                    {/* <div
                                                        className="chart-sparkline chart-sparkline-square"
                                                        id="sparkline-activity"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="chart-development-activity"></div>
                                    </div> */}
                                    <div className="card-table table-responsive">
                                        <table className="table table-vcenter">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Name</th>
                                                    <th>Gujarati Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataTableValues.map(item => (
                                                    <tr key={item._id} className={isToday(item.date) ? 'table-primary' : ''}>
                                                        <td className="text-nowrap text-secondary w-3">{item.date}</td>
                                                        <td className="td-truncate w-5">
                                                            <div className="text-truncate">{item.name} ({item.description})</div>
                                                        </td>
                                                        <td className="text-nowrap w-4">{item.gujaratiName}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="row row-cards">

                                    <div className="col-12">
                                        <div
                                            className="card"
                                            style={{ height: "28rem" }}
                                        >
                                            <div className="card-body card-body-scrollable card-body-scrollable-shadow">
                                                <div className="divide-y">
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <span className="avatar">
                                                                    JL
                                                                </span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Jeffie
                                                                        Lewzey
                                                                    </strong>{" "}
                                                                    commented on
                                                                    your{" "}
                                                                    <strong>
                                                                        "I'm not
                                                                        a
                                                                        witch."
                                                                    </strong>{" "}
                                                                    post.
                                                                </div>
                                                                <div className="text-secondary">
                                                                    yesterday
                                                                </div>
                                                            </div>
                                                            <div className="col-auto align-self-center">
                                                                <div className="badge bg-primary"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/002m.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/002m.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    It's{" "}
                                                                    <strong>
                                                                        Mallory
                                                                        Hulme
                                                                    </strong>
                                                                    's birthday.
                                                                    Wish him
                                                                    well!
                                                                </div>
                                                                <div className="text-secondary">
                                                                    2 days ago
                                                                </div>
                                                            </div>
                                                            <div className="col-auto align-self-center">
                                                                <div className="badge bg-primary"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/003m.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/003m.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Dunn
                                                                        Slane
                                                                    </strong>{" "}
                                                                    posted{" "}
                                                                    <strong>
                                                                        "Well,
                                                                        what do
                                                                        you
                                                                        want?"
                                                                    </strong>
                                                                    .
                                                                </div>
                                                                <div className="text-secondary">
                                                                    today
                                                                </div>
                                                            </div>
                                                            <div className="col-auto align-self-center">
                                                                <div className="badge bg-primary"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/000f.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/000f.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Emmy
                                                                        Levet
                                                                    </strong>{" "}
                                                                    created a
                                                                    new project{" "}
                                                                    <strong>
                                                                        Morning
                                                                        alarm
                                                                        clock
                                                                    </strong>
                                                                    .
                                                                </div>
                                                                <div className="text-secondary">
                                                                    4 days ago
                                                                </div>
                                                            </div>
                                                            <div className="col-auto align-self-center">
                                                                <div className="badge bg-primary"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/001f.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/001f.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Maryjo
                                                                        Lebarree
                                                                    </strong>{" "}
                                                                    liked your
                                                                    photo.
                                                                </div>
                                                                <div className="text-secondary">
                                                                    2 days ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <span className="avatar">
                                                                    EP
                                                                </span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Egan
                                                                        Poetz
                                                                    </strong>{" "}
                                                                    registered
                                                                    new client
                                                                    as{" "}
                                                                    <strong>
                                                                        Trilia
                                                                    </strong>
                                                                    .
                                                                </div>
                                                                <div className="text-secondary">
                                                                    yesterday
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/002f.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/002f.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Kellie
                                                                        Skingley
                                                                    </strong>{" "}
                                                                    closed a new
                                                                    deal on
                                                                    project{" "}
                                                                    <strong>
                                                                        Pen
                                                                        Pineapple
                                                                        Apple
                                                                        Pen
                                                                    </strong>
                                                                    .
                                                                </div>
                                                                <div className="text-secondary">
                                                                    2 days ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/003f.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/003f.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Christabel
                                                                        Charlwood
                                                                    </strong>{" "}
                                                                    created a
                                                                    new project
                                                                    for{" "}
                                                                    <strong>
                                                                        Wikibox
                                                                    </strong>
                                                                    .
                                                                </div>
                                                                <div className="text-secondary">
                                                                    4 days ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <span className="avatar">
                                                                    HS
                                                                </span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Haskel
                                                                        Shelper
                                                                    </strong>{" "}
                                                                    change
                                                                    status of{" "}
                                                                    <strong>
                                                                        Tabler
                                                                        Icons
                                                                    </strong>{" "}
                                                                    from{" "}
                                                                    <strong>
                                                                        open
                                                                    </strong>{" "}
                                                                    to{" "}
                                                                    <strong>
                                                                        closed
                                                                    </strong>
                                                                    .
                                                                </div>
                                                                <div className="text-secondary">
                                                                    today
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/006m.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/006m.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Lorry
                                                                        Mion
                                                                    </strong>{" "}
                                                                    liked{" "}
                                                                    <strong>
                                                                        Tabler
                                                                        UI Kit
                                                                    </strong>
                                                                    .
                                                                </div>
                                                                <div className="text-secondary">
                                                                    yesterday
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/004f.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/004f.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Leesa
                                                                        Beaty
                                                                    </strong>{" "}
                                                                    posted new
                                                                    video.
                                                                </div>
                                                                <div className="text-secondary">
                                                                    2 days ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/007m.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/007m.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Perren
                                                                        Keemar
                                                                    </strong>{" "}
                                                                    and 3 others
                                                                    followed
                                                                    you.
                                                                </div>
                                                                <div className="text-secondary">
                                                                    2 days ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <span className="avatar">
                                                                    SA
                                                                </span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Sunny
                                                                        Airey
                                                                    </strong>{" "}
                                                                    upload 3 new
                                                                    photos to
                                                                    category{" "}
                                                                    <strong>
                                                                        Inspirations
                                                                    </strong>
                                                                    .
                                                                </div>
                                                                <div className="text-secondary">
                                                                    2 days ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/009m.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/009m.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Geoffry
                                                                        Flaunders
                                                                    </strong>{" "}
                                                                    made a{" "}
                                                                    <strong>
                                                                        $10
                                                                    </strong>{" "}
                                                                    donation.
                                                                </div>
                                                                <div className="text-secondary">
                                                                    2 days ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/010m.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/010m.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Thatcher
                                                                        Keel
                                                                    </strong>{" "}
                                                                    created a
                                                                    profile.
                                                                </div>
                                                                <div className="text-secondary">
                                                                    3 days ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/005f.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/005f.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Dyann
                                                                        Escala
                                                                    </strong>{" "}
                                                                    hosted the
                                                                    event{" "}
                                                                    <strong>
                                                                        Tabler
                                                                        UI
                                                                        Birthday
                                                                    </strong>
                                                                    .
                                                                </div>
                                                                <div className="text-secondary">
                                                                    4 days ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                {/* <span className="avatar" style="background-image: url(../assets/static/avatars/006f.jpg)"></span> */}
                                                                <span
                                                                    className="avatar"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(../assets/static/avatars/006f.jpg)",
                                                                    }}
                                                                ></span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Avivah
                                                                        Mugleston
                                                                    </strong>{" "}
                                                                    mentioned
                                                                    you on{" "}
                                                                    <strong>
                                                                        Best of
                                                                        2020
                                                                    </strong>
                                                                    .
                                                                </div>
                                                                <div className="text-secondary">
                                                                    2 days ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-auto">
                                                                <span className="avatar">
                                                                    AA
                                                                </span>
                                                            </div>
                                                            <div className="col">
                                                                <div className="text-truncate">
                                                                    <strong>
                                                                        Arlie
                                                                        Armstead
                                                                    </strong>{" "}
                                                                    sent a
                                                                    Review
                                                                    Request to{" "}
                                                                    <strong>
                                                                        Amanda
                                                                        Blake
                                                                    </strong>
                                                                    .
                                                                </div>
                                                                <div className="text-secondary">
                                                                    2 days ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
export default Dashboard;
