import React, { useState, useEffect, useRef, useContext } from "react";
import logo from "../../assets/static/logo.svg";
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

function ForgetPassword(){
    const [email, setEmail] = useState("");
    const handleChange = (e) => {
        setEmail(e.target.value);
        // setFormData({
        //     ...formData,
        //     [e.target.name]: e.target.value
        // });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log("Form Submitted");
        try {
            const response = await fetch("http://localhost:3000/auth/forgetPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ email: email }),

            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                alert("Email sent with new password");
                window.location.href = "/";
            } else if (response.status === 404) {
                console.log("User not found");
                alert("User not found");
            } else {
                console.log("Error occurred");
                alert("Error occurred");
            }
        } catch (error) {
            console.log("Error occurred");
            console.log(error);
            alert("Error occurred");
        }
    }
    return (
        <>
         <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
          <img src={logo} width="220"
                            height="70" alt="Thaali System" />
          </a>
        </div>
        <form className="card card-md" method="post" onSubmit={handleSubmit} >
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Forgot password</h2>
            <p className="text-secondary mb-4">Enter your email address and your password will be reset and emailed to you.</p>
            <div className="mb-3">
              <label className="form-label required">Email address</label>
              <input type="email" name="email" onChange={handleChange} value={email}  className="form-control" placeholder="Enter email" required/>
            </div>
            <div className="form-footer">
              {/* <a href="#" className="btn btn-primary w-100"> */}
              <button type="submit" className="btn btn-primary w-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                Send me new password
                </button>
              {/* </a> */}
            </div>
          </div>
        </form>
        <div className="text-center text-secondary mt-3">
          Forget it, <a href="/login">send me back</a> to the sign in screen.
        </div>
      </div>
    </div>
        </>
    )
}
export default ForgetPassword