import React from 'react'
import { getCurrentUserRole } from '../Authanticate/Authenticate-Service';
import { AdminDashBoard } from '../Admin/AdminDashBoard';
import { ManagerDashBoard } from '../Manager/ManagerDashBoard';
import { DriverDashBoard } from '../Driver/DriverDashBoard';
import { DiverDashBoard2 } from '../Driver/DiverDashBoard2';

export const AllDashBoards = () => {
    const token=JSON.parse(localStorage.getItem("data"));
    const role=getCurrentUserRole();
    const getPage=()=>{
      if(role=="ADMIN"){
        
       return < AdminDashBoard></AdminDashBoard>
       }
       else if(role=="MANAGER"){
        return <ManagerDashBoard/>
       }
       else {
        return <DiverDashBoard2/>
       }
    }
   
  return (
    <div>
        {
           
          getPage()  

        }
    </div>
  )
}
