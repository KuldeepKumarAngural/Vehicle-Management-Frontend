import { myAxios } from "./Helper";

//Signin Api
export const Signin = (props) => {
  return myAxios.post("/login", props).then((resp) => resp.data);
};

//Register Api
export const RegisterUser = (registerDetails) => {
  return myAxios.post("/register", registerDetails).then((resp) => resp.data);
};

//Register With Image Api Demo Purpose /  
// export const RegisterUserWithImage = (data) => {
 

//   return myAxios
//     .post("/registerWithImage", data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((resp) => resp.data)
//     .catch((error) => error);
// };
export const RegisterUserWithImage = (data) => {
 

  return myAxios
    .post("/Register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp) => resp.data)
    .catch((error) => error);
};

//Save Vehicle Api
export const SaveVehicle = (vehicledetails) => {
  return myAxios.post("/add-vehicle", vehicledetails).then((resp) => resp.data);
};

//Vehicle count Api
export const GetVehicleCount = () => {
  return myAxios
    .get("/vehicleCount")
    .then((resp) => resp.data)
    .catch((error) => error.data);
};
//Manager count Api
export const getManagerCount = () => {
  return myAxios.get("/managerCount").then((resp) => resp.data);
};
//Driver count Api
export const getDriverCount = () => {
  return myAxios.get("/driverCount").then((resp) => resp.data);
};
//Get User By Email Api
export const getUserByEmail = (params) => {
  return myAxios
    .get("/" + params)
    .then((resp) => resp.data)
    .catch((error) => error);
};
//Edit Profile   Api
export const Edituser = (user) => {
  return myAxios
    .put("/update/" + user.email, user)
    .then((resp) => resp.data)
    .catch((error) => error);
};
//Email Send Api
export const SendEmail = (email) => {
  return myAxios.post("/send-email", email).then((resp) => resp.data);
};
//Password Update Api
export const updatePassword = (data) => {
  return myAxios.post("/updatePassword", data).then((resp) => resp.data);
};
//Logout Api
// export const LogoutHandler = () => {
//   return myAxios.get("/logout");
// };
//Get Driver Api
export const getDrivers = () => {
  return myAxios
    .get("/allDrivers")
    .then((resp) => resp.data)
    .catch((error) => error);
};
//Find User By ID Api
export const findUserById = (id) => {
  return myAxios
    .get("/getUser/" + id)
    .then((resp) => resp.data)
    .catch((error) => error);
};
//Upadate User Api for
export const EdituserDetails = (user) => {
  return myAxios
    .post("/updateuser/" + user.id, user)
    .then((resp) => resp.data)
    .catch((error) => error);
};
//Delete User Api
export const DeleteuserDetails = (id) => {
  return myAxios
    .delete("/delete/" + id)
    .then((resp) => resp.data)
    .catch((error) => error);
};
//Vehicle Delete Api
export const DeleteVehicleByID = (id) => {
  return myAxios
    .delete("/deleteVehicle/" + id)
    .then((resp) => resp.data)
    .catch((error) => error);
};
//Get Vehicle By Driver ID
export const GetVehicleByDriverId = (id) => {
  return myAxios
    .get("/getVehicleByDriverId/" + id)
    .then((resp) => resp.data)
    .catch((error) => error);
};
//Save Feedback 
export const sendFeedback=(data)=>{
  return myAxios.post("/sendFeedback",data).then((resp)=>{

  }).catch((error)=>error);
}
//FeedbackCount
export const feedbackCount=()=>{
  return myAxios.get("/countFeedback").then((resp)=>resp.data).catch((error)=>error)
}
//All feedback
export const allFeedback=(pageNumber,pageSize)=>{
  return myAxios.get(`/feedbacks?&pageNumber=${pageNumber}&pageSize=${pageSize}`).then((resp)=>resp.data).catch((error)=>error)
}
//Search by Name
export const getFeedbackByname=(data)=>{
  return myAxios.get("/feedbacks/"+data).then((resp)=>resp.data).catch((error)=>error);
}
//Get current url
export const getCurrentUrl=()=>{
  return window.location.href;
}

