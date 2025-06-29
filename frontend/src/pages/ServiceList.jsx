import React, { useState } from "react";

import CustomDataTable from "../components/CustomDataTable";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ServiceList() {
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const columns = [
    { name: "S.No", selector: (row) => row[0] },
    { name: "Service Name", selector: (row) => row[1] },
    { name: "Service Description", selector: (row) => row[2] },
    {
      name: "Service Image",
      selector: (row) => (
        <>
          <Link
            to={`http://localhost:3000/uploads/${row[3]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview
          </Link>
        </>
      ),
    },
    { name: "Status", selector: (row) => row[4] },
    {
      name: "Actions",
      cell: (row) => (
        <>
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
          </div>
        </>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  const handleEdit = (id) => {
    navigate("/add-service/" + id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/services/delete-service/${id}`,
      );
      if (response.data) {
        const { success, message } = response.data;
        setMessage(success ? `Success: ${message}` : `Error: ${message}`);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      setMessage(`Error: ${msg}`);
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };
  return (
    <div>
      <CustomDataTable
        tableName={"Service"}
        url={"http://localhost:3000/api/services/ajax/service-list"}
        columns={columns}
        refresh={toggle}
        message={message}
      />
    </div>
  );
}

export default ServiceList;
