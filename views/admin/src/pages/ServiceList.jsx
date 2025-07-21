import React, { useState } from "react";

import CustomDataTable from "../components/CustomDataTable";
import instance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { activateItem, deactivateItem, deleteItem } from "../services/commonApi";

function ServiceList() {
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
            {row[4] === "active" ? "Deactivate" : "Activate"}
          </button>
        </div>
      ),
      width: "150px", // 👈 Make sure action buttons fit
      ignoreRowClick: true,
      button: true,
    },
  ];

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const response = 
      newStatus === "active"
        ? await activateItem("tbl_services", id)
        : await deactivateItem("tbl_services", id);

    if (response.success) {
      setMessage(`Success: ${response.message}`);
      setToggle(!toggle); // Refresh the table
    } else {
      setMessage(`Error: ${response.message}`);
    }
  };

  const handleEdit = (id) => {
    navigate("/add-service/" + id);
  };

  const handleDelete = async (id) => {
    const response = await deleteItem("tbl_services", id);
    if (response.success) {
      setMessage(`Success: ${response.message}`);
      setToggle(!toggle); // Refresh the table
    } else {
      setMessage(`Error: ${response.message}`);
    }
  };
  return (
    <>
    <div>
      <CustomDataTable
        tableName={"Service"}
        url={"/api/services/ajax/service-list"}
        columns={columns}
        refresh={toggle}
        message={message}
      />
    </div>
    </>
  );
}

export default ServiceList;
