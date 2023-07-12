import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { updatePassword } from '../Service/AuthService';

export const UpdatePassword = () => {
const {email}=useParams();
console.log(email);
const [data,setData]=useState({
password:"",
confirmpassword:"",
email:email,
});

const navigate=useNavigate();

const handelChange=(event,props)=>{
    let actualValue=event.target.value;
    setData({...data,[props]:actualValue});
    
};

const handelReset=()=>{
    setData({
        password:"",
        confirmpassword:"",

    });
}

console.log(data);
const SubmitDetails=(event)=>{
    event.preventDefault();

if(data.password === data.confirmpassword && data.password!=="" && data.confirmpassword!==""){
    updatePassword(data).then((resp)=>{
        toast.success(` password Update Successfully`, {
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
        
    })
    navigate("/");
}
else if(data.password != data.confirmpassword){
    toast.warn(` password not matched `, {
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
  return (
    <div>

<div className="container col-md-3 mt-5 ">
        <div className="row">
          <form onSubmit={SubmitDetails} >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">New Password </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="New Password"
                onChange={(e) => handelChange(e, "confirmpassword")}
                value={data.confirmpassword}
              
            />
            </div>


            <div className="form-group mt-3">
              <label htmlFor="exampleInputEmail1">Confirm New Password </label>
              <input
                type="Confirm New password"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => handelChange(e, "password")}
                value={data.password}
              
            />
            </div>
            <div className="text-center">
              <button className="btn btn-primary col-md-6 mt-3">Submit</button>
            </div>
            <ToastContainer/>
          </form>
        </div>
      </div>
    </div>
    
  )
}
