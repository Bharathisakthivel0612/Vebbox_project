import React from 'react'
import  { Routes,Route }  from "react-router-dom"
import { Getstarted } from '../starter/getstarted'
import { Login } from '../starter/login'
import { Forgetpass } from '../starter/forgetpass'
import { Resetpass } from '../starter/resetpass'
import { Shortlist } from './shortlist'
import { StudentDashboard } from './dfirst'  

export const RouterC = () => {
  return (
    <div>
        <Routes>
            {/* <Route path='/' element={<Getstarted/>}/> */}
            <Route path='/' element={<Login/>}/>
            <Route path='/forgetpass' element={<Forgetpass/>}/>
            <Route path='/resetpass' element={<Resetpass/>}/> 
             <Route path="/main" element={<StudentDashboard/>}/>
             <Route path="/shortlist" element={<Shortlist />} />
             
             
           
           
            
        </Routes>
    </div>
  )
}
export default RouterC;