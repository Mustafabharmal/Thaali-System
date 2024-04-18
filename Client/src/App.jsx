import { useState } from "react";
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
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import Protected from './components/Protected';
// import Menu from "./components/Menu/Menus";
function App() {
    // const location = useLocation();
    // const location = useLocation();
    // // Check if the current route is '/Login', if yes, do not render Sidebar
    // const showSidebar = location.pathname !== '/Login';
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    return (
        <>
            <BrowserRouter>
                <div className="page">
                  {/* <Sidebar /> */}
                  {/* {window.location.pathname.toLowerCase() !== '/login' && <Sidebar />} */}
                  {isLoggedIn && <Sidebar />}
                {/* {location.pathname !== '/Login' && <Sidebar />} */}
                    <Routes>
                        <Route path="/Login" element={<Login />} />
                        <Route
                        path="/"
                        element={
                            <Protected isLoggedIn={isLoggedIn}>
                           <Dashboard />
                            </Protected>
                        }
                        />
                        {/* <Route exact path="/" element={ /> */}
                        <Route path="/user" element={
                            <Protected isLoggedIn={isLoggedIn}>
                           <User />
                            </Protected>
                        } />
                        <Route path="/community" element={<Protected isLoggedIn={isLoggedIn}>
                           <Community />
                            </Protected>} />
                        {/* <Route path="/unit" element={<Unit />} /> */}
                        <Route path="/variety" element={<Protected isLoggedIn={isLoggedIn}>
                           <Variety />
                            </Protected> } />
                        <Route path="/menus" element={<Protected isLoggedIn={isLoggedIn}>
                           <Menus />
                            </Protected> } />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
