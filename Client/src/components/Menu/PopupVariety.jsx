import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
// import AddUser  from "./addUser";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import axios from "axios";
import AuthContext from '../../store/auth-context';
function PopupVariety({ setFormData, formData }) {
    const authCtx = useContext(AuthContext);
    const isAdmin = authCtx.role === 0 || authCtx.role === "0";
    const isManager = authCtx.role === 1 || authCtx.role === "1";
    const isUser = authCtx.role === 2 || authCtx.role === "2";
    const toast = React.createRef();
    const [loading, setLoading] = useState(false);
    const [dataTableValues, setDataTableValues] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    // const [ComValues, setComValues] = useState([]);
    // const [formData, setFormData] = useState({
    //     _id: "",
    //     name: "",
    //     calories: 1,
    //     description: "",
    //     gujaratiName: "",
    //     communityid: "",
    //     status: 1,
    //     createdat: Date.now(),
    //     updatedat: Date.now(),
    // });
    const [ComValues, setComValues] = useState([]);

    useEffect(() => {
        isAdmin && (fetchComData());
        return () => {
        };
    }, []);

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
                // communityid: item.communityid,
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
    const actionTemplate = (rowData) => (
        <div className="text-center">
            <Button
                // icon="pi pi-pencil"
                className="p-button-rounded btn btn-primary"
                onClick={() => {
                    setFormData((formData) => ({
                        ...formData,
                        // _id: rowData._id,
                        name: rowData.name,
                        calories: rowData.calories,
                        description: rowData.description,
                        gujaratiName: rowData.gujaratiName,
                        communityid: rowData.communityid,
                        status: rowData.status,
                        createdat: rowData.createdat,
                        updatedat: rowData.updatedat,
                    }));
                    document.getElementById('data').value = rowData.gujaratiName;
                }}
                data-bs-dismiss="modal"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-switch-3">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 17h2.397a5 5 0 0 0 4.096 -2.133l.177 -.253m3.66 -5.227l.177 -.254a5 5 0 0 1 4.096 -2.133h3.397" />
                    <path d="M18 4l3 3l-3 3" />
                    <path d="M3 7h2.397a5 5 0 0 1 4.096 2.133l4.014 5.734a5 5 0 0 0 4.096 2.133h3.397" />
                    <path d="M18 20l3 -3l-3 -3" />
                </svg>
                Use This
            </Button>
        </div>
    );


    const LoadingPlaceholder = () => (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col-auto">
                    <div className="avatar avatar-rounded placeholder"></div>
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


    const handleGlobalFilter = (e) => {
        setGlobalFilter(e.target.value);
    };



    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/variety", {
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                },
                withCredentials: true,
            });
            const transformedData = response.data.map((item) => {
                return {
                    _id: item._id,
                    name: item.name,
                    status: item.status,
                    createdat: item.createdat,
                    updatedat: item.updatedat,
                    calories: item.calories,
                    description: item.description,
                    gujaratiName: item.gujaratiName,
                    communityid: item.communityid,
                };
            });
            setLoading(false);
            setDataTableValues(transformedData); // Set the state directly without using prevData
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
    return (
        <>
            {/* <div className="page-wrapper"> */}
            <div
                className="modal modal-blur fade"
                id="modal-verity"
                tabIndex="-2"
                role="dialog"
                aria-hidden="true"
            >
                {/* <div className="modal modal-blur fade" id="modal-verity" tabIndex="-1" role="dialog" aria-hidden="true"> */}
                <div className="modal-dialog modal-full-width col-8 mx-auto modal-dialog-centered" role="document">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Variety</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
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
                                    rows={10}
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                    globalFilter={globalFilter.trim() ? globalFilter : null}
                                    header={
                                        <div className="table-header">
                                            <div className="input-group" style={{ maxWidth: "300px" }}>
                                                <span className="input-group-text">
                                                    <i className="pi pi-search" />
                                                </span>
                                                <input
                                                    type="search"
                                                    className="form-control shadow-none"
                                                    placeholder="Search Variety"
                                                    onInput={handleGlobalFilter}
                                                />
                                            </div>
                                        </div>}
                                    selectionMode="multiple"
                                    selection={selectedRows}
                                    onSelectionChange={(e) => setSelectedRows(e.value)}
                                    style={{ fontSize: "1em" }}
                                >
                                    <Column style={{ display: "none" }} hidden field="id" header="#" />
                                    <Column
                                        field="name"
                                        header="Variety Name"
                                        body={(rowData) => (
                                            <div className="text-center">{rowData.name}</div>
                                        )}
                                        style={{ textAlign: "center", width: "8em" }}
                                        sortable
                                        headerStyle={{ textAlign: "center" }}
                                    />
                                    {isAdmin && (
                                        <Column
                                            field="communityid"
                                            header={<div className="text-center">Community</div>}
                                            body={(rowData) => (
                                                <div className="text-center">
                                                    {ComValues.find((community) => community._id === rowData.communityid)?.name || "N/A"}
                                                </div>
                                            )}
                                            style={{ textAlign: "center", width: "8em" }}
                                            sortable
                                            headerStyle={{ textAlign: "center" }}
                                        />)}
                                    <Column
                                        field="location"
                                        header="Gujarati Name"
                                        body={(rowData) => (
                                            <div className="text-center">{rowData.gujaratiName}</div>
                                        )}
                                        style={{ textAlign: "center", width: "8em" }}
                                        sortable
                                        headerStyle={{ textAlign: "center" }}
                                    />
                                    <Column
                                        field="description"
                                        header="Description"
                                        body={(rowData) => (
                                            <div className="text-center">{rowData.description}</div>
                                        )}
                                        style={{ textAlign: "center", width: "8em" }}
                                        sortable
                                        headerStyle={{ textAlign: "center" }}
                                    />
                                    <Column
                                        field="calories"
                                        header="Calories"
                                        body={(rowData) => (
                                            <div className="text-center">{rowData.calories}</div>
                                        )}
                                        style={{ textAlign: "center", width: "8em" }}
                                        sortable
                                        headerStyle={{ textAlign: "center" }}
                                    />
                                    <Column
                                        body={actionTemplate}
                                        header="Action"
                                        style={{ textAlign: "center", width: "8em" }}
                                    />
                                </DataTable>

                            )}
                            {/* <div className="col-12">
                            <Toast ref={toast} />
                          
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <AddVeriety/> */}
            {/* <NewCommunity/>*/}
            {/* <EditVarity formData={formData}  handleChange={handleChange} handleUpdate={handleUpdate} handleKeyUp={handleKeyUp} ComValues={ComValues} />  */}
            {/* <EditUser /> */}
            {/* <div className="modal modal-blur fade" id="modal-small" tabIndex="-2" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                    <div className="modal-title">Are you sure?</div>
                    <div>If you proceed, the Variety will be deleted.</div>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-link link-secondary me-auto" data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                        Yes, delete Variety
                    </button>
                    </div>
                </div>
                </div>
            </div> */}
        </>
    );
}
export default PopupVariety;
