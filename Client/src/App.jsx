import { useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar'
import Dashboard from './components/dashboard'
import User from './components/user';

function App() {
  

  return (
    <>

     <div className="page"> 
     
      <Sidebar/>
      {/* <Route path='/' > 

      </Route> */}
      {/* <Dashboard/> */}
      <User/>
     </div>
    </>
  )
}

export default App
