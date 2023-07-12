import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { DeleteVehicleByID, DeleteuserDetails, getDrivers } from "../Service/AuthService";
import { myAxios } from "../Service/Helper";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const VehicleTable = () => {
  const [search, setSearch] = useState("");
  const [driver, setDriver] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const getAllDriver = async () => {
    try {
      const response = await myAxios.get(
        "http://localhost:1081/api/v1/auth/allVehicles"
      );
      setDriver(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteVehicle = (params) => {
    DeleteVehicleByID(params)
      .then((resp) => {
        toast.success(`Deleted Successfullt`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        getAllDriver();
      })
      .catch((error) => {});
  };

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      
    
      sortable: true,
    },

    {
      name: "Driver-Id",
      selector: (row) => row.driverid,
      sortable: true,
    },
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "model",
      selector: (row) => row.model,
      sortable: true,
    },
    {
      name: "type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "registrationnumber",
      selector: (row) => row.registrationnumber,
      sortable: true,
    },
    {
      name: "chassinumber",
      selector: (row) => row.chassinumber,
    },
   
    {
      name: "createdby",
      selector: (row) => row.createdby,
      sortable: true,
    },
    // {
    //   name: "Edit",
    //   cell: (row) => (
    //     <Link to={"//" + row.id} className="btn btn-sm btn-primary  mt-2">
    //       {" "}
    //       &nbsp;Edit&nbsp;
    //     </Link>
    //   ),
    // },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteVehicle(row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  useEffect(() => {
    getAllDriver();
  }, []);

  useEffect(() => {
    const result = driver.filter((drivers) => {
      return drivers.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search]);

  return (
    <div>
      <DataTable
        title="Vehicles Data"
        // actions={
        //   <Link to="/admin/admin-dashboard/add-vehicle">
        //     <button className="btn btn-warning">Add</button>
        //     <ToastContainer />
        //   </Link>
        // }
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        columns={columns}
        data={filteredData}
        fixedHeader
        pagination
        subHeader
        subHeaderComponent={
          <input
            className="form-control w-25"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="search here"
          />
        }
      />
    </div>
  );
};
