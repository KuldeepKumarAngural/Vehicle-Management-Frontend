import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import { Signin } from "../Service/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { doLogin, isLogedin } from "./Authenticate-Service";

export const LoginUser = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event, props) => {
    let actualValue = event.target.value;
    setData({ ...data, [props]: actualValue });
  };

  const submitDetails = (event) => {
    event.preventDefault();

    if (
      data.email == "" ||
      data.email.trim() == "" ||
      data.password == "" ||
      data.password.trim() == ""
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
    }

    Signin(data)
      .then((resp) => {
        console.log(resp.userDto);

       
        if (isLogedin) 
        {
          if (resp.userDto.role == "ADMIN") {
            doLogin(resp, () => {
              navigate("/admin/admin-dashboard");
             
            });
          }  else if (resp.userDto.role == "MANAGER") {
            doLogin(resp, () => {
              navigate("/manager/manager-dashboard");
             
            });
          }  else if (resp.userDto.role == "DRIVER") {
            doLogin(resp, () => {
              navigate("/driver/driver-dashboard");
              
            });
          } else {
            toast.warn(`Invalid Credentials`, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        }
        else{
          toast.warn(`Invalid Credentials`, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((error) => {
        toast.warn(`Invalid Credentials`, {
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

  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <h1 className="mx-5 ">Wellcome</h1>
            <span className="mx-5"> Vehicle Management System</span>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            <form onSubmit={submitDetails}>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="email"
                type="email"
                onChange={(e) => handleChange(e, "email")}
                value={data.email}
                size="lg"
              />

              <MDBInput
                wrapperClass="mb-5"
                label="Password"
                id="password"
                type="password"
                onChange={(e) => handleChange(e, "password")}
                value={data.password}
                size="lg"
              />

              <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
                <Link to="/forgotPassword">forgot password</Link>
              </div>

              <div className="text-center text-md-start mt-4 pt-2">
                <button className="mb-0 px-5 btn btn-primary" size="lg">
                  Login
                </button>
              </div>
            </form>
          </MDBCol>
          <ToastContainer />
        </MDBRow>
      </MDBContainer>
    </>
  );
};
