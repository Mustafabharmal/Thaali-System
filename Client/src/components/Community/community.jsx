import React, { useState, useEffect } from "react";
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
import axios from 'axios';
import NewCommunity from "./newCommunity"; 
function Community() {
    const toast = React.createRef();
    const [loading, setLoading] = useState(false); 
    const [dataTableValues, setDataTableValues] = useState([
        {
            id: "1",
            name: "upleta",
            location: "upleta gujarati",
        },
        {
            id: "2",
            name: "ghjk",
            location: "hjkl",
        },
        {
            id: "3",
            name: "ghjkl",
            location: "fghjki hhuhiui",
        },
        {
            id: "4",
            name: "hghjjkl",
            location: "ghgjhkjlk",
        },
        
    ]);

    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
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
                onClick={() => editRow(rowData)}
            />
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
    const customFilter = (value, filter) => {
        return value.toLowerCase().includes(filter.toLowerCase());
    };
    const header = (
        <div className="table-header">
            {/* <h5 className="p-m-0">Manage Users</h5> */}
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search Community"
                />
            </span>
        </div>
    );
    return (
        <>
        <div className="page-wrapper">
        <div className="page-header d-print-none">
            <div className="container-xl">
                <div className="row g-2 align-items-center">
                    <div className="col">
                        <div className="page-pretitle">Overview</div>
                        <h2 className="page-title">Community</h2>
                    </div>

                    <div className="col-auto ms-auto d-print-none">
                        <div className="btn-list">
                            <a
                                href="#"
                                className="btn btn-primary d-none d-sm-inline-block"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-report"
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
                                Create new Community
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
                                        field="name"
                                        header={<div className="text-center">Community Name</div>}
                                        body={(rowData) => (
                                            <div className="text-center">{rowData.name}</div>
                                        )}
                                        sortable
                                        filter
                                        filterMatchMode="custom"
                                        filterFunction={(value, filter) => customFilter(value, filter)}
                                    />
                                    <Column
                                        field="location"
                                        header={<div className="text-center">Community Location</div>}
                                        body={(rowData) => (
                                            <div className="text-center">{rowData.location}</div>
                                        )}
                                        sortable
                                        filter
                                        filterMatchMode="custom"
                                        filterFunction={(value, filter) => customFilter(value, filter)}
                                    />
                                    
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
    <NewCommunity/>
    </>
    )
}
export default Community;