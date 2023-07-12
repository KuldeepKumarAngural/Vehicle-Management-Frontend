import React, { useEffect, useState } from 'react'
import { getCurrentUser, isLogedin } from '../Authanticate/Authenticate-Service';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    }
    from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import { SaveVehicle } from '../Service/AuthService';
import { Navigate, useNavigate } from 'react-router-dom';

export const AddVehicle = () => {
  const [user,setUser]=useState([])
    
  useEffect(()=>{
  
    setLogin(isLogedin())
    setUser(getCurrentUser().firstname)
    console.log(getCurrentUser());
    
  },[])
    const [vehicle,setvehicle]=useState({
  name:"",
  model:"",
  year:"",
  type:"",
  chassinumber:"",
  registrationnumber:"",
  description:"",
  createdby:getCurrentUser().firstname,
  driverid:"",

    });

    const handleChange = (event, props) => {
        let actualValue = event.target.value;
        setvehicle({ ...vehicle, [props]: actualValue });
        console.log(getCurrentUser().firstname);
       
    };

    const [login,setLogin]=useState(false)
   
  const   handelReset=()=>{
     setvehicle({
      name:"",
      model:"",
      year:"",
      type:"",
      chassinumber:"",
      registrationnumber:"",
      description:"",
      createdby:getCurrentUser().firstname,
      driverid:"",
     });
        }
   
        const navigate=useNavigate();
    // console.log(user);
   const submitDetails=(event)=>{
    event.preventDefault();

    
   
    console.log(vehicle);
    SaveVehicle(vehicle).then((resp)=>{

      toast.success(`vehicle Added  Successfully`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
      }
      );
      // navigate(-1);
      
    }).catch((error)=>{
      toast.warning(`Driver Not Exit With Driver id`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // handelReset();

    })
   }
   









  return (
    <>
    
    <form onSubmit={submitDetails}>
        <MDBContainer fluid>

      <MDBRow className='justify-content-center align-items-center mx-5 mt-2'>

        <MDBCard>
          <MDBCardBody className='px-4'>

            <h3 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-5">Add Vehicle</h3>
            
            <MDBRow>
       
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-2' label='Vehicle Name' size='lg' id='form1' type='text'
                 onChange={(e) => handleChange(e, "name")}
                  value={vehicle.name}
                 />
              </MDBCol>

              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-3' label='Vehicle Model' size='lg' id='form2' type='number'
                  onChange={(e) => handleChange(e, "model")}
                  value={vehicle.model}
                />
              </MDBCol>

            </MDBRow>

            <MDBRow>

              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-3' label='vehicle Type' size='lg' id='form3' type='text'
                onChange={(e) => handleChange(e, "type")}
                 value={vehicle.type}
                />
              </MDBCol>

              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-3' label='Chassi Number' size='lg' id='form5' type='number'
                onChange={(e) => handleChange(e, "chassinumber")}
                value={vehicle.chassinumber}
                />
              </MDBCol>

             
              

            </MDBRow>

            <MDBRow>
            <MDBCol md='6'>
                <MDBInput wrapperClass='mb-3' label='Year' size='lg' id='form5' type='number'
                onChange={(e) => handleChange(e, "year")}
                value={vehicle.year}
                />
              </MDBCol>

              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-3' label='Registration number' size='lg' id='form6' type='number'
                  onChange={(e) => handleChange(e, "registrationnumber")}
                   value={vehicle.registrationnumber}
                />
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-3' label='Driver  id' size='lg' id='form6' type='number'
                  onChange={(e) => handleChange(e, "driverid")}
                   value={vehicle.driverid}
                />
              </MDBCol>



              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-3' label='Vehicle Description' size='lg' id='form7' type='text'
                onChange={(e) => handleChange(e, "description")}
                 value={vehicle.description}
                />
              </MDBCol>

              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-3' label='Created By' readOnly size='lg' id='form7' type='text'
                onChange={(e) => handleChange(e, "createdby")} 
                 value={user}
                 />
              </MDBCol>

            

            </MDBRow>

            
            <button className='mb-3 btn btn-primary col-md-3' size='lg'>Submit</button>
            

          </MDBCardBody>
          
        </MDBCard>

      </MDBRow>
      <ToastContainer/>
      
    </MDBContainer>
    </form>
    </>
  )
}
