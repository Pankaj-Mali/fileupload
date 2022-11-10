import React from 'react'
import { GoogleLogout } from "react-google-login"
import {  useNavigate } from "react-router-dom"

const Header=()=> {
  let nav = useNavigate()

  const google = localStorage.getItem("google")
  const user = localStorage.getItem("user")
  const handlelogout = ()=>{
    localStorage.clear()
    nav("/")
  }
  return (
    <div className='mainholder'>
        <div className='header'>
            <span className='user'>{user}</span>
            {
                (user) ?                
                  (google)? 
                  <GoogleLogout
                  clientId="554973468213-tnvbdv59a0ut3h4itk7qs90b73dubjju.apps.googleusercontent.com"
                  buttonText='LOGOUT'
                  onLogoutSuccess={handlelogout}
                
                  className="logout loggoogle"
                  />
                   : <button className='logout' onClick={handlelogout}>LOGOUT</button>                
                :null  
            }
        </div>
    </div>
  )
}

export default Header




