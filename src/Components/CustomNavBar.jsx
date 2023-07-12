import React, { useEffect, useState } from 'react';




import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBTabsItem,
} from 'mdb-react-ui-kit';
import { doLogout, getCurrentUser, getCurrentUserRole, getCurrentUserValidToken, isLogedin } from '../Authanticate/Authenticate-Service';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LogoutHandler, getCurrentUrl } from '../Service/AuthService';


export const CustomNavBar=()=> {
  const [showBasic, setShowBasic] = useState(false);

  const [login,setLogin]=useState(false)
  const [user,setUser]=useState(undefined)
  const [role,setRole]=useState("")
  const [mainRole,setMainRole]=useState("")
  const [url,setUrl]=useState("");
  const[userid,setUserId]=useState(undefined);
 
  
  useEffect(()=>{
   
    // getCurrentUserValidToken(user.id).then((resp)=>{
    //   console.log(resp);
    // }).catch((error)=>error);
    
   
    setLogin(isLogedin())
   
    setUser(getCurrentUser())
    
    
    setRole(getCurrentUserRole());

    setUrl(getCurrentUrl());
   

  },[login])




 
 
const navigate =useNavigate();
  const Logout =()=>{
   
    doLogout(()=>{
      
      setLogin(false);
      
     

    
    
    }) 
    

    

  }
  const isAdmin=()=>{
    if (getCurrentUserRole()=='ADMIN') {
      
      return true;
    }
    else{
      return false;
    }
  
  }
  const isManager=()=>{
    if (getCurrentUserRole()=='MANAGER') {
      
      return true;
    }
    else{
      return false;
    }
  }
  
  
  return (
    <MDBNavbar expand='lg' light bgColor='primary' className=''>
      <MDBContainer fluid>
        <MDBNavbarBrand >
        <Link to={'/login'} className="nav-link  ms-3"> <Link to={`${url}`} className="nav-link "> <img src={require="../fav.png"} className='brand-logo' height={50} width={90} alt="" /></Link></Link>
          
          
        </MDBNavbarBrand>
       
       
       

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          className='btn btn-primary'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          Menu 
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
       
        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            
          {
              !login&&   (
                <>
          <MDBNavbarItem>
         
            <Link to={'/feedback'} className="nav-link ms-5 "> Feedback</Link>
            </MDBNavbarItem>
            </>
              )}
 
            {
              login &&   (
                <>
                <MDBNavbarItem>
            <Link to={'/login'} className="nav-link ms-5"> <Link to={`${url}`} className="nav-link btn btn-primary"> Home</Link></Link>
            </MDBNavbarItem>
                    <MDBNavbarItem>
                   
              {/* <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link btn btn-primary mt-2 ms-5' role='button'>
                 More
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  
                 
                       <MDBDropdownItem link> <Link to={`${url}/add/user`} className="nav-link btn btn-primary"> Add User</Link></MDBDropdownItem>
                  <MDBDropdownItem link><Link to={`${url}/add-vehicle`} className="nav-link btn btn-primary"> Add Vehicle</Link></MDBDropdownItem>
                  
                  <MDBDropdownItem link><Link to={`${url}/Feedback/table`} className="nav-link btn btn-primary"> View Feedback</Link></MDBDropdownItem>
                
                    
                 </MDBDropdownMenu>
              </MDBDropdown> */}
            </MDBNavbarItem>

           
                </>
              )
            }

        
          </MDBNavbarNav>
          {
        login &&  (
          <>
          
         
         
         
          <MDBDropdown className='me-0'>
            
          <div className="text-center me-5">
          
          </div>
                <MDBDropdownToggle tag='a' className='nav-link me-3 mb-0' role='button'>
               {
                
                 user.firstname.toUpperCase()+ `(${role})`
                 }
               
             
                </MDBDropdownToggle>
                <MDBDropdownMenu className='mt-3'>
                <MDBDropdownItem>
                <Link to={'/editprofile'} className="nav-link ms-3">  Edit Profile</Link>
               
                </MDBDropdownItem>
                  
                  <MDBDropdownItem link  onClick={Logout} >Logout</MDBDropdownItem>
                </MDBDropdownMenu>
             
              </MDBDropdown>
              <div className="image-Profile">
                  <img src={require="http://localhost:1081/api/v1/auth/image/"+user.imageName} className='nav-link me-5 rounded-circle' height={50} width={50} alt="" />
                
                  </div> 
          </>
        
          
        )
        }
        
        </MDBCollapse>
        
       
      </MDBContainer>
     
             
    </MDBNavbar>
  );
}
