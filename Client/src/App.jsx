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
function App() {
    // const location = useLocation();
    // const location = useLocation();
    // // Check if the current route is '/Login', if yes, do not render Sidebar
    // const showSidebar = location.pathname !== '/Login';
    return (
        <>
            <BrowserRouter>
                <div className="page">
                  {/* <Sidebar /> */}
                  {window.location.pathname.toLowerCase() !== '/login' && <Sidebar />}
                {/* {location.pathname !== '/Login' && <Sidebar />} */}
                    <Routes>
                        <Route path="/Login" element={<Login />} />
                       
                        <Route exact path="/" element={<Dashboard />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/unit" element={<Unit />} />
                        <Route path="/variety" element={<Variety/> } />
                        <Route path="/menus" element={<Menus/> } />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
