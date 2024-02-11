import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import AddUser  from "./addUser";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import axios from 'axios';
function User() {
    const [dataTableValues, setDataTableValues] = useState([]);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users', {
                    withCredentials: true,
                });
               
    
                const transformedData = response.data.map(item => {
                    const unitsInfo = item.user && item.user.units
                    ? item.user.units.map(unit => (
                        `Unit: ${unit.unit}, Validity: ${unit.validity}`
                        // ""
                    ))
                    : [];

                
                    return {
                        id: item.user.id,
                        name: item.user.name,
                        email: item.user.email,
                        number: item.user.phoneno,
                        packageName: unitsInfo.join("\n"), // Display all units
                        address: `${item.user.name}'s ${item.user.address}`,
                        action: 'hdsfsd',
                        role: item.user.role,
                        status: item.user.status,
                        communityid: item.user.communityid,
                        password: item.user.password,
                        headcount: item.user.headcount,
                        createdat: item.user.createdat,
                        updatedat: item.user.updatedat,
                        thaaliuser: item.user.thaaliuser,
                    };
                });
                console.log(transformedData)
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
    
        fetchData();
    }, []);
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
                                                header="Name"
                                                body={(rowData) => (
                                                    <div className="text-center">{rowData.name}</div>
                                                )}
                                                sortable
                                                filter
                                                filterMatchMode="custom"
                                                filterFunction={(value, filter) => customFilter(value, filter)}
                                            />
                                            <Column
                                                field="email"
                                                header="Email Id"
                                                body={(rowData) => (
                                                    <div className="text-center">{rowData.email}</div>
                                                )}
                                                sortable
                                                filter
                                                filterMatchMode="custom"
                                                filterFunction={(value, filter) => customFilter(value, filter)}
                                            />
                                            <Column
                                                field="number"
                                                header="Phone Number"
                                                body={(rowData) => (
                                                    <div className="text-center">{rowData.number}</div>
                                                )}
                                                sortable
                                                filter
                                                filterMatchMode="custom"
                                                filterFunction={(value, filter) => customFilter(value, filter)}
                                            />
                                            <Column
                                                field="units"
                                                header="Unit Count"
                                                body={(rowData) => (
                                                    <div className="text-center">{rowData.packageName}</div>
                                                )}
                                                sortable
                                                filter
                                                filterMatchMode="custom"
                                                filterFunction={(value, filter) => customFilter(value, filter)}
                                            />
                                            <Column
                                                field="address"
                                                header="Address"
                                                body={(rowData) => (
                                                    <div className="text-center">{rowData.address}</div>
                                                )}
                                                sortable
                                                filter
                                                filterMatchMode="custom"
                                                filterFunction={(value, filter) => customFilter(value, filter)}
                                            />
                                            <Column
                                                field="role"
                                                header="Role"
                                                body={(rowData) => (
                                                    <div className="text-center">{rowData.role}</div>
                                                )}
                                                sortable
                                                filter
                                                filterMatchMode="custom"
                                                filterFunction={(value, filter) => customFilter(value, filter)}
                                            />
                                            <Column
                                                field="communityid"
                                                header="Community ID"
                                                body={(rowData) => (
                                                    <div className="text-center">{rowData.communityid}</div>
                                                )}
                                                sortable
                                                filter
                                                filterMatchMode="custom"
                                                filterFunction={(value, filter) => customFilter(value, filter)}
                                            />
                                            <Column
                                                field="headcount"
                                                header="Head Count"
                                                body={(rowData) => (
                                                    <div className="text-center">{rowData.headcount}</div>
                                                )}
                                                sortable
                                                filter
                                                filterMatchMode="custom"
                                                filterFunction={(value, filter) => customFilter(value, filter)}
                                            />
                                             <Column
                                                field="thaaliuser"
                                                header="Thaali User"
                                                body={(rowData) => (
                                                    <div className="text-center">{rowData.thaaliuser}</div>
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
            <AddUser/>
        </>
    );
}
export default User;