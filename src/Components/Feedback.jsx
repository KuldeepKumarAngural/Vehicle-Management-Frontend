import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
  } from "mdb-react-ui-kit";
import { ToastContainer, toast } from 'react-toastify';
import { sendFeedback } from '../Service/AuthService';

export const Feedback = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        message:"",
       
        
      });
    
      const handleChange = (event, props) => {
        let actualValue = event.target.value;
        setData({ ...data, [props]: actualValue });
       
      };
      const onSubmitFeedback=(event)=>{
        event.preventDefault();
        console.log(data);
        sendFeedback(data).then((resp)=>{
            toast.success(` Thanks for Your Feedback  Our team will Contact You ASAP`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });

        }).catch((error)=>{
            toast.warn(` SomeThing Went Wrong`, {
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
      }
  return (
    <div>
         <Helmet>
        <title>{`Feedback`}</title>
      </Helmet>
      <form onSubmit={onSubmitFeedback}>
        <MDBContainer fluid>
          <MDBRow className="justify-content-center align-items-center mx-5 mt-2">
            <MDBCard>
              <MDBCardBody className="px-4">
                <h4 className="fw-bold mb-2 pb-2 pb-md-0 mb-md-5">Your Feedback Is Important for Us  <br /> Please share your issues or suggestions</h4>

                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput
                      wrapperClass="mb-2"
                      label="Name"
                      size="lg"
                      id="form1"
                      type="text"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                    />
                  </MDBCol>

                  
               

               

                 
            

              
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
                  <MDBCol md="12">
                    <MDBTextArea
                      wrapperClass="mb-3"
                      label="message"
                      size="lg"
                      id="form5"
                      type="rel"
                      onChange={(e) => handleChange(e, "message")}
                      value={data.message}
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
    </div>
    

  )
}
