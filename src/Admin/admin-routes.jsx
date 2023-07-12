import React from 'react'
import { getCurrentUserRole, isLogedin } from '../Authanticate/Authenticate-Service'
import { Navigate, Outlet } from 'react-router-dom'

export const AdminPrivate = () => {

     const role=getCurrentUserRole();

    if(isLogedin() && role=="ADMIN")
    {
     
        return <Outlet/>
        
      }
      else{
          return <Navigate to={"/"}/>
      }
      
      
}
