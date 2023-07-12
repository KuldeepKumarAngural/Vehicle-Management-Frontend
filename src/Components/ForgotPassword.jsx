import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { SendEmail } from "../Service/AuthService";
import { ToastContainer, toast } from "react-toastify";

export const ForgotPassword = () => {

   const [data,setEmail]=useState({

    to:"",
   });
    const handelChange=(event,props)=>{
        let actualValue = event.target.value;
        setEmail({ ...data, [props]: actualValue });
        
       }
     const handelReset=()=>{
       setEmail({
            to:"",
       });
     } 
       console.log(data);
    const submitDetails=(event)=>{
        event.preventDefault();
        SendEmail(data).then((resp)=>{
            console.log(resp);
            toast.success(` Password Reset Email Sent Successfully `, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              handelReset();
        })
        .catch((error)=>{
            console.log(error);
            toast.success(` Email Not Registered or not Bind With Google `, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              handelReset();
        })
    }

  return (
    <div>
      <div className="container col-md-3 mt-5 ">
        <div className="row">
          <form onSubmit={submitDetails}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => handelChange(e, "to")}
                value={data.to}
              />
            </div>
            <div className="text-center">
              <button className="btn btn-primary col-md-6 mt-3">Forgot</button>
            </div>
            <ToastContainer/>
          </form>
        </div>
      </div>
    </div>
  );
};
