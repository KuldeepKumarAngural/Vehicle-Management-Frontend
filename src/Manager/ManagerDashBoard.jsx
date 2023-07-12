import React, { useEffect, useState } from "react";
import {
  countDrivers,
  countManagers,
  currentUsers,
  getCurrentUser,
  getCurrentUserRole,
  isLogedin,
} from "../Authanticate/Authenticate-Service";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBBadge,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { sendData } from "../Components/CustomNavBar";
import { Helmet } from "react-helmet";
import { GetVehicleCount, feedbackCount, getDriverCount, getManagerCount } from "../Service/AuthService";


export const ManagerDashBoard = () => {
  


  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(isLogedin(true));
   
  }, [login]);
  
  const [user, setUser] = useState({});
//Get current user details
  useEffect(() => {
    setLogin(isLogedin());
    setUser(getCurrentUser());
   
  }, [login]);
  

//get list of manager count
const [managerCount,setManagerCount]=useState([]);
useEffect(()=>{
getManagerCount().then((resp)=>{
  
  setManagerCount(resp);
})
 },[]);

const [driverCount,setDriver]=useState([]); 
useEffect(()=>{
  getDriverCount().then((resp)=>{
    setDriver(resp);
  })
},[])
//Get vehicle count
const [vehicleCount,setVehicleCount]=useState([]);
useEffect(()=>{
  GetVehicleCount().then((resp)=>{
    setVehicleCount(resp);
    
  })
})
//Feedback count
const[feedback,setFeedbackCount]=useState([]);
useEffect(()=>{
  feedbackCount().then((resp)=>{
    setFeedbackCount(resp);
    
  })
})


  return (
    <>
      <Helmet>
        <title>{`Manager Home`}</title>
      </Helmet>
      <MDBContainer fluid>
        <MDBRow className="justify-content-center">
       
          <MDBCol md="12 mt-2">
            <section>
              <MDBRow>
                
                <MDBCol md="4" className="mb-2">
                  <MDBCard
                    style={{
                      display: "block",
                      backgroundColor: "#1e81b0",
                    }}
                  >
                    
                    <MDBCardBody>
                      <p className="text-muted mb-1">Total Managers</p>
                      <h2 className="mb-0">{managerCount}</h2>
                    </MDBCardBody>

                    


                  </MDBCard>
                  <Link to="">
                    <button className="btn btn-primary col-md-12 mt-2 ms-0  btn btn-primary disabled ">
                      Add Manager
                    </button>
                  </Link>
                </MDBCol>



                <MDBCol md="4" className="mb-2">
                  <MDBCard
                    style={{
                      display: "block",
                      backgroundColor: "#e28743",
                    }}
                  >
                    <MDBCardBody>
                    <Link className="btn btn-sm  col-md-12 " to="/manager/manager-dashboard/manager/manager-dashboard/Driver/table">
                   
                      <p className="text-muted mb-1">Total Drivers</p>
                      <h2 className="mb-0">{driverCount} </h2>
                      </Link>
                    </MDBCardBody>
                    
                  </MDBCard>
                  <Link to="/manager/manager-dashboard/add/user">
                    <button className="btn btn-primary col-md-12 mt-2 ms-0 btn-disable  ">
                      Add Driver
                    </button>
                  </Link>
                </MDBCol>


                <MDBCol md="4" className="mb-md-0">
                  <MDBCard
                    style={{
                      display: "block",
                      backgroundColor: "pink",
                    }}
                  >
                    
                    <MDBCardBody>
                    <Link className="btn btn-sm  col-md-12 " to="/Vehicle/table">
                   

                      <p className="text-muted mb-1">Total Vehicles</p>
                      <h2 className="mb-0">{vehicleCount}</h2>
                      </Link>
                    </MDBCardBody>
                  </MDBCard>
                  <Link to="/manager/manager-dashboard/add-vehicle">
                    <button className="btn btn-primary col-md-12 mt-2 ms-0  ">
                      Add Vehicle
                    </button>
                  </Link>
                </MDBCol>



              </MDBRow >


              <MDBRow className="mt-2">             
                 <MDBCol md="4" className="mb-md-0 ">
                  <MDBCard
                    style={{
                      display: "block",
                      backgroundColor: "pink",
                    }}
                  >
                    
                    <MDBCardBody>
                    <Link className="btn btn-sm   col-md-12 " to="/manager/manager-dashboard/Feedback/table">
                   

                      <p className="text-muted mb-1">Total Feedback</p>
                      <h2 className="mb-0">{feedback}</h2>
                      </Link>
                    </MDBCardBody>
                  </MDBCard>
                  
                </MDBCol>

                </MDBRow>

               
              
             
            </section>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};
