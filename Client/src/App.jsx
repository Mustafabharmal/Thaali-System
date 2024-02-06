import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar'
import Dashboard from './components/dashboard'
import User from './components/user';

function App() {
  

  return (
    <>

<BrowserRouter>
  <div className="page">
    <Sidebar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/user" element={<User />} />
    </Routes>
  </div>
</BrowserRouter>
    </>
  )
}

export default App
