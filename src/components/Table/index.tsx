/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

interface DynamicTableProps {
  columns: GridColDef[];
  allRows: any[];
  initialRowsCount?: number;
  loadMoreCount?: number;
  checkboxSelection?: boolean;
  disableColumnMenu?: boolean;
  disableColumnSorting?: boolean;
  disableColumnResize?: boolean;
  onRowClick?: (params: any) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  allRows,
  initialRowsCount = 20,
  loadMoreCount = 20,
  checkboxSelection = false,
  disableColumnMenu = true,
  disableColumnSorting = true,
  disableColumnResize = true,
  onRowClick,
}) => {
  const [visibleRowsCount, setVisibleRowsCount] =
    React.useState(initialRowsCount);
  const [rows, setRows] = React.useState(allRows.slice(0, initialRowsCount));

  React.useEffect(() => {
    setRows(allRows.slice(0, visibleRowsCount));
  }, [allRows, visibleRowsCount]);

  const handleRowsScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
      if (visibleRowsCount < allRows.length) {
        setVisibleRowsCount((prev) =>
          Math.min(prev + loadMoreCount, allRows.length)
        );
      }
    }
  };

  return (
    <div style={{ height: 600, width: "100%" }} onScroll={handleRowsScroll}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        disableRowSelectionOnClick
        checkboxSelection={checkboxSelection}
        hideFooter
        onRowClick={onRowClick}
        disableColumnMenu={disableColumnMenu}
        disableColumnSorting={disableColumnSorting}
        disableColumnResize={disableColumnResize}
        density="standard"
        sx={{
          borderRadius: "8px",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#0500FF",
            color: "#fff",
            fontWeight: "500",
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
        }}
      />
    </div>
  );
};

export default DynamicTable;
