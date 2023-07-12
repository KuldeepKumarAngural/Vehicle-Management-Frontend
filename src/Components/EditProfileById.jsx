import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import { Edituser, EdituserDetails, GetUserById, RegisterUser, deleteDriver, findUserById, getUserByEmail } from "../Service/AuthService";
import {
  getCurrentUser,
  getCurrentUserEmail,
  getCurrentUserRole,
  isLogedin,
} from "../Authanticate/Authenticate-Service";

import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

export const EditProfileById = () => {
  const [data, setData] = useState({
    id:"",
    firstname: "",
    lastName: "",
    email: "",
    role:"",
    dob: "",
  });

  const navigate=useNavigate();

  const {id}=useParams();
  
  
  
  useEffect(()=>{
    findUserById(id).then((resp)=>{
        setData(resp);
    })
   
},[]);

  const handleChange = (event, props) => {
    let actualValue = event.target.value;

    setData({ ...data, [props]: actualValue });
  };

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

//   useEffect(() => {
//     setLogin(isLogedin());
//     setUser(getCurrentUserRole());
//   }, [login]);

     console.log(data);

  const submitDetails = (event) => {
    event.preventDefault();

    if (
      data.email == "" ||
      data.email.trim() == "" ||
      
    
      data.role.trim() == " " ||
      data.role == " " ||
      data.firstname == "" ||
      data.firstname.trim() == "" ||
      data.dob == ""
    ) {
      toast.warn(` fields cant't blank or can't contain Spaces`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } 

    EdituserDetails(data)
      .then((resp) => {
        toast.success(`User update Successfully `, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        toast.warn(`Something Went-wrong`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const handelReset = () => {
    setData({
      role: "",
    });
  };
  return (
    <>
      <Helmet>
        <title>{`Edit user`}</title>
      </Helmet>
      <form onSubmit={submitDetails}>
        <MDBContainer fluid>
          <MDBRow className="justify-content-center align-items-center mx-5 mt-2">
            <MDBCard>
              <MDBCardBody className="px-4">
                <h3 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-5">
                  Update Form
                </h3>

                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-2"
                      label="First Name"
                      size="lg"
                      id="form1"
                      type="text"
                      onChange={(e) => handleChange(e, "firstname")}
                      value={data.firstname}
                    />
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-3"
                      label="Last Name"
                      size="lg"
                      id="form2"
                      type="text"
                      onChange={(e) => handleChange(e, "lastName")}
                      value={data.lastName}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-3"
                      label="Birthday"
                      size="lg"
                      id="form3"
                      type="date"
                      onChange={(e) => handleChange(e, "dob")}
                      value={data.dob}
                    />
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-3"
                      label="Role"
                      size="lg"
                      id="form5"
                      type="rel"
                      readOnly
                      onChange={(e) => handleChange(e, "role")}
                      value={data.role}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-3"
                      label="Email"
                      size="lg"
                      id="form6"
                      type="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      readOnly
                    />
                  </MDBCol>

                  
                </MDBRow>

                <button className="mb-3 btn btn-primary col-md-3" size="lg">
                  Submit
                </button>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
          <ToastContainer />
        </MDBContainer>
      </form>
    </>
  );
};
