import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import AuthContext from '../../store/auth-context';
function addVeriety() {
    const authCtx = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: "",
        calories: 1,
        description: "",
        gujaratiName: "",
        communityid: "0",
        status: 1,
        createdat: Date.now(),
        updatedat: Date.now(),
    });
    const [ComValues, setComValues] = useState([]);
    // let input3 = formData.gujaratiName;
    // enableTransliteration(input3, "gu");

    // useEffect(() => {
    //     fetchComData();
    //     enableTransliteration(input3, "gu");
    // }, []);
    useEffect(() => {
        fetchComData();
        const input = document.getElementById('data');
        enableTransliteration(input, 'gu');
        // console.log(input.value)
        return () => {
          // Clean up the transliteration when the component unmounts
        //   input.transliterator.disable();
        disableTransliteration(input); 
        };
      }, []);
    
   
      const handleKeyUp = (e) => {
        
        setFormData((prevData) => ({
            ...prevData,
            gujaratiName: e.target.value,
        }));
        console.log(formData.gujaratiName);
    };
    // const handleKeyUp = (e) => {
    //     const gujaratiName = transliterateToGujarati(e.target.value); // Assuming you have a function to transliterate
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         gujaratiName: gujaratiName,
    //     }));
    //     console.log(gujaratiName);
    // };
    
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
    const handleChange = (e) => {
        // const { name, value } = e.target;
        // setFormData((prevData) => ({
        // ...prevData,
        // [name]: value,
        // }));
        // console.log(document.getElementById('data').value);
        
        const { name, value } = e.target;
        setFormData((prevData) => {
            // Convert strings to integers for specific fields
            const intValue = [
                // "communityid",
                // "thaaliuser",
                // "role",
              
            ].includes(name)
                ? parseInt(value, 10)
                : value;

            // Format date fields
            const formattedValue = name.endsWith("at")
                ? new Date(value).toISOString()
                : intValue;
            console.log(formattedValue);
            return {
                ...prevData,
                gujaratiName: document.getElementById('data').value,
                [name]: formattedValue,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            setFormData((prevData) => ({
                ...prevData,
                gujaratiName: document.getElementById('data').value,
                createdat: new Date().toISOString(),
                updatedat: new Date().toISOString(),
            }));
            // console.log(formData);
            const response = await fetch("http://localhost:3000/variety/add", {
                method: "POST",
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
            });
// console.log(formData)
            if (response.ok) {
                console.log("User created successfully");
                window.location.reload(); 
                // Optionally, you can reset the form or perform any other actions
            } else {
                console.error("Failed to create user");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
   
    return (
        <div
            className="modal modal-blur fade"
            id="modal-report"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
        >
            <form method="post" onSubmit={handleSubmit}>
                <div className="modal-dialog modal-lg" role="document">
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
                            <div className="form-selectgroup-boxes row mb-3">
                                <div className="col-lg-6">
                                    <label className="form-label"> Variety Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            communityid
                                        </label>
                                        <select
                                            className="form-select"
                                            name="communityid"
                                            value={formData.communityid}
                                            onChange={handleChange}
                                        >
                                            <option
                                                value="0"
                                                defaultValue="true"
                                                disabled={true}
                                            >
                                                select One
                                            </option>
                                            {/* <option value="1">Upleta</option>
                                            <option value="2">Rajkot</option>
                                            <option value="3">Jamnagar</option> */}
                                              {ComValues.map(community => (
                                                <option key={community._id} value={community._id}>
                                                    {community.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="mb-3">
                                        <label className="form-label">
                                           Gujarati Name
                                        </label>
                                        <div className="input-group input-group-flat">
                                            <span className="input-group-text">
                                            </span>
                                              <textarea
                                            className="form-control ps-0"
                                            id="data"
                                            name="gujaratiName" 
                                            placeholder="Gujarati Name"
                                            autoComplete="off"
                                            onKeyUp={handleKeyUp}
                                            value={formData.gujaratiName}
                                            onChange={handleChange}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2">
                                    <div className="mb-3">
                                        <label className="form-label">
                                           calories
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="calories"
                                            name="calories"
                                            rows="3"
                                            value={formData.calories}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div>
                                        <label className="form-label">
                                            Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            placeholder="Description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
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
                            <button
                                type="submit"
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
                                Create new Variety
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <script type="text/javascript">
               
	</script>
        </div>
        
    );
}
export default addVeriety;
