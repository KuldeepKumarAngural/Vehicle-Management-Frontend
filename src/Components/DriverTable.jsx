import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { DeleteuserDetails, getCurrentUrl, getDrivers } from "../Service/AuthService";
import { myAxios } from "../Service/Helper";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { toBeRequired } from "@testing-library/jest-dom/matchers";

export const DriverTable = () => {
  const [search, setSearch] = useState("");
  const [driver, setDriver] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const[driverLeangth,setDriverLeangth]=useState("");
  const navigate=useNavigate();
   
  const getAllDriver = async()=>{
    try {
      const response=await myAxios.get('http://localhost:1081/api/v1/auth/allDrivers')
      setDriver(response.data);
      setDriverLeangth(driver.length);
      setFilteredData(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  };
 const name='tanvi.png';
const [image,setImage]=useState([]);
const getImage=()=>{
  const response=myAxios.get('http://localhost:1081/api/v1/auth/image/'+name);
}
 
  const deleteUser=(params)=>{
    DeleteuserDetails(params).then((resp)=>{
      toast.success(`Deleted Successfullt`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      getAllDriver();

    }).catch((error)=>{
      
    })
      
  }
  

  const columns=[
    {
      name:"User-Id",
      selector: row=> row.id,
      sortable:true,


    },
    {
      name:"First-Name",
      selector: row=> row.firstname,
      sortable:true,


    },
    {
      name:"Last-Name",
      selector: row=> row.lastName,
      sortable:true,


    },
    {
      name:"Email",
      selector: row=> row.email,
      sortable:true,


    },
    {
      name:"Role",
      selector: row=> row.role,


    },
    
    {
      name:"Image",
      selector: row=> <img src={"http://localhost:1081/api/v1/auth/image/"+row.imageName}  height={100} width={100} className="mt-2 mb-2"></img>


    },
    {
      name:"DOB",
      selector: row=> row.dob,
      sortable:true,


    },
    {
      name:"Edit",
      cell: row=>  <Link to={'/editprofile/'+row.id} className="btn btn-sm btn-primary  mt-2"> &nbsp;Edit&nbsp;</Link>
                       


    },
    {
      name:"Delete",
      cell: row=> <button className="btn btn-danger btn-sm" onClick={()=>deleteUser(row.id)}>Delete</button>,
      


    },
    


  ]

  useEffect(()=>{
   getAllDriver();
    
  },[])

  useEffect(()=>{
    setUrl(getCurrentUrl());
    const result=driver.filter(drivers=>{
       return drivers.firstname.toLowerCase().match(search.toLowerCase())
    });
    setFilteredData(result);
  },[search])
  const [url,setUrl]=useState("");


  
  

  return (
    <div>
     
     <DataTable 
     title="Drivers Data"
    
     
    //  actions={<Link to={`${url}/add-user`}>
    //  <button className="btn btn-warning">Add</button>
    //  <ToastContainer/>
    // </Link>
    
    // } 
     selectableRows 
     selectableRowsHighlight 
     highlightOnHover 
     fixedHeader
     fixedHeaderScrollHeight="290px"
     columns={columns} 
     data={filteredData} 
     pagination
     subHeader
     subHeaderComponent={
      <input className="form-control w-25" value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="search here" />
     }
     
     
     />
     <div className="text-center">
     <h1{
        ...driverLeangth
      }></h1>
     </div>
    </div>
  );
};
