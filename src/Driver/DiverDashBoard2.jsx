import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../Authanticate/Authenticate-Service";
import { GetVehicleByDriverId } from "../Service/AuthService";
import { Filter } from "@mui/icons-material";
import BootstrapTable from "react-bootstrap-table-next";
import { useNavigate } from "react-router-dom";

export const DiverDashBoard2 = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");


  const navigate = useNavigate();

  const init = (event) => {
    const user = getCurrentUser();

    if (user != null) {
      GetVehicleByDriverId(user.id)
        .then((resp) => {
          setVehicleData(resp);
          setFilterData(resp);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/");
      console.log("User not found");

      return "hlo";
    }
  };
  useEffect(() => {
    init();
  }, []);

  //PageRelatedData
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = vehicleData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(vehicleData.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changePage = (params) => {
    setCurrentPage(params);
  };
  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    init();
  }, []);
  const hendelReset = () => {
    init();
  };

  

  const columns = [
    { dataField: "id", text: "id", sort: true },
    { dataField: "name", text: "Vehicle Name" },
    { dataField: "model", text: "Model" },
    { dataField: "assignedDate", text: "Assigned-Date" },
    { dataField: "assignedBy", text: "Assigned-By" },
  ];
  const Filter = (event) => {
    event.preventDefault();

    setSearch(event.target.value);
    
    if (search != "") {
      setFilterData(
        vehicleData.filter((f) => f.name.toLowerCase().includes(search))
      );
      console.log(filterData);

      setVehicleData(filterData);
    } else  {
      init();
    }
  };

  return (
    <div className="container">
      <div className="container  mt-2">
        <div className="card">
          <div className="card-header">Total Records {vehicleData.length}</div>
          <div className="text-center mx-sm-5 w-60 mb-2">
            <input
              type="text"
              value={search}
              onChange={Filter}
              className="form-control col-md-3 text-center "
              placeholder="search  vehicle by name"
            />
          </div>
          <div className="card-body">
            <BootstrapTable keyField="id" columns={columns} data={records}>
              {/* <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">name</th>
                  <th scope="col">model</th>
                  <th scope="col">Assigned Date-Time</th>
                  <th scope="col">Assigned By</th>
                </tr>
              </thead> */}
              <tbody>
                {records && records.length > 0
                  ? records.map((vehicle, i) => (
                      <tr key={i}>
                        <td>{vehicle.id}</td>
                        <td>{vehicle.name}</td>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.assignedDate}</td>
                        <td>{vehicle.assignedBy}</td>
                      </tr>
                    ))
                  : "LOADING"}
              </tbody>
            </BootstrapTable>

            <div className="text-center">
              <ul className="pagination list-inline justify-content-center">
                <li className="page-item">
                  <a href="#" className="page-link" onClick={prePage}>
                    Prev
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li
                    className={`page-item${currentPage === n ? "active" : ""}`}
                    key={i}
                  >
                    <a
                      href="#"
                      className="page-link"
                      onClick={() => changePage(n)}
                    >
                      {" "}
                      {n}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a href="#" className="page-link " onClick={nextPage}>
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
