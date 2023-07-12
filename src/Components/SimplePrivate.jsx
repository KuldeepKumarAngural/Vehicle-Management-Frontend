import React from 'react'
import { getCurrentUserRole, isLogedin } from '../Authanticate/Authenticate-Service'
import { Navigate, Outlet } from 'react-router-dom'

export const SimplePrivate = () => {

    //  const role=getCurrentUserRole();

    if(isLogedin())
    {
     
        return <Outlet/>
        
      }
      else{
          return <Navigate to={"/login"}/>
      }
      
      
}
