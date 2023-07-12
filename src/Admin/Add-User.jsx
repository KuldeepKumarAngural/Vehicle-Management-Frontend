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
import {
  RegisterUser,
  RegisterUserWithImage,
  UploadImage,
  uploadPostImage,
} from "../Service/AuthService";
import {
  getCurrentUser,
  getCurrentUserRole,
  isLogedin,
} from "../Authanticate/Authenticate-Service";

import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export const AddUser = () => {
  const [image,setImage]=useState({});
  
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    dob: "",
    image:null,
    
  });

  // Set Input Field Data Into Object
  const handleChange = (event, props) => {
    let actualValue = event.target.value;
    setData({ ...data, [props]: actualValue });
  };

  const handleChangeFileChange = (event) => {
    let imageData = new FormData();
    let file = event.target.files[0];
     imageData.append("image", file);
    
     setData({ ...data, image: file });
     setImage(imageData);
     
  };

   console.log(data);
  const navigate = useNavigate();

  const [login, setLogin] = useState(false);
  const user = getCurrentUserRole();

  useEffect(() => {
    setLogin(isLogedin());
  }, [login]);

  const submitDetails = (event) => {
    event.preventDefault();
    console.log(data);
    if (
      data.email == "" ||
      data.email.trim() == "" ||
      data.password == "" ||
      data.password.trim() == "" ||
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
    } else if (data.role === user || data.role == "ADMIN") {
      toast.warn(
        `Sorry you don't have permissions to add ${data.role} if you want please contacts to developer `,
        {
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
      handelReset();
      return;
    }
    RegisterUserWithImage(data)
      .then((resp) => {

        toast.success(`User Added Successfully with ${data.role} Role`, {
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

    <navigate to="-1" />;
  };

  const handelReset = () => {
    setData({
      role: "",
    });
  };
  return (
    <>
      <Helmet>
        <title>{`Add user`}</title>
      </Helmet>
      <form onSubmit={submitDetails}>
        <MDBContainer fluid>
          <MDBRow className="justify-content-center align-items-center mx-5 mt-2">
            <MDBCard>
              <MDBCardBody className="px-4">
                <h3 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-5">Add User</h3>

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
                      onChange={(e) => handleChange(e, "lastname")}
                      value={data.lastname}
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
                    />
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-3"
                      label="Password"
                      size="lg"
                      id="form7"
                      type="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                    />
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-3"
                      accept="image/*"
                      label="image"
                      size="lg"
                      id="form8"
                      type="file"
                      onChange={handleChangeFileChange}
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
