import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import AuthContext from '../../store/auth-context';
import AddFeedback from "./addFeedback";
import EditFeedback from "./editFeedback";
function Feedback() {
    // console.log(authCtx);
    const authCtx = useContext(AuthContext);
    const isAdmin = authCtx.role === 0 || authCtx.role === "0";
    const isManager = authCtx.role === 1 || authCtx.role === "1";
    const isUser = authCtx.role === 2 || authCtx.role === "2";
    const toast = React.createRef();
    const [dataTableValues, setDataTableValues] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        _id: "",
        userid: isUser?authCtx.userid:"0",
        communityid: isAdmin ?  "0":authCtx.communityid,
        type: "Feedback",
        title: "",
        description: "",
        status: 1,
        date: "",
        completed: "pending",
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
                withCredentials: true,
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                },
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
    const deleteRow = async (rowData) => {
        console.log('Delete row:', rowData);
        setFormData(rowData);
        $('#modal-small').modal('show');

    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/FeedComReq/update/${formData._id}`, {
                method: "PUT",
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    updatedat: Date.now(),
                }),
            });
            if (response.ok) {
                console.log("User updated successfully");
                window.location.reload();
            } else {
                const responseData = await response.json(); // Extract error message from response
                if (response.status === 400 && responseData.error === "Another user with this email already exists") {
                    // Show error message for duplicate email
                    alert("Another user with this email already exists");
                } else {
                    console.error("Failed to create user");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleConfirmDelete = async () => {
        $('#modal-small').modal('hide');

        try {

            const response = await fetch(`http://localhost:3000/FeedComReq/delete/${formData._id}`, {
                method: "PUT",
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                    type: "Feedback",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: 0,
                }),
            });
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
            setLoading(false);
            setDataTableValues(transformedData); // Set the state directly without using prevData
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const header = (
        <div className="table-header">
            <div className="input-group" style={{ maxWidth: "300px" }}>
                <span className="input-group-text">
                    <i className="pi pi-search" />
                </span>
                <input
                    type="search"
                    className="form-control shadow-none"
                    placeholder="Search Feedback"
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </div>
        </div>
    );
    const LoadingPlaceholder = () => (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col-auto">
                </div>
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
            <Button
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
            />
        </div>
    ); const customFilter = (value, filter) => {
        console.log('Filtering:', value, filter);
        return String(value).toLowerCase().includes(String(filter).toLowerCase());
    };

    return (
        <>
        <div className="page-wrapper">
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <div className="page-pretitle">Overview</div>
                            <h2 className="page-title">Feedback</h2>
                        </div>

                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <a
                                    href="#"
                                    className="btn btn-primary d-none d-sm-inline-block"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal-feedbackadd"
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
                                </a>
                                <a
                                    href="#"
                                    className="btn btn-primary d-sm-none btn-icon"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal-feedbackadd"
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
                                                        rowsPerPageOptions={[5, 10, 20]}
                                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                                        globalFilter={globalFilter}
                                                        header={header}
                                                        selectionMode="multiple"
                                                        selection={selectedRows}
                                                        onSelectionChange={(e) => setSelectedRows(e.value)}
                                                        style={{ fontSize: "1em" }}

                                                    >
                                                        <Column style={{ display: "none" }} hidden field="id" header="#" />
                                                        <Column
                                                            field="userid"
                                                            header="User"
                                                            body={(rowData) => (
                                                                <div className="text-center">{rowData.userid}</div>
                                                            )}
                                                            style={{ textAlign: "center", width: "8em" }}
                                                            sortable
                                                            filter
                                                            filterMatchMode="custom"
                                                            filterFunction={(value, filter) => customFilter(value, filter)}
                                                            headerStyle={{ textAlign: "center" }} // Center-align the header
                                                        />
                                                      
                                                        {isAdmin && (
                                                            <Column
                                                                field="communityid"
                                                                header={<div className="text-center">Community</div>}
                                                                body={(rowData) => (
                                                                    <div className="text-center">
                                                                        {ComValues.find(community => community._id === rowData.communityid)?.name || 'N/A'}
                                                                    </div>
                                                                )}
                                                                style={{ textAlign: "center", width: "8em" }}
                                                                sortable
                                                                filter
                                                                filterMatchMode="custom"
                                                                filterFunction={(value, filter) =>
                                                                    customFilter(ComValues.find(community => community._id === value)?.name || '', filter
                                                                    )
                                                                }
                                                            />)}
                                                              <Column
                                                            field="title"
                                                            header="Title"
                                                            body={(rowData) => (
                                                                <div className="text-center">{rowData.title}</div>
                                                            )}
                                                            style={{ textAlign: "center", width: "8em" }}
                                                            sortable
                                                            filter
                                                            filterMatchMode="custom"
                                                            filterFunction={(value, filter) => customFilter(value, filter)}
                                                            headerStyle={{ textAlign: "center" }} // Center-align the header
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
                                                                <div className="text-center">{rowData.description
                                                                }</div>
                                                            )}
                                                            style={{ textAlign: "center", width: "8em" }}
                                                            sortable
                                                            filter
                                                            headerStyle={{ textAlign: "center" }} // Center-align the header
                                                            filterMatchMode="custom"
                                                            filterFunction={(value, filter) => customFilter(value, filter)}
                                                        />
                                                         <Column
                                                            field="date"
                                                            header="Date"
                                                            body={(rowData) => (
                                                                <div className="text-center">{rowData.date
                                                                }</div>
                                                            )}
                                                            style={{ textAlign: "center", width: "8em" }}
                                                            sortable
                                                            filter
                                                            headerStyle={{ textAlign: "center" }} // Center-align the header
                                                            filterMatchMode="custom"
                                                            filterFunction={(value, filter) => customFilter(value, filter)}
                                                        />
                                                         <Column
                                                        field="type"
                                                            header="type"
                                                            body={(rowData) => (
                                                                <div className="text-center">{rowData.type
                                                                }</div>
                                                            )}
                                                            style={{ textAlign: "center", width: "8em" }}
                                                            sortable
                                                            filter
                                                            headerStyle={{ textAlign: "center" }} // Center-align the header
                                                            filterMatchMode="custom"
                                                            filterFunction={(value, filter) => customFilter(value, filter)}
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
                                                        <Column
                                                            body={actionTemplate}
                                                            header="Action"
                                                            style={{ textAlign: "center", width: "8em" }}
                                                        />
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
         <div className="modal modal-blur fade" id="modal-small" tabIndex="-2" role="dialog" aria-hidden="true">
         <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
             <div className="modal-content">
                 <div className="modal-body">
                     <div className="modal-title">Are you sure?</div>
                     <div>If you proceed, the Feedback will be deleted.</div>
                 </div>
                 <div className="modal-footer">
                     <button type="button" className="btn btn-link link-secondary me-auto" data-bs-dismiss="modal">
                         Cancel
                     </button>
                     <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                         Yes, delete Feedback
                     </button>
                 </div>
             </div>
         </div>
     </div>
     <AddFeedback/>
     <EditFeedback formData={formData} handleChange={handleChange} setFormData={setFormData} handleUpdate={handleUpdate} ComValues={ComValues}/>
     </>
    )
}
export default Feedback