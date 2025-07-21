import React, { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import Alert from "./Alert";
import instance from "../utils/axiosInstance";


const CustomDataTable = ({ tableName, url, columns, refresh, message }) => {
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderColumn, setOrderColumn] = useState(0);

  const fetchItems = useCallback(
    async (page, perPage = 10, search = "") => {
      setLoading(true);

      const draw = page;
      const start = (page - 1) * perPage;
      const length = perPage;

      const jsonData = {
        draw,
        start,
        length,
        search: { value: search },
        order: [
          {
            column: orderColumn,
            dir: orderDirection,
          },
        ],
      };
      const response = await instance.post(url, jsonData);
      const json = await response.data;
      
      setItems(json.data);
      setTotalRows(json.recordsFiltered);
      setLoading(false);
    },
    [url, orderColumn, orderDirection]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchItems(page, perPage, searchText);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchText, page, perPage, fetchItems, refresh, orderColumn, orderDirection]);

  const handlePageChange = (page) => setPage(page);
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    setPage(page);
  };

  const customStyles = {
    header: {
      style: {
        minHeight: "50px",
        paddingLeft: "16px",
        paddingRight: "8px",
      },
    },
    headRow: {
      style: {
        background: "#cccccc",
        color: "#ffffff",
        fontWeight: "600",
        fontSize: "14px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      },
    },
    headCells: {
      style: {
        color: "#ffffff",
        fontSize: "13px",
        fontWeight: "600",
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        fontWeight: "400",
        color: "#2c3e50",
        "&:hover": {
          backgroundColor: "#f8f9ff",
          transform: "translateY(-1px)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      },
      stripedStyle: {
        backgroundColor: "#fafbfc",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "12px",
        paddingBottom: "12px",
        minWidth: "50px",
      },
    },
    pagination: {
      style: {
        borderTop: "1px solid #e1e8ed",
        minHeight: "56px",
      },
      pageButtonsStyle: {
        borderRadius: "6px",
        height: "32px",
        padding: "0 12px",
        margin: "0 4px",
        cursor: "pointer",
      },
    },
  };

  return (
    <div className="main_page">
      <div className="page_title">
        <h3>{tableName || "NA"} List</h3>
      </div>
      <div className="page_body">
        <div className="page_sec">
          {message && <Alert message={message} />}
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              padding: "8px",
              marginBottom: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "250px",
            }}
          />
          <div className="data-table-wrapper mt-3">
            <DataTable
              columns={columns}
              data={items}
              progressPending={loading}
              pagination
              customStyles={customStyles}
              paginationServer
              paginationTotalRows={totalRows}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              sortServer
              onSort={(column, sortDirection) => {
                const index = columns.findIndex(
                  (col) => col.name === column.name
                );
                setOrderColumn(index);
                setOrderDirection(sortDirection);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDataTable;
