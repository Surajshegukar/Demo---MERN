import React, { useState, useEffect } from "react";

import CustomDataTable from "../components/CustomDataTable";
import instance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import {
  activateItem,
  deactivateItem,
  deleteItem,
} from "../services/commonApi";

function ServiceList() {
  const [refresh, setRefresh] = useState(false);
  const [message, setMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredUrl, setFilteredUrl] = useState(
    "/api/services/ajax/service-list"
  );
  const navigate = useNavigate();
  // Update the API URL based on status filter
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredUrl("/api/services/ajax/service-list");
    } else {
      setFilteredUrl(`/api/services/ajax/service-list?status=${statusFilter}`);
    }
  }, [statusFilter]);

  const columns = [
    {
      name: "S.No",
      selector: (row) => row[0],
      width: "80px", // 👈 Set fixed width
    },
    {
      name: "Service Name",
      selector: (row) => row[1],
      width: "200px", // 👈 Set minimum width
    },
    {
      name: "Service Description",
      selector: (row) => row[2],
      minWidth: "150px", // 👈 Wider column for description
    },
    {
      name: "Service Image",
      selector: (row) => (
        <Link
          to={`${import.meta.env.VITE_APP_API_URL}/uploads/services/${row[3]}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Preview
        </Link>
      ),
      width: "200px",
    },
    {
      name: "Status",
      selector: (row) => row[4],
      cell: (row) =>(
        row[4] == 1 ? "Active" : "Inactive"

      ),
      width: "200px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="tabe-btns">
          <button
            onClick={() => handleEdit(row[5])}
            className="btn btn-sm btn-warning"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row[5])}
            className="btn btn-sm btn-danger"
            style={{ marginLeft: "8px" }}
          >
            Delete
          </button>
          <button
            onClick={() => handleToggleStatus(row[5], row[4])}
            className="btn btn-sm btn-info"
            style={{ marginLeft: "8px" }}
          >
            {row[4] == 1 ? "Deactivate" : "Activate"}
          </button>
        </div>
      ),
      width: "150px", // 👈 Make sure action buttons fit
      ignoreRowClick: true,
      button: true,
    },
  ];

  const handleToggleStatus = async (id, currentStatus) => {
    // If currentStatus is 1 (active), deactivate; if 0 (inactive), activate
    console.log(refresh);
    let response;
    if (currentStatus == 1) {
      response = await deactivateItem("tbl_services", id);
    } else {
      response = await activateItem("tbl_services", id);
    }

    if (response.data.success) {
      setMessage(`Success: ${response.data.message}`);
      setRefresh(!refresh);
    } else {
      setMessage(`Error: ${response.data.message}`);
    }
  };

  const handleEdit = (id) => {
    navigate("/add-service/" + id);
  };

  const handleDelete = async (id) => {
    const response = await deleteItem("tbl_services", id);
    if (response.data.success) {
      setMessage(`Success: ${response.data.message}`);
      setRefresh(!refresh); // Refresh the table
    } else {
      setMessage(`Error: ${response.data.message}`);
    }
  };
  return (
    <>
      <div className="main_page">
        <div className="page_title">
          <h3>Service List</h3>
        </div>
        <div className="page_body"></div>
        <div className="filter-container">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: "200px", marginBottom: "16px" }}
          >
            <option value="all">All Statuses</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <div className="table-container">
          <CustomDataTable
            tableName={"Service"}
            url={filteredUrl}
            columns={columns}
            refresh={refresh}
            message={message}
          
          />
        </div>
      </div>
    </>
  );
}

export default ServiceList;
