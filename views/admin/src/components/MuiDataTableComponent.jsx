import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

const MuiDataTableComponent = ({ url, tableName, refresh, message }) => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState({ name: "", direction: "asc" });

  const fetchData = async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        draw: page + 1,
        start: page * rowsPerPage,
        length: rowsPerPage,
        search: { value: searchText },
        order: sortOrder.name
          ? [
              {
                column: sortOrder.name,
                dir: sortOrder.direction,
              },
            ]
          : [],
      }),
    });

    const json = await response.json();
    setData(json.data);
    setTotalCount(json.recordsFiltered);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [page, rowsPerPage, searchText, sortOrder, refresh]);

  const options = {
    serverSide: true,
    count: totalCount,
    page,
    rowsPerPage,
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          setPage(tableState.page);
          break;
        case "changeRowsPerPage":
          setRowsPerPage(tableState.rowsPerPage);
          setPage(0);
          break;
        case "search":
          setSearchText(tableState.searchText || "");
          break;
        case "sort":
          setSortOrder({
            name: tableState.sortOrder.name,
            direction: tableState.sortOrder.direction,
          });
          break;
        default:
          break;
      }
    },
    searchPlaceholder: "Search...",
    selectableRows: "none",
    elevation: 0,
  };

  const columns = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "role", label: "Role" },
    // Add more columns as needed
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h3>{tableName || "Data Table"}</h3>
      {message && <div>{message}</div>}
      <MUIDataTable
        title={`${tableName || "Items"} List`}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default MuiDataTableComponent;