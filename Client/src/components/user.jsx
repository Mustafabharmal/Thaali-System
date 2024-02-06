import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
function User() {
    const [dataTableValues, setDataTableValues] = useState([
        {
            id: 1,
            name: "hi",
            email: "hi@example.com",
            number: "12345",
            packageName: "Basic",
            address: "123 Street, City",
            action: "hdsfsd",
        },
        {
            id: 1,
            name: "hi",
            email: "hi@example.com",
            number: "12345",
            packageName: "Basic",
            address: "123 Street, City",
            action: "hdsfsd",
        },
        {
            id: 1,
            name: "mustafa",
            email: "hi@example.com",
            number: "12345",
            packageName: "Basic",
            address: "123 Street, City",
            action: "hdsfsd",
        },
        {
            id: 1,
            name: "bharmal",
            email: "hi@example.com",
            number: "12345",
            packageName: "Basic",
            address: "123 Street, City",
            action: "hdsfsd",
        },
        {
            id: 1,
            name: "hi",
            email: "hi@example.com",
            number: "12345",
            packageName: "Basic",
            address: "123 Street, City",
            action: "hdsfsd",
        },
        {
            id: 1,
            name: "hi",
            email: "hi@example.com",
            number: "12345",
            packageName: "Basic",
            address: "123 Street, City",
            action: "hdsfsd",
        },
        {
            id: 1,
            name: "hi",
            email: "hi@example.com",
            number: "12345",
            packageName: "Basic",
            address: "123 Street, City",
            action: "hdsfsd",
        },
        // Add more data as needed
    ]);

    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const toast = React.createRef();

    useEffect(() => {}, []);

    const header = (
        <div className="table-header">
            {/* <h5 className="p-m-0">Manage Users</h5> */}
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search User"
                />
            </span>
        </div>
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
                onClick={() => editRow(rowData)}
            />
        </div>
    );

    const customFilter = (value, filter) => {
        return value.toLowerCase().includes(filter.toLowerCase());
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <div className="page-pretitle">Overview</div>
                                <h2 className="page-title">Users</h2>
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
                                        Create new User
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
                                                    globalFilter={globalFilter}
                                                    header={header}
                                                    selectionMode="multiple"
                                                    selection={selectedRows}
                                                    onSelectionChange={(e) =>
                                                        setSelectedRows(e.value)
                                                    }
                                                    style={{ fontSize: "1em" }}
                                                >
                                                    <Column
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        hidden
                                                        field="id"
                                                        header="#"
                                                    />
                                                    <Column
                                                        field="name"
                                                        header="Organizer Name"
                                                        body={(rowData) => (
                                                            <div className="text-center">
                                                                {rowData.name}
                                                            </div>
                                                        )}
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
                                                    />
                                                    <Column
                                                        field="email"
                                                        header="Organization Email"
                                                        body={(rowData) => (
                                                            <div className="text-center">
                                                                {rowData.email}
                                                            </div>
                                                        )}
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
                                                    />
                                                    <Column
                                                        field="number"
                                                        header="Organization Number"
                                                        body={(rowData) => (
                                                            <div className="text-center">
                                                                {rowData.number}
                                                            </div>
                                                        )}
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
                                                    />
                                                    <Column
                                                        field="packageName"
                                                        header="Package Name"
                                                        body={(rowData) => (
                                                            <div className="text-center">
                                                                {
                                                                    rowData.packageName
                                                                }
                                                            </div>
                                                        )}
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
                                                    />
                                                    <Column
                                                        field="address"
                                                        header="Organization Address"
                                                        body={(rowData) => (
                                                            <div className="text-center">
                                                                {
                                                                    rowData.address
                                                                }
                                                            </div>
                                                        )}
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
                                                    />
                                                    <Column
                                                        body={actionTemplate}
                                                        header="Action"
                                                        style={{
                                                            textAlign: "center",
                                                            width: "8em",
                                                        }}
                                                    />
                                                </DataTable>
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
                id="modal-report"
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New User</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-selectgroup-boxes row mb-3">
                                <div className="col-lg-6">
                                    <label className="form-label">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="example-text-input"
                                        placeholder="User name"
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <label className="form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="example-text-input"
                                        placeholder="User name"
                                    />
                                </div>
                            </div>
                            <label className="form-label">Report type</label>
                            <div className="form-selectgroup-boxes row mb-3">
                                <div className="col-lg-6">
                                    <label className="form-selectgroup-item">
                                        <input
                                            type="radio"
                                            name="report-type"
                                            value="1"
                                            className="form-selectgroup-input"
                                            defaultChecked="true"
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
                                            name="report-type"
                                            value="1"
                                            className="form-selectgroup-input"
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
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Email Id
                                        </label>
                                        <div className="input-group input-group-flat">
                                            <span className="input-group-text">
                                                {/* Email Id */}
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control ps-0"
                                                // defaultValue="report-01"
                                                placeholder="Email Id"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Region
                                        </label>
                                        <select className="form-select">
                                            <option
                                                value="1"
                                                defaultValue="true"
                                            >
                                                Upleta
                                            </option>
                                            <option value="2">Rajkot</option>
                                            <option value="3">Jamnagar</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Phone No.
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Plan Valid till
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div>
                                        <label className="form-label">
                                            Additional information
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
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
                            ></a>
                            <a
                                href="#"
                                className="btn btn-primary ms-auto"
                                data-bs-dismiss="modal"
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
                                Create new User
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default User;
