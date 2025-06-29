import React, { useState } from "react";

import CustomDataTable from "../components/CustomDataTable";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function StudentList() {
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const columns = [
    { name: "S.No", selector: (row) => row[0] },
    { name: "First Name", selector: (row) => row[1] },
    { name: "Last Name", selector: (row) => row[2] },
    { name: "DOB", selector: (row) => row[3] },
    {
      name: "Profile",
      selector: (row) => (
        <>
          <Link
            to={`http://localhost:3000/uploads/${row[4]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview
          </Link>
        </>
      ),
    },
    { name: "Email", selector: (row) => row[5] },
    { name: "Mobile No", selector: (row) => row[6] },
    { name: "Address", selector: (row) => row[7] },
    { name: "Status", selector: (row) => row[8] },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div className="tabe-btns">
            <button
              onClick={() => handleEdit(row[9])}
              className="btn btn-sm btn-warning"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row[9])}
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
    navigate("/add-student/" + id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/students/${id}`,
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
        tableName={"Student"}
        url={"http://localhost:3000/api/ajax/students"}
        columns={columns}
        refresh={toggle}
        message={message}
      />
    </div>
  );
}

export default StudentList;
