import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./components/dashboard";
import User from "./components/User/user";
import Community from "./components/Community/community";
import Unit from "./components/Units/units";
import Variety from "./components/Variety/variety";
import Menus from "./components/Menu/Menus";
import CreateMenu from "./components/Menu/CreateMenu";
import Login from "./components/Auth/Login";
import Footer from "./components/Footer";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Protected from "./components/Protected";
import NotFound from "./components/Auth/404";
import MyProfile from "./components/profile/MyProfile";
import axios from "axios";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Feedback from "./components/Feedback/Feedback";
import Requests from "./components/requests/Requests"
import Complain from "./components/Complain/Complain";
// import Menu from "./components/Menu/Menus";
function App() {
    // const location = useLocation();
    // const location = useLocation();
    // // Check if the current route is '/Login', if yes, do not render Sidebar
    // const showSidebar = location.pathname !== '/Login';
    // const authCtx = useContext(AuthContext);

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const isAdmin = authCtx.role === 0 || authCtx.role === "0";
    const isManager = authCtx.role === 1 || authCtx.role === "1";
    const isUser = authCtx.role === 2 || authCtx.role === "2";

    // const history = useHistory();

    useEffect(() => {
        isLoggedIn && fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/dashboard", {
                withCredentials: true,
                headers: {
                    authorization: `Mustafa ${authCtx.token}`,
                },
            });
        } catch (error) {
            if (
                error.response.status === 403 &&
                error.response.data.error === "Bhai Logging kar"
            ) {
                authCtx.logout();
                window.location.href = "/login";
            } else {
                console.error("Error fetching data:", error);
            }
        }
    };
    if (!authCtx.token) {
        authCtx.isLoggedIn = false;
        authCtx.logout();
    }
    return (
        <>
            <BrowserRouter>
                <div className="page">
                    {/* <Sidebar /> */}
                    {/* {window.location.pathname.toLowerCase() !== '/login' && <Sidebar />} */}
                    {/* {isLoggedIn && <Sidebar />} */}
                    {/* {location.pathname !== '/Login' && <Sidebar />} */}
                    <Routes>
                        <Route
                            path="/Login"
                            element={
                                <Protected isLoggedIn={!isLoggedIn}>
                                    <Login />
                                </Protected>
                            }
                        />
                        <Route
                            path="/ForgetPassword"
                            element={
                                // <Protected isLoggedIn={!isLoggedIn}>
                                // <>
                                // <Sidebar />
                                <ForgetPassword />
                                // </Protected>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <Protected isLoggedIn={isLoggedIn}>
                                    <>
                                        <Sidebar />
                                        <Dashboard />
                                    </>
                                </Protected>
                            }
                        />
                        <Route
                            path="/myProfile"
                            element={
                                <Protected isLoggedIn={isLoggedIn}>
                                    <>
                                        <Sidebar />
                                        <MyProfile />
                                    </>
                                </Protected>
                            }
                        />
                        {/* <Route exact path="/" element={ /> */}
                        {(isAdmin || isManager) && (
                            <Route
                                path="/user"
                                element={
                                    <Protected isLoggedIn={isLoggedIn}>
                                        <>
                                            <Sidebar />
                                            <User />
                                        </>
                                    </Protected>
                                }
                            />
                        )}
                        {isAdmin && (
                            <Route
                                path="/community"
                                element={
                                    <Protected isLoggedIn={isLoggedIn}>
                                        <>
                                            <Sidebar />
                                            <Community />
                                        </>
                                    </Protected>
                                }
                            />
                        )}
                        {/* <Route path="/unit" element={<Unit />} /> */}
                        {(isAdmin || isManager) && (
                            <Route
                                path="/variety"
                                element={
                                    <Protected isLoggedIn={isLoggedIn}>
                                        <>
                                            <Sidebar />
                                            <Variety />
                                        </>
                                    </Protected>
                                }
                            />
                        )}
                        <Route
                            path="/menus"
                            element={
                                <Protected isLoggedIn={isLoggedIn}>
                                    <>
                                        <Sidebar />
                                        <Menus />
                                    </>
                                </Protected>
                            }
                        />
                         <Route
                            path="/Feedback"
                            element={
                                <Protected isLoggedIn={isLoggedIn}>
                                    <>
                                        <Sidebar />
                                        <Feedback />
                                    </>
                                </Protected>
                            }
                        />
                         <Route
                            path="/Requests"
                            element={
                                <Protected isLoggedIn={isLoggedIn}>
                                    <>
                                        <Sidebar />
                                        <Requests />
                                    </>
                                </Protected>
                            }
                        />
                          <Route
                            path="/Complain"
                            element={
                                <Protected isLoggedIn={isLoggedIn}>
                                    <>
                                        <Sidebar />
                                        <Complain />
                                    </>
                                </Protected>
                            }
                        />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
