import React, { useEffect, useState } from "react";

import { Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { allFeedback, getFeedbackByname } from "../Service/AuthService";
import { ToastContainer, toast } from "react-toastify";

export const FeedBackTable = () => {
    const [currentPage, setCurrentPage] = useState(0)
  
     const [value, setValue] = useState("");
    
    

   
  const [Feedbacks, setFeefback] = useState({
    feedbackList: [
       
    ],
    totalPages: "",
    totalElement: "",
    pageSize: "",
    pageNumber: "",
    lastPage: false,
  });
  const [filteredData, setFilteredData] = useState({
    feedbackList: [
       
    ],
    totalPages: "",
    totalElement: "",
    pageSize: "",
    pageNumber: "",
    lastPage: false,
  }
  );
  
  const changePage=(pageNumber=0,pageSize=10)=>{
    if(pageNumber>Feedbacks.pageNumber&& Feedbacks.lastPage){
     return
    }
    if(pageNumber<Feedbacks.pageNumber&& Feedbacks.pageNumber==0){
     return
    }
     allFeedback(pageNumber,pageSize).then((resp)=>{
         setFeefback(resp);
         setFilteredData(resp);
        //  Window.scroll(0,0);
     }).catch((error)=>{  
     })
   }
  // console.log(Feedbacks.totalElement);

  useEffect(() => {
     changePage(0);
  }, []);

  useEffect(()=>{
   
  })
  // const handelSearch=async(event)=>{
  //    event.preventDefault();
  //   console.log(value);
  //   getFeedbackByname(value).then((resp)=>{
  //     console.log(value);
  //     console.log(resp);
  //     setFilteredData(resp);
  // },[value])
   
  //}
  const filter=(event)=>{
// setFilteredData(Feedbacks.feedbackList.filter(f => f.name.toLowerCase().includes(event.target.value)))
  }
 
  const handelReset=()=>{
    changePage(0);
  }
  return (
    <div>
        
        {/* <input className="form-control w-25" value={value} 
        onChange={filter} 
        type="text" 
        placeholder="search here" /> */}
        <div className="container mt-5">
        <div className="card">
          <div className="text-center mt-3">
          <input type="text" 
          placeholder="search here"  
          className="col-md-6 border-radius-5"
          
          />
          
          </div>
          <div className="card-body">
            <div className="card-header">Total Record: {Feedbacks.totalElement}</div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">name</th>
                  <th scope="col">email</th>
                  <th scope="col">Message</th>
                </tr>
              </thead>
              <tbody>
                {
                filteredData.feedbackList.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.id}</td>
                    <td>{vehicle.name}</td>
                    <td>{vehicle.email}</td>
                    <td>{vehicle.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center ">
            
            <Pagination >
              <PaginationItem  disabled={Feedbacks.pageNumber == 0} onClick={()=>changePage(Feedbacks.pageNumber-1)} >
                <PaginationLink >previous</PaginationLink>
              </PaginationItem>


              {[...Array(Feedbacks.totalPages)].map((item, index) => (
                <PaginationItem onClick={()=>changePage(index)} active={index==Feedbacks.pageNumber} key={index}>

                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem disabled={Feedbacks.lastPage} onClick={()=>changePage(Feedbacks.pageNumber+1)}>
                <PaginationLink >next</PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </div>
      <ToastContainer/>
      
      </div>
    
  );
};
