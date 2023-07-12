import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { LoginUser } from './Authanticate/Login';
import { Route, Routes } from 'react-router-dom';
import { AdminDashBoard } from './Admin/AdminDashBoard';
import { DriverDashBoard } from './Driver/DriverDashBoard';
import { ManagerDashBoard } from './Manager/ManagerDashBoard';
import { CustomNavBar } from './Components/CustomNavBar';
import {AdminPrivate} from './Admin/admin-routes'
import { AddUser } from './Admin/Add-User';
import { ManagerPrivate } from './Manager/Manager-routes';
import { AddVehicle } from './Components/AddVehicle';
import { EditProfile } from './Components/editProfile';
import { ForgotPassword } from './Components/ForgotPassword';
import { UpdatePassword } from './Components/UpdatePassword';
import { VehicleTable } from './Components/vehicleTable';
import { DriverTable } from './Components/DriverTable';
import { ManagerTable } from './Components/ManagerTable';
import { EditProfileById } from './Components/EditProfileById';
import { Feedback } from './Components/Feedback';
import { FeedBackTable } from './Components/FeedBackTable';
import { SimplePrivate } from './Components/SimplePrivate';
import { DiverDashBoard2 } from './Driver/DiverDashBoard2';
import { DriverPrivate } from './Driver/DriverPrivate';
import { getCurrentUserRole, isLogedin } from './Authanticate/Authenticate-Service';
import { getCurrentUrl } from './Service/AuthService';
import { DashBoard, Login } from '@mui/icons-material';
import{AllDashBoards} from'./Components/DashBoard';

import { useEffect, useState } from 'react';

function App() {
  const currentUrl=getCurrentUrl();
  const [login,setLogin]=useState(false);
  const [admin,setAdmin]=useState(false);
  const [manager,setManager]=useState(false);
  const [driver,setDriver]=useState(false);
  const [role,setrole]=useState("");

useEffect(()=>{
  setLogin(isLogedin);
   setrole(getCurrentUserRole());
  if (role==='ADMIN') {
    setAdmin(true);
    
  }
  else if(role==='MANAGER'){
    setManager(true);
  }
  else{
    setDriver(true);
  }
  
  
},[]);

  return (
    <>

   
   <CustomNavBar/>
   
   
    <Routes>

     


     
                
        <Route path='/' Component={ login?AllDashBoards:  LoginUser}>
      
              </Route>
            
      
      
    
        
           <Route path='/login' element={<LoginUser/>}></Route>
      <Route path='/editprofile' element={<EditProfile/>}></Route>
      <Route path='/feedback' element={<Feedback/>}></Route>

      <Route path='login' element={<LoginUser/>}></Route>
      <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
      <Route path='/:email' element={<UpdatePassword/>}></Route>
      <Route path='/Vehicle/table' element={<VehicleTable/>}></Route>
      {/* <Route path='/Driver/table' element={<DriverTable/>}></Route> */}
      <Route path='/Manager/table' element={<ManagerTable/>}></Route>
      <Route path='/add-vehicle' element={<AddVehicle/>}></Route>
   
      <Route path='/editprofile/:id' element={<EditProfileById/>}></Route>
  
      <Route path='/dashboard' Component= {AllDashBoards}></Route>

    //Private Route for Admin only
   
     
     <Route path='/admin' element ={ <AdminPrivate/>}>
    
        <Route path='/admin/admin-dashboard' element={<AdminDashBoard/>}></Route>
      
    <Route path='/admin/admin-dashboard/add/user' element={<AddUser/>}></Route>
    <Route path='/admin/admin-dashboard/add-vehicle' element={<AddVehicle/>}></Route>
    
    <Route path='/admin/admin-dashboard/Driver/table' element={<DriverTable/>}></Route>
    <Route path='/admin/admin-dashboard/Vehicle/table' element={<VehicleTable/>}></Route>
    <Route path='/admin/admin-dashboard/Manager/table' element={<ManagerTable/>}></Route>
    <Route path='/admin/admin-dashboard/Feedback/table' element={<FeedBackTable/>}></Route>
    </Route>
       
   

    //Private Route for manager
    
   <Route path='/manager' element={<ManagerPrivate/>}>
    <Route path='/manager/manager-dashboard' element={<ManagerDashBoard/>}></Route>
    <Route path='/manager/manager-dashboard/add/user' element={<AddUser/>}></Route>
    <Route path='/manager/manager-dashboard/add-vehicle' element={<AddVehicle/>}></Route>
     <Route path='/manager/manager-dashboard/manager/manager-dashboard/Driver/table' element={<DriverTable/>}></Route>
    <Route path='/manager/manager-dashboard/manager/Vehicle/table' element={<VehicleTable/>}></Route>
    <Route path='/manager/manager-dashboard/Feedback/table' element={<FeedBackTable/>}></Route>
    
    </Route>
    
    //Private Route for  driver
  
   <Route  path='/driver' element={<DriverPrivate/>}>
   
   <Route path='/driver/driver-dashboard' element={<DiverDashBoard2/>}></Route> 
    
    
   
    
     </Route>
          
       
   



  </Routes>
    
    
    </>
    
  );
}

export default App;
