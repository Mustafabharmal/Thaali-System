import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./components/dashboard";
import User from "./components/User/user";
import Community from "./components/Community/community";
import Unit from "./components/Units/units";
import Variety from "./components/Variety/variety";
function App() {
    return (
        <>
            <BrowserRouter>
                <div className="page">
                    <Sidebar />
                    <Routes>
                        <Route exact path="/" element={<Dashboard />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/unit" element={<Unit />} />
                        <Route path="/variety" element={<Variety/> } />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
