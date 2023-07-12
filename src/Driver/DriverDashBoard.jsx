import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { getCurrentUser } from '../Authanticate/Authenticate-Service';
import { GetVehicleByDriverId } from '../Service/AuthService';

export const DriverDashBoard = () => {
const [vehicleData,setVehicleData]=useState([]);
const user=getCurrentUser();


useEffect(()=>{
  init();
},[])
const init=()=>{
  GetVehicleByDriverId(user.id).then((resp)=>{
    setVehicleData(resp)
    // console.log(resp);
  }).catch((error)=>{
    console.log(error);
  })
}
  console.log(vehicleData);

  return (
    <>
     <Helmet>
        <title>{`Driver Home`}</title>
      </Helmet>
      <div className="container  mt-2">
        <div className="card">
          <div className="card-body">
          <table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">name</th>
      <th scope="col">model</th>
      <th scope="col">Assigned Date-Time</th>
      <th scope="col">Assigned By</th>
    </tr>
  </thead>
  <tbody>
   {
    vehicleData.map((vehicle)=>(
      <tr>
      <td>{vehicle.id}</td>
      <td>{vehicle.name}</td>
      <td>{vehicle.model}</td>
      <td>{vehicle.assignedDate}</td>
       <td>{vehicle.assignedBy}</td>
    
      </tr>
    ))
   }
  </tbody>
</table>
          </div>
        </div>

        
      </div>
     

  
    </>
    
  )
}
