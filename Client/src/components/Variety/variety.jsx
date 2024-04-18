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
import axios from 'axios';
import AddVeriety from "./addVeriety";
import EditVarity from "./EditVarity";
import AuthContext from '../../store/auth-context';
function Variety() {
    const authCtx = useContext(AuthContext);
    const isAdmin = authCtx.role === 0|| authCtx.role === "0";
    const isManager = authCtx.role === 1|| authCtx.role === "1";
    const isUser = authCtx.role === 2|| authCtx.role === "2";
    const toast = React.createRef();
    const [loading, setLoading] = useState(false);
    const [dataTableValues, setDataTableValues] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    // const [ComValues, setComValues] = useState([]);
    const [formData, setFormData] = useState({
        _id: "",
        name: "",
        calories: 1,
        description: "",
        gujaratiName: "",
        communityid: isManager ? authCtx.communityid : "0",
        status: 1,
        createdat: Date.now(),
        updatedat: Date.now(),
    });
    const [ComValues, setComValues] = useState([]);

    useEffect(() => {
        isAdmin &&(
        fetchComData());
        const input = document.getElementById('data1');
        enableTransliteration1(input, 'gu');
        // console.log(input)
        return () => {
            // Clean up the transliteration when the component unmounts
            //   input.transliterator.disable();
            // disableTransliteration(input); 
            const input = document.getElementById('data1');
            // if (input) {
            disableTransliteration1(input);
            // }
        };
    }, []);
    const handleKeyUp = (e) => {

        setFormData((prevData) => ({
            ...prevData,
            gujaratiName: e.target.value,
        }));
        console.log(formData.gujaratiName);
    };

    const fetchComData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/community', {
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                },
            
                withCredentials: true,
            });

            const transformedData = response.data.map(item => ({
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
            console.error('Error fetching data:', error);
        }
    };
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
                    console.log(rowData)
                    setFormData(rowData)
                    document.getElementById('data1').value = rowData.gujaratiName;
                }}
                data-bs-toggle="modal"
                data-bs-target="#modal-edit"
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
        // <div className="table-header">
        //     {/* <h5 className="p-m-0">Manage Users</h5> */}
        //     <span className="p-input-icon-left">
        //         <i className="pi pi-search" />
        //         <InputText
        //             type="search"
        //             onInput={(e) => setGlobalFilter(e.target.value)}
        //             placeholder="    Search Variety"
        //         />
        //     </span>
        // </div>
        <div className="table-header">
            <div className="input-group" style={{ maxWidth: "300px" }}>
                <span className="input-group-text">
                    <i className="pi pi-search" />
                </span>
                <input
                    type="search"
                    className="form-control shadow-none"
                    placeholder="Search Variety"
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </div>
        </div>


    );
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/variety/update/${formData._id}`, {
                method: "PUT",
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    updatedat: Date.now(),
                    gujaratiName: document.getElementById('data1').value,
                }),
            });
            if (response.ok) {
                console.log("Variety updated successfully");
                window.location.reload();
            } else {
                console.error("Failed to update Variety");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const deleteRow = async (rowData) => {
        console.log('Delete row:', rowData);
        setFormData(rowData);
        $('#modal-small').modal('show');

    };
    const handleConfirmDelete = async () => {
        $('#modal-small').modal('hide');

        try {

            const response = await fetch(`http://localhost:3000/variety/delete/${formData._id}`, {
                method: "PUT",
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: 0,
                }),
            });
            if (response.ok) {
                console.log("Variety deleted successfully");
                window.location.reload();
            } else {
                console.error("Failed to delete Variety");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
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
                gujaratiName: document.getElementById('data1').value,
            };
        });
        console.log(formData)
    };
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/variety', {
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
                    status: item.status,
                    createdat: item.createdat,
                    updatedat: item.updatedat,
                    calories: item.calories,
                    description: item.description,
                    gujaratiName: item.gujaratiName,
                    communityid: item.communityid,
                    // status: 1,
                    // createdat: Date.now(),
                    // updatedat: Date.now(),

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
    return (
        <>
            <div className="page-wrapper">
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <div className="page-pretitle">Overview</div>
                                <h2 className="page-title">Variety</h2>
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
                                        Create new Variety
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
                                                            header="Variety Name"
                                                            body={(rowData) => (
                                                                <div className="text-center">{rowData.name}</div>
                                                            )}
                                                            style={{ textAlign: "center", width: "8em" }}
                                                            sortable
                                                            filter
                                                            filterMatchMode="custom"
                                                            filterFunction={(value, filter) => customFilter(value, filter)}
                                                            headerStyle={{ textAlign: "center" }} // Center-align the header
                                                        />
                                                        {isAdmin&&(
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
                                                        />
                                                        <Column
                                                            field="location"
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
                                                            field="location"
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
            <AddVeriety />
            {/* <NewCommunity/>*/}
            <EditVarity formData={formData} handleChange={handleChange} handleUpdate={handleUpdate} handleKeyUp={handleKeyUp} ComValues={ComValues} />
            {/* <EditUser /> */}
            <div className="modal modal-blur fade" id="modal-small" tabIndex="-2" role="dialog" aria-hidden="true">
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
            </div>
        </>
    )
}
export default Variety