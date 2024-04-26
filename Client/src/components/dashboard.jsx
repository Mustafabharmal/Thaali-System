import React, { useState, useEffect, useRef, useContext } from "react";
import axios from 'axios';
import AuthContext from '../store/auth-context';
function Dashboard() {
    // const authCtx = useContext(AuthContext);
    const authCtx = useContext(AuthContext);
    const isAdmin = authCtx.role === 0 || authCtx.role === "0";
    const isManager = authCtx.role === 1 || authCtx.role === "1";
    const isUser = authCtx.role === 2 || authCtx.role === "2";
    function isToday(dateString) {
        const today = new Date();
        const date = new Date(dateString);
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    }
    const [FeedComReq, setFeedComReq] = useState(
        {
            feebackt: "0",
            feedbackv: "0",
            requestt: "0",
            requestv: "0",
            complaintv: "0",
            complaintt: "0"
        }
    );
    useEffect(() => {
        let chart;
        if (isAdmin) {
            const options = {
                chart: {
                    type: "area",
                    fontFamily: 'inherit',
                    height: 40.0,
                    sparkline: {
                        enabled: true
                    },
                    animations: {
                        enabled: false
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                fill: {
                    opacity: .16,
                    type: 'solid'
                },
                stroke: {
                    width: 2,
                    lineCap: "round",
                    curve: "smooth",
                },
                series: [{
                    name: "Profits",
                    data: [37, 35, 44, 28, 36, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46, 39, 62, 51, 35, 41, 67]
                }],
                tooltip: {
                    theme: 'dark'
                },
                grid: {
                    strokeDashArray: 4,
                },
                xaxis: {
                    labels: {
                        padding: 0,
                    },
                    tooltip: {
                        enabled: false
                    },
                    axisBorder: {
                        show: false,
                    },
                    type: 'datetime',
                },
                yaxis: {
                    labels: {
                        padding: 4
                    },
                },
                labels: [
                    '2020-06-20', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27', '2020-06-28', '2020-06-29', '2020-06-30', '2020-07-01', '2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09', '2020-07-10', '2020-07-11', '2020-07-12', '2020-07-13', '2020-07-14', '2020-07-15', '2020-07-16', '2020-07-17', '2020-07-18', '2020-07-19'
                ],
                colors: ["#007bff"], // You can change this color if needed
                legend: {
                    show: false,
                },
            };

            chart = new ApexCharts(document.getElementById('chart-revenue-bg'), options);
            chart.render();
        }
        // Cleanup
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, [isAdmin]);
    useEffect(() => {
        let chart
        if (isAdmin || isManager) {
            const options = {
                chart: {
                    type: "line",
                    fontFamily: 'inherit',
                    height: 40.0,
                    sparkline: {
                        enabled: true
                    },
                    animations: {
                        enabled: false
                    },
                },
                fill: {
                    opacity: 1,
                },
                stroke: {
                    width: [2, 1],
                    dashArray: [0, 3],
                    lineCap: "round",
                    curve: "smooth",
                },
                series: [{
                    name: "May",
                    data: [37, 35, 44, 28, 36, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 4, 46, 39, 62, 51, 35, 41, 67]
                }, {
                    name: "April",
                    data: [93, 54, 51, 24, 35, 35, 31, 67, 19, 43, 28, 36, 62, 61, 27, 39, 35, 41, 27, 35, 51, 46, 62, 37, 44, 53, 41, 65, 39, 37]
                }],
                tooltip: {
                    theme: 'dark'
                },
                grid: {
                    strokeDashArray: 4,
                },
                xaxis: {
                    labels: {
                        padding: 0,
                    },
                    tooltip: {
                        enabled: false
                    },
                    type: 'datetime',
                },
                yaxis: {
                    labels: {
                        padding: 4
                    },
                },
                labels: [
                    '2020-06-20', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27', '2020-06-28', '2020-06-29', '2020-06-30', '2020-07-01', '2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09', '2020-07-10', '2020-07-11', '2020-07-12', '2020-07-13', '2020-07-14', '2020-07-15', '2020-07-16', '2020-07-17', '2020-07-18', '2020-07-19'
                ],
                colors: ["#007bff", "#6c757d"], // You can change these colors if needed
                legend: {
                    show: false,
                },
            };

            chart = new ApexCharts(document.getElementById('chart-new-clients'), options);
            chart.render();
        }
        // Cleanup
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, [isAdmin, isManager]);
    useEffect(() => {
        let chart;
        if (isAdmin || isManager) {
            const options = {
                chart: {
                    type: "bar",
                    fontFamily: 'inherit',
                    height: 40.0,
                    sparkline: {
                        enabled: true
                    },
                    animations: {
                        enabled: false
                    },
                },
                plotOptions: {
                    bar: {
                        columnWidth: '50%',
                    }
                },
                dataLabels: {
                    enabled: false,
                },
                fill: {
                    opacity: 1,
                },
                series: [{
                    name: "Profits",
                    data: [37, 35, 44, 28, 36, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46, 39, 62, 51, 35, 41, 67]
                }],
                tooltip: {
                    theme: 'dark'
                },
                grid: {
                    strokeDashArray: 4,
                },
                xaxis: {
                    labels: {
                        padding: 0,
                    },
                    tooltip: {
                        enabled: false
                    },
                    axisBorder: {
                        show: false,
                    },
                    type: 'datetime',
                },
                yaxis: {
                    labels: {
                        padding: 4
                    },
                },
                labels: [
                    '2020-06-20', '2020-06-21', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-25', '2020-06-26', '2020-06-27', '2020-06-28', '2020-06-29', '2020-06-30', '2020-07-01', '2020-07-02', '2020-07-03', '2020-07-04', '2020-07-05', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09', '2020-07-10', '2020-07-11', '2020-07-12', '2020-07-13', '2020-07-14', '2020-07-15', '2020-07-16', '2020-07-17', '2020-07-18', '2020-07-19'
                ],
                colors: ["#007bff"],
                legend: {
                    show: false,
                },
            };

            chart = new ApexCharts(document.getElementById('chart-active-users'), options);
            chart.render();
        }
        // Cleanup
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, [isAdmin, isManager]);
    const [UserValues, setUserValues] = useState([]);
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users', {
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                },
                withCredentials: true,
            });
            const transformedData = response.data.map(item => {
                // const unitsInfo = item.user && item.user.units
                // ? item.user.units.map(unit => (
                //     `Unit: ${unit.unit}, Validity: ${unit.validity}`
                //     // ""
                // ))
                // : [];
                return {
                    _id: item._id,
                    name: item.name,
                    email: item.email,
                    phoneno: item.phoneno,
                    address: `${item.address}`,
                    role: item.role,
                    status: item.status,
                    communityid: item.communityid,
                    password: item.password,
                    headcount: item.headcount,
                    createdat: item.createdat,
                    updatedat: item.updatedat,
                    thaaliuser: item.thaaliuser,
                };
            });
            // setLoading(false);
            setUserValues(transformedData); // Set the state directly without using prevData
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            // setLoading(false); // Set loading to false regardless of success or failure
        }
        // setLoading(false);
    };
    useEffect(() => {
        !isUser && fetchUserData();
    }, []);

    const [dataTableValues, setDataTableValues] = useState([]);
    const [baseValue, setbaseValue] = useState([]);
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
            const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
            const notPastMenus = transformedData.filter(item => item.date >= today);
            notPastMenus.sort((a, b) => new Date(a.date) - new Date(b.date));
            let firstTenMenus;
            if (notPastMenus.length <= 10) {
                firstTenMenus = notPastMenus;
            } else {
                firstTenMenus = notPastMenus.slice(0, 10);
            }
            setDataTableValues(firstTenMenus);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [dataRequestValues, setDataRequestValues] = useState([]);

    const fetchRequestData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/FeedComReq",
                {
                    headers: {
                        authorization: `Mustafa ${authCtx.token}`,
                        type: "Requests",
                    },
                    withCredentials: true,
                }
            );
            const transformedData = response.data.map((item) => {
                // const unitsInfo = item.user && item.user.units
                // ? item.user.units.map(unit => (
                //     `Unit: ${unit.unit}, Validity: ${unit.validity}`
                //     // ""
                // ))
                // : [];
                return {
                    _id: item._id,
                    status: item.status,
                    createdat: item.createdat,
                    updatedat: item.updatedat,
                    description: item.description,
                    communityid: item.communityid,
                    userid: item.userid,
                    type: item.type,
                    title: item.title,
                    date: item.date,
                    completed: item.completed,
                };
            });
            // setLoading(false);
            const requestCount = transformedData.filter(item => item.status === 1).length;
            const requsetcountv = transformedData.filter(item => item.completed === "Pending" || item.completed === "pending" || item.completed === "Will be Done" || item.completed === "Will be done").length;

            setFeedComReq(prevState => ({
                ...prevState,
                requestt: requestCount,
                requestv: requsetcountv,
            }));
            const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
            const notPastMenus = transformedData.filter(item => item.date >= today);

            // Custom sorting function to sort by date
            notPastMenus.sort((a, b) => {
                if (a.date === today && b.date === today) return 0; // Both are today
                if (a.date === today) return -1; // a is today, should be placed before b
                if (b.date === today) return 1; // b is today, should be placed before a
                // Neither is today, sort them normally
                return new Date(a.date) - new Date(b.date);
            });

            setDataRequestValues(notPastMenus);
            console.log(transformedData)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // setLoading(false); // Set loading to false regardless of success or failure
        }
        // setLoading(false);
    };



    const DashData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/dashboard', {
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                },
                withCredentials: true,
            });
            console.log(response.data)
            // const transformedData = response.data.map(item => ({
            //     userCount: item.userCount,
            //     menuCount: item.menuCount,
            //     varietyCount: item.varietyCount,
            //     communityCount: item.communityCount
            // }));
            setbaseValue({
                userCount: response.data.userCount,
                menuCount: response.data.menuCount,
                varietyCount: response.data.varietyCount,
                communityCount: response.data.communityCount,
            });
            // console.log(transformedData)
            // setbaseValue(transformedData);
            console.log(baseValue)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const [dataComValues, setDataComValues] = useState([]);
    const fetchCompData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/FeedComReq', {
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                    type: "Complain",
                },
                withCredentials: true,
            });
            const transformedData = response.data.map(item => {
                // const unitsInfo = item.user && item.user.units
                // ? item.user.units.map(unit => (
                //     `Unit: ${unit.unit}, Validity: ${unit.validity}`
                //     // ""
                // ))
                // : [];
                return {
                    _id: item._id,
                    status: item.status,
                    createdat: item.createdat,
                    updatedat: item.updatedat,
                    description: item.description,
                    communityid: item.communityid,
                    userid: authCtx.userid,
                    type: item.type,
                    title: item.title,
                    date: item.date,
                    completed: item.completed,
                };
            });
            // setLoading(false);
            const requestCount = transformedData.filter(item => item.status === 1).length;
            const requsetcountv = transformedData.filter(item => item.completed === "Pending" || item.completed === "pending" || item.completed === "Will be Done" || item.completed === "Will be done").length;

            setFeedComReq(prevState => ({
                ...prevState,
                complaintt: requestCount,
                complaintv: requsetcountv,
            }));
            const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
            const notPastMenus = transformedData.filter(item => item.date <= today);

            // Custom sorting function to sort by date in descending order
            notPastMenus.sort((a, b) => {
                if (a.date === today && b.date === today) return 0; // Both are today
                if (a.date === today) return -1; // a is today, should be placed before b
                if (b.date === today) return 1; // b is today, should be placed before a
                // Neither is today, sort them based on date
                return new Date(b.date) - new Date(a.date);
            });

            // let firstTenMenus;
            // if (notPastMenus.length <= 10) {
            //     firstTenMenus = notPastMenus;
            // } else {
            //     firstTenMenus = notPastMenus.slice(0, 10);
            // }
            setDataComValues(notPastMenus); // Set the state directly without using prevData
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            // setLoading(false); // Set loading to false regardless of success or failure
        }
        // setLoading(false);
    };

    const [FeedbackValues, setFeedbackValues] = useState([]);
    const fetchFeedbackData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/FeedComReq', {
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                    type: "Feedback",
                },
                withCredentials: true,
            });
            const transformedData = response.data.map(item => {
                // const unitsInfo = item.user && item.user.units
                // ? item.user.units.map(unit => (
                //     `Unit: ${unit.unit}, Validity: ${unit.validity}`
                //     // ""
                // ))
                // : [];
                return {
                    _id: item._id,
                    status: item.status,
                    createdat: item.createdat,
                    updatedat: item.updatedat,
                    description: item.description,
                    communityid: item.communityid,
                    userid: authCtx.userid,
                    type: item.type,
                    title: item.title,
                    date: item.date,
                    completed: item.completed,
                };
            });
            const requestCount = transformedData.filter(item => item.status === 1).length;
            const requsetcountv = transformedData.filter(item => item.completed === "Pending" || item.completed === "pending" || item.completed === "Will be Done" || item.completed === "Will be done").length;

            setFeedComReq(prevState => ({
                ...prevState,
                feebackt: requestCount,
                feedbackv: requsetcountv,
            }));
            // Set loading to false
            // setLoading(false);

            // Sort the transformedData array
            transformedData.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                const today = new Date(); // Get today's date

                // Compare dates
                if (dateA > today && dateB > today) {
                    // Both dates are in the future, compare them normally
                    return dateA - dateB;
                } else if (dateA > today) {
                    // Only dateA is in the future, so it comes first
                    return -1;
                } else if (dateB > today) {
                    // Only dateB is in the future, so it comes first
                    return 1;
                } else {
                    // Both dates are either today or in the past
                    return dateB - dateA; // Sort in descending order for past dates
                }
            });

            // Set the sorted data
            setFeedbackValues(transformedData);
            // Set the state directly without using prevData
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            // setLoading(false); // Set loading to false regardless of success or failure
        }
        // setLoading(false);
    };
    useEffect(() => {
        fetchRequestData();
        fetchData();
        DashData();
        fetchCompData();
        fetchFeedbackData();
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
                            {(isAdmin || isManager) && (<>
                                <div className={`col-sm-6 ${isManager ? 'col-lg-4' : 'col-lg-3'}`}>
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
                                                            All Data
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a
                                                                className="dropdown-item active"
                                                                href="#"
                                                            >
                                                                All Data
                                                            </a>
                                                            <a
                                                                className="dropdown-item"
                                                                href="/user"
                                                            >
                                                                See more
                                                            </a>
                                                            {/* <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Last 3 months
                                                        </a> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h1 mb-3">{baseValue.userCount}</div>
                                            <br />  <br />
                                            <div className="d-flex mb-2">
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
                                            </div>

                                            <div className="progress progress-sm">
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {!isManager && (
                                    <div className={`col-sm-6 ${isManager ? 'col-lg-4' : 'col-lg-3'}`}>
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
                                                                All Data
                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <a
                                                                    className="dropdown-item active"
                                                                    href="#"
                                                                >
                                                                    All Data
                                                                </a>
                                                                <a
                                                                    className="dropdown-item"
                                                                    href="/community"
                                                                >
                                                                    See more
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline">
                                                    <div className="h1 mb-0 me-2">
                                                        {baseValue.communityCount}
                                                    </div>
                                                    <div className="me-auto">
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
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                id="chart-revenue-bg"
                                                className="chart-sm"
                                            ></div>
                                        </div>
                                    </div>)}
                                <div className={`col-sm-6 ${isManager ? 'col-lg-4' : 'col-lg-3'}`}>
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
                                                            All Data
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a
                                                                className="dropdown-item active"
                                                                href="#"
                                                            >
                                                                All Data
                                                            </a>
                                                            <a
                                                                className="dropdown-item"
                                                                href="/variety"
                                                            >
                                                                See more
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-baseline">
                                                <div className="h1 mb-3 me-2">
                                                    {baseValue.varietyCount}
                                                </div>

                                                <div className="me-auto">
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
                                                </div>
                                            </div>
                                            <br />  <br />
                                            <div
                                                id="chart-new-clients"
                                                className="chart-sm"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-sm-6 ${isManager ? 'col-lg-4' : 'col-lg-3'}`}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="subheader">
                                                    Menus
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
                                                            All Data
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <a
                                                                className="dropdown-item active"
                                                                href="#"
                                                            >
                                                                All Data
                                                            </a>
                                                            <a
                                                                className="dropdown-item"
                                                                href="/menus"
                                                            >
                                                                See more
                                                            </a>
                                                            {/* <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Last 3 months
                                                        </a> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-baseline">
                                                <div className="h1 mb-3 me-2">
                                                    {baseValue.menuCount}
                                                </div>
                                                <div className="me-auto">
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
                                                </div>
                                            </div>
                                            <br />  <br />
                                            <div
                                                id="chart-active-users"
                                                className="chart-sm"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            )}
                            <div className="col-12">
                                <div className="row row-cards">
                                    <div className="col-sm-6 col-lg-3">
                                        <div className="card card-sm" key="requests">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="bg-primary text-white avatar">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-checkup-list"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 14h.01" /><path d="M9 17h.01" /><path d="M12 16l1 1l3 -3" /></svg>
                                                        </span>
                                                    </div>
                                                    <div className="col">
                                                        <div className="font-weight-medium">
                                                            {FeedComReq.requestt} Requests
                                                        </div>
                                                        <div className="text-secondary">
                                                            {FeedComReq.requestv} waiting requests
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                        <div className="card card-sm" key="Feedbacks">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="bg-green text-white avatar">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-certificate"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" /><path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" /><path d="M6 9l12 0" /><path d="M6 12l3 0" /><path d="M6 15l2 0" /></svg>
                                                        </span>
                                                    </div>
                                                    <div className="col">
                                                        <div className="font-weight-medium">
                                                            {FeedComReq.feebackt} Feedbacks
                                                        </div>
                                                        <div className="text-secondary">
                                                            {FeedComReq.feedbackv} waiting feedbacks
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                        <div className="card card-sm" key="complaints">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="bg-danger text-white avatar">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alert-octagon"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
                                                        </span>
                                                    </div>
                                                    <div className="col">
                                                        <div className="font-weight-medium">
                                                            {FeedComReq.complaintt} Complaints
                                                        </div>
                                                        <div className="text-secondary">
                                                            {FeedComReq.complaintv} waiting complaints
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="col-sm-6 col-lg-3">
                                        <div className="card card-sm" key="Likes">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <span className="bg-warning text-white avatar">

                                                        </span>
                                                    </div>
                                                    <div className="col">
                                                        <div className="font-weight-medium">
                                                            132 Head Count
                                                        </div>
                                                        <div className="text-secondary">
                                                          in your region
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
                                                        <td className="text-nowrap text-secondary w-2" style={{ paddingRight: '10px' }}>{item.date}</td>
                                                        <td className="text-nowrap w-5" style={{ paddingRight: '10px' }}>
                                                            <div className="text">{item.name} ({item.description})</div>
                                                        </td>
                                                        <td className="text-nowrap w-5">{item.gujaratiName}</td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-header border-0">
                                        <div className="card-title"><h3 className="h2">Requests</h3></div>
                                    </div>
                                    <div className="card-body card-body-scrollable card-body-scrollable-shadow" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                        <div className="card-table table-responsive">
                                            <table className="table table-vcenter">
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>{!isUser ? "User" : "Status"}</th>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataRequestValues.map(item => (
                                                        <tr key={item._id}>
                                                            <td className={`td text-nowrap text-secondary ${isToday(item.date) ? 'table-primary' : ''}`}>
                                                                {item.date}
                                                            </td>
                                                            <td className="td">
                                                                {!isUser ? (
                                                                    <div className={`badge ${item.completed === "Pending" || item.completed === "pending" ? "bg-red text-red-fg" : item.completed === "Will be Done" ? "bg-orange text-orange-fg" : item.completed === "Completed" ? "bg-green text-green-fg" : ""}`}>
                                                                        {UserValues.find(user => user._id === item.userid)?.name || 'N/A'}
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        {(item.completed === "Pending" || item.completed === "pending") && (
                                                                            <div className="badge bg-danger"></div>
                                                                        )}
                                                                        {item.completed === "Will be Done" && (
                                                                            <div className="badge bg-warning"></div>
                                                                        )}
                                                                        {item.completed === "Completed" && (
                                                                            <div className="badge bg-success"></div>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </td>
                                                            <td className="td">
                                                                <div className="text">{item.title}</div>
                                                            </td>
                                                            <td className="td">
                                                                <div className="text">{item.description}</div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-header border-0">
                                        <div className="card-title"><h3 className="h2">Complain</h3></div>
                                    </div>

                                    <div className="card-body card-body-scrollable card-body-scrollable-shadow" style={{ maxHeight: "400px", overflowY: "auto" }}>
                                        <div className="card-table table-responsive">
                                            <table className="table table-vcenter">
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>{!isUser ? "User" : "Status"}</th>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataComValues.map(item => (
                                                        <tr key={item._id}>
                                                            <td className={`td text-nowrap text-secondary ${isToday(item.date) ? 'table-primary' : ''}`}>
                                                                {item.date}
                                                            </td>
                                                            <td className="td">
                                                                {!isUser ? (
                                                                    <div className={`badge ${item.completed === "Pending" || item.completed === "pending" ? "bg-red text-red-fg" : item.completed === "Will be Done" ? "bg-orange text-orange-fg" : item.completed === "Completed" ? "bg-green text-green-fg" : ""}`}>
                                                                        {UserValues.find(user => user._id === item.userid)?.name || 'N/A'}
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        {(item.completed === "Pending" || item.completed === "pending") && (
                                                                            <div className="badge bg-danger"></div>
                                                                        )}
                                                                        {item.completed === "Will be Done" && (
                                                                            <div className="badge bg-warning"></div>
                                                                        )}
                                                                        {item.completed === "Completed" && (
                                                                            <div className="badge bg-success"></div>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </td>
                                                            <td className="td">
                                                                <div className="text">{item.title}</div>
                                                            </td>
                                                            <td className="td">
                                                                <div className="text">{item.description}</div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="row row-cards">

                                    <div className="col-12">
                                        <div
                                            className="card"
                                            style={{ height: "28rem" }}
                                        >
                                            <div className="card-body card-body-scrollable card-body-scrollable-shadow">
                                                <div className="divide-y">
                                                    {FeedbackValues.map(item => (
                                                        <div key={item._id}>
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <span className="avatar">
                                                                        {UserValues.find(user => user._id === item.userid)?.name.substring(0, 2) || 'N/A'}
                                                                    </span>
                                                                </div>
                                                                <div className="col">
                                                                    <div className="text-truncate">
                                                                        <strong>
                                                                            {UserValues.find(user => user._id === item.userid)?.name || 'N/A'}
                                                                        </strong>{" "}
                                                                        has shared Feedback on
                                                                        {" "}
                                                                        <strong>
                                                                            "{item.title}"
                                                                        </strong>{" "}
                                                                        which is: "{item.description}"
                                                                    </div>
                                                                    <div className="text-secondary">
                                                                        {item.date}
                                                                    </div>
                                                                </div>
                                                                <div className="col-auto align-self-center">
                                                                    <div className={`badge ${item.completed === "Pending" || item.completed === "pending" ? "bg-red text-red-fg" : item.completed === "Will be Done" ? "bg-orange text-orange-fg" : item.completed === "Completed" ? "bg-green text-green-fg" : ""}`}>
                                                                        {/* {UserValues.find(user => user._id === item.userid)?.name || 'N/A'} */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
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
