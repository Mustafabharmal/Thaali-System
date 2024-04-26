import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import AuthContext from "../../store/auth-context";
import AddRequests from "./AddRequests";
import EditRequests from "./EditRequests";
// import AddFeedback from "./addFeedback";
// import EditFeedback from "./editFeedback";
function Requests() {
    // console.log(authCtx);
    const authCtx = useContext(AuthContext);
    const isAdmin = authCtx.role === 0 || authCtx.role === "0";
    const isManager = authCtx.role === 1 || authCtx.role === "1";
    const isUser = authCtx.role === 2 || authCtx.role === "2";
    const toast = React.createRef();
    const [dataTableValues, setDataTableValues] = useState([]);


    // Pass the fil
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        _id: "",
        userid: isUser ? authCtx.userid : "0",
        communityid: isAdmin ? "0" : authCtx.communityid,
        type: "Requests",
        title: "",
        description: "",
        status: 1,
        date: "",
        completed: "pending",
        createdat: Date.now(),
        updatedat: Date.now(),
    });

    const [ComValues, setComValues] = useState([]);
    const [UserValues, setUserValues] = useState([]);
    useEffect(() => {
        isAdmin && fetchComData();
    }, []);


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
            setLoading(false);
            setUserValues(transformedData); // Set the state directly without using prevData
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
        setLoading(false);
    };
    useEffect(() => {
        !isUser && fetchUserData();
    }, []);

    const fetchComData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/community",
                {
                    withCredentials: true,
                    headers: {
                        authorization: `Mustafa ${authCtx.token}`,
                    },
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
    const deleteRow = async (rowData) => {
        console.log("Delete row:", rowData);
        setFormData(rowData);
        $("#modal-small").modal("show");
    };
    const handleUpdate = async (updatedFormData) => {
        try {
            console.log(updatedFormData);
            const response = await fetch(
                `http://localhost:3000/FeedComReq/update/${updatedFormData._id}`,
                {
                    method: "PUT",
                    headers: {
                        authorization: `Mustafa ${authCtx.token}`,
                        // headers: {
                        //     authorization: `Mustafa ${authCtx.token}`,
                        type: "Requests",
                        // },
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...updatedFormData,
                        updatedat: Date.now(),
                    }),
                }
            );
            if (response.ok) {
                console.log("Request updated successfully");
                window.location.reload(); // Reload the page to reflect the changes
            } else {
                console.error("Failed to update request");
                const responseData = await response.json();
                // Handle error response as needed
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleConfirmDelete = async () => {
        $("#modal-small").modal("hide");

        try {
            const response = await fetch(
                `http://localhost:3000/FeedComReq/delete/${formData._id}`,
                {
                    method: "PUT",
                    headers: {
                        authorization: `Mustafa ${authCtx.token}`,
                        type: "Requests",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: 0,
                    }),
                }
            );
            if (response.ok) {
                console.log("FeedComReq deleted successfully");
                window.location.reload();
            } else {
                console.error("Failed to delete FeedComReq");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const intValue = [
                // "communityid",
                // "thaaliuser",
                // "role",
            ].includes(name)
                ? parseInt(value, 10)
                : value;
            const formattedValue = name.endsWith("at")
                ? new Date(value).toISOString()
                : intValue;

            return {
                ...prevData,
                [name]: formattedValue,
            };
        });
    };

    const fetchData = async () => {
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
            setLoading(false);
            setDataTableValues(transformedData); // Set the state directly without using prevData
            console.log(transformedData)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const header = (
        <div className="table-header d-flex align-items-center justify-content-between">
            <div className="input-group" style={{ maxWidth: "300px" }}>
                <span className="input-group-text">
                    <i className="pi pi-search" />
                </span>
                <input
                    type="search"
                    className="form-control shadow-none"
                    placeholder="Search Requests"
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </div>
            <div className="status-buttons d-flex align-items-center">
                <div className="status-button">
                    <button
                        className={`btn mr-1 ${globalFilter === "Pending" ? "btn-danger" : "btn-outline-danger"} form-selectgroup-item`}
                        onClick={() => setGlobalFilter("Pending")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-alert-square-rounded"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                            <path d="M12 8v4" />
                            <path d="M12 16h.01" />
                        </svg>
                        Pending
                    </button>
                </div>
                <div className="status-button">
                    <button
                        className={`btn mr-1 ${globalFilter === "Will be Done" ? "btn-warning" : "btn-outline-warning"} form-selectgroup-item`}
                        onClick={() => setGlobalFilter("Will be Done")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-clock-check"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M20.942 13.021a9 9 0 1 0 -9.407 7.967" />
                            <path d="M12 7v5l3 3" />
                            <path d="M15 19l2 2l4 -4" />
                        </svg>
                        Will be Done
                    </button>
                </div>
                <div className="status-button">
                    <button
                        className={`btn mr-1 ${globalFilter === "Completed" ? "btn-success" : "btn-outline-success"} form-selectgroup-item`}
                        onClick={() => setGlobalFilter("Completed")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-checks"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 12l5 5l10 -10" />
                            <path d="M2 12l5 5m5 -5l5 -5" />
                        </svg>
                        Completed
                    </button>
                </div>
                <div className="status-button">
                    <button
                        className="btn btn-outline-primary btn-icon"
                        onClick={() => setGlobalFilter("")} // Clear the filter
                    >
                        <span>All</span>
                    </button>
                </div>
            </div>
        </div>
    );
    const LoadingPlaceholder = () => (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col-auto"></div>
                <div className="col-7">
                    <div className="placeholder placeholder-xs col-9"></div>
                    <div className="placeholder placeholder-xs col-7"></div>
                </div>
                <div className="col-2 ms-auto text-end">
                    <div className="placeholder placeholder-xs col-8"></div>
                    <div className="placeholder placeholder-xs col-10"></div>
                </div>
            </div>
        </li>
    );
    const actionTemplate = (rowData) => (
        <div className="text-center">
            {/* <Button
                icon="pi pi-trash"
                className="p-button-rounded btn btn-danger"
                onClick={() => deleteRow(rowData)}

            />
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded btn btn-primary"
                onClick={() => {
                    setFormData(rowData)
                }}
                data-bs-toggle="modal"
                data-bs-target="#modal-edit"
            /> */}
            {/* <div className="demo-icons-list-wrap">
                <div className="demo-icons-list"> */}
            <div className="mb-1">
                <div className="form-selectgroup">
                    {/* <label className="form-selectgroup-item "> */}
                        <button
                            type="button"
                            className={`btn-icon mr-1 btn ${rowData.completed && rowData.completed.toLowerCase() === "pending" ? "btn-danger" : "btn-outline-danger" }`}
                            onClick={() => handleUpdate({ ...rowData, completed: "Pending" })}
                            title="Pending"
                            data-bs-toggle="tooltip"
                            data-bs-placement="left"
                        >

                            <span className="icon-wrapper d-flex justify-content-center align-items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icons-tabler-outline icon-tabler-alert-square-rounded"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                                    <path d="M12 8v4" />
                                    <path d="M12 16h.01" />
                                </svg>
                            </span>
                        </button>
                    {/* </label>
                    <label className="form-selectgroup-item"> */}
                        <button
                            type="button"
                            name="icons"
                            className={`btn-icon mr-1 btn ${rowData.completed === "Will be Done" ? "btn-warning" : "btn-outline-warning"}`}
                            onClick={() => handleUpdate({ ...rowData, completed: "Will be Done" })}
                            title="Will Be Done"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                        >
                            <span className="icon-wrapper d-flex justify-content-center align-items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icons-tabler-outline icon-tabler-clock-check"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M20.942 13.021a9 9 0 1 0 -9.407 7.967" />
                                    <path d="M12 7v5l3 3" />
                                    <path d="M15 19l2 2l4 -4" />
                                </svg>
                            </span>
                        </button>
                    {/* </label>
                    <label className="form-selectgroup-item"> */}
                        <button
                            type="button"
                            className={`btn-icon btn ${rowData.completed === "Completed" ? "btn-success" : "btn-outline-success"}`}
                            onClick={() => handleUpdate({ ...rowData, completed: "Completed" })}
                            title="Completed"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                        >
                            <span className="icon-wrapper d-flex justify-content-center align-items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icons-tabler-outline icon-tabler-checks"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M7 12l5 5l10 -10" />
                                    <path d="M2 12l5 5m5 -5l5 -5" />
                                </svg>
                            </span>
                        </button>
                    {/* </label> */}
                    {/* <label className="form-selectgroup-item"> */}
                </div>



            </div>
        </div>
        // </div></div>
    );
    const customFilter = (value, filter) => {
        // console.log("Filtering:", value, filter);
        return String(value)
            .toLowerCase()
            .includes(String(filter).toLowerCase());
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <div className="page-pretitle">Overview</div>
                                <h2 className="page-title">Requests</h2>
                            </div>

                            <div className="col-auto ms-auto d-print-none">
                                <div className="btn-list">
                                    <a
                                        href="#"
                                        className="btn btn-primary d-none d-sm-inline-block"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modal-Requestsadd"
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
                                        Create new Requests
                                    </a>
                                    <a
                                        href="#"
                                        className="btn btn-primary d-sm-none btn-icon"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modal-Requestsadd"
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

                <div className="col-12">
                    <Toast ref={toast} />
                    <div className="page-body">
                        <div className="container-xl">
                            <div className="row row-deck row-cards">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="card">
                                            <div className="card-body">
                                                {loading ? ( // Display loading spinner when loading is true
                                                    <ul className="list-group list-group-flush placeholder-glow">
                                                        <LoadingPlaceholder />
                                                        <LoadingPlaceholder />
                                                        <LoadingPlaceholder />
                                                        <LoadingPlaceholder />
                                                    </ul>
                                                ) : (
                                                    <DataTable
                                                        value={dataTableValues}
                                                        className="p-datatable-striped"
                                                        paginator
                                                        rows={5}
                                                        rowsPerPageOptions={[
                                                            5, 10, 20,
                                                        ]}
                                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                                        globalFilter={
                                                            globalFilter
                                                        }
                                                        header={header}
                                                        // selectionMode="multiple"
                                                        // selection={selectedRows}
                                                        // onSelectionChange={(e) => setSelectedRows(e.value)}
                                                        style={{
                                                            fontSize: "1em",
                                                        }}
                                                    >
                                                        <Column
                                                            style={{
                                                                display: "none",
                                                            }}
                                                            hidden
                                                            field="id"
                                                            header="#"
                                                        />
                                                        {!isUser && (
                                                            <Column
                                                                field="userid"
                                                                header="User"
                                                                body={rowData => (
                                                                    <div className="text-center">
                                                                        {/* Log rowData to check its content */}
                                                                        {/* {console.log('rowData:', rowData)} */}
                                                                        {/* Log UserValues to check its content */}
                                                                        {/* {console.log('UserValues:', UserValues)} */}
                                                                        {/* Log the result of UserValues.find() to check if it's finding the correct user */}
                                                                        {UserValues.find(users => users._id === rowData.userid)?.name || 'N/A'}
                                                                    </div>
                                                                )}
                                                                style={{
                                                                    textAlign:
                                                                        "center",
                                                                    width: "8em",
                                                                }}
                                                                sortable
                                                                filter
                                                                filterMatchMode="custom"
                                                                filterFunction={(value, filter) =>
                                                                    customFilter(
                                                                        UserValues.find(users => users._id === value)?.name || '',
                                                                        filter
                                                                    )
                                                                }
                                                                headerStyle={{
                                                                    textAlign:
                                                                        "center",
                                                                }} // Center-align the header
                                                            />
                                                        )}

                                                        {isAdmin && (
                                                            <Column
                                                                field="communityid"
                                                                header={
                                                                    <div className="text-center">
                                                                        Community
                                                                    </div>
                                                                }
                                                                body={(
                                                                    rowData
                                                                ) => (
                                                                    <div className="text-center">
                                                                        {ComValues.find(
                                                                            (
                                                                                community
                                                                            ) =>
                                                                                community._id ===
                                                                                rowData.communityid
                                                                        )
                                                                            ?.name ||
                                                                            "N/A"}
                                                                    </div>
                                                                )}
                                                                style={{
                                                                    textAlign:
                                                                        "center",
                                                                    width: "8em",
                                                                }}
                                                                sortable
                                                                filter
                                                                filterMatchMode="custom"
                                                                filterFunction={(
                                                                    value,
                                                                    filter
                                                                ) =>
                                                                    customFilter(
                                                                        ComValues.find(
                                                                            (
                                                                                community
                                                                            ) =>
                                                                                community._id ===
                                                                                value
                                                                        )
                                                                            ?.name ||
                                                                        "",
                                                                        filter
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                        <Column
                                                            field="title"
                                                            header="Title"
                                                            body={(rowData) => (
                                                                <div className="text-center">
                                                                    {
                                                                        rowData.title
                                                                    }
                                                                </div>
                                                            )}
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                                width: "8em",
                                                            }}
                                                            sortable
                                                            filter
                                                            filterMatchMode="custom"
                                                            filterFunction={(
                                                                value,
                                                                filter
                                                            ) =>
                                                                customFilter(
                                                                    value,
                                                                    filter
                                                                )
                                                            }
                                                            headerStyle={{
                                                                textAlign:
                                                                    "center",
                                                            }} // Center-align the header
                                                        />
                                                        {/* <Column
                                                            field="location"
                                                            header="Gujarati Name"
                                                            body={(rowData) => (
                                                                <div className="text-center">{rowData.gujaratiName}</div>
                                                            )}
                                                            style={{ textAlign: "center", width: "8em" }}
                                                            sortable
                                                            filter
                                                            headerStyle={{ textAlign: "center" }} // Center-align the header
                                                            filterMatchMode="custom"
                                                            filterFunction={(value, filter) => customFilter(value, filter)}
                                                        /> */}
                                                        <Column
                                                            field="Description"
                                                            header="Description"
                                                            body={(rowData) => (
                                                                <div className="text-center">
                                                                    {
                                                                        rowData.description
                                                                    }
                                                                </div>
                                                            )}
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                                width: "8em",
                                                            }}
                                                            sortable
                                                            filter
                                                            headerStyle={{
                                                                textAlign:
                                                                    "center",
                                                            }} // Center-align the header
                                                            filterMatchMode="custom"
                                                            filterFunction={(
                                                                value,
                                                                filter
                                                            ) =>
                                                                customFilter(
                                                                    value,
                                                                    filter
                                                                )
                                                            }
                                                        />
                                                        <Column
                                                            field="date"
                                                            header="Date"
                                                            body={(rowData) => (
                                                                <div className="text-center">
                                                                    {
                                                                        rowData.date
                                                                    }
                                                                </div>
                                                            )}
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                                width: "8em",
                                                            }}
                                                            sortable
                                                            filter
                                                            headerStyle={{
                                                                textAlign:
                                                                    "center",
                                                            }} // Center-align the header
                                                            filterMatchMode="custom"
                                                            filterFunction={(
                                                                value,
                                                                filter
                                                            ) =>
                                                                customFilter(
                                                                    value,
                                                                    filter
                                                                )
                                                            }
                                                        />
                                                        <Column
                                                            field="completed"
                                                            header="Status"
                                                            body={(rowData) => (
                                                                <div className="text-center">
                                                                     <div className={`badge ${rowData.completed === "Pending" || rowData.completed === "pending" ? "bg-red text-red-fg" : rowData.completed === "Will be Done"|| rowData.completed === "Will be done" ? "bg-orange text-orange-fg" : rowData.completed === "Completed" ? "bg-green text-green-fg" : ""}`}>
                                                                        {rowData.completed}
                                                                    </div>
                                                                </div>
                                                                
                                                            )}
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                                width: "8em",
                                                            }}
                                                            sortable
                                                            filter
                                                            headerStyle={{
                                                                textAlign:
                                                                    "center",
                                                            }} // Center-align the header
                                                            filterMatchMode="custom"
                                                            filterFunction={(
                                                                value,
                                                                filter
                                                            ) =>
                                                                customFilter(
                                                                    value,
                                                                    filter
                                                                )
                                                            }
                                                        />
                                                        {/* <Column
                                                            field="Calories"
                                                            header="Calories"
                                                            body={(rowData) => (
                                                                <div className="text-center">{rowData.calories}</div>
                                                            )}
                                                            style={{ textAlign: "center", width: "8em" }}
                                                            sortable
                                                            filter
                                                            headerStyle={{ textAlign: "center" }} // Center-align the header
                                                            filterMatchMode="custom"
                                                            filterFunction={(value, filter) => customFilter(value, filter)}
                                                        /> */}
                                                        {!isUser && (
                                                            <Column
                                                                body={
                                                                    actionTemplate
                                                                }
                                                                header="Action"
                                                                style={{
                                                                    textAlign:
                                                                        "center",
                                                                    width: "11em",
                                                                }}
                                                            />
                                                        )}
                                                    </DataTable>
                                                )}
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
                            <div>
                                If you proceed, the Requests will be deleted.
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-link link-secondary me-auto"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleConfirmDelete}
                            >
                                Yes, delete Requests
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <AddRequests />

            {/* <AddFeedback/>*/}
            <EditRequests
                formData={formData}
                handleChange={handleChange}
                setFormData={setFormData}
                handleUpdate={handleUpdate}
                ComValues={ComValues}
            />
        </>
    );
}
export default Requests;
