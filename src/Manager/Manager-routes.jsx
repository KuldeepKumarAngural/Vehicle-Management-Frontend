import React from 'react'
import { getCurrentUserRole, isLogedin } from '../Authanticate/Authenticate-Service'
import { Navigate, Outlet } from 'react-router-dom'

export const ManagerPrivate = () => {
    if(isLogedin())
    {
        const role=getCurrentUserRole();
        if(role=='MANAGER'){
     
        return <Outlet/>
    } 
        
      }
      else{
          return <Navigate to={"/"}/>
      }
      
      
}
