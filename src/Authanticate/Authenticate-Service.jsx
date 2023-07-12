import { Navigate, useNavigate } from "react-router-dom";
import { LogoutHandler } from "../Service/AuthService";
import { myAxios } from "../Service/Helper";

//is loggedin=> check LocalStorage contain data or not

export const isLogedin = () => {
  let data = localStorage.getItem("data");
  if (data != null) {

    return true;
  } else {
    return false;
  }
};

//doLogin=>data set to local storage
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data.userDto));
  window.location.reload(true);
  next();
  
};
export const getCurrentUserValidToken=(id)=>{
 return myAxios.get("/getValidToken/"+id).then((resp)=>{

 }).catch((error)=>{

 });

}

//doLogout=>data removed from local Storage
export const doLogout = (next) => {

  // myAxios.get('/logout'+token).then((resp)=>{
    localStorage.removeItem("data");
  <Navigate to={"/login"}/>
  window.location.reload(true);
  // })
  // .catch((error)=>error);
  
 

  next();
};

//getCurrent user
export const getCurrentUser = () => {
  if (isLogedin()) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return undefined;
  }
};

//return count of managers
export const countManagers = () => {
  return JSON.parse(localStorage.getItem("data")).managerCount;
};
//return count of Drivers
export const countDrivers = () => {
  return JSON.parse(localStorage.getItem("data")).driverCount;
};
//return data current userRole
export const getCurrentUserRole = () => {

  return localStorage.getItem("data") && JSON.parse(localStorage.getItem("data")).role;
  

  
};
export const getCurrentUserEmail = () => {
  return JSON.parse(localStorage.getItem("data")).email;
};
export const preventBack=()=>{
  window.history.forward();
  
}



