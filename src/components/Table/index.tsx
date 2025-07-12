/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { GridRenderCellParams } from "@mui/x-data-grid";

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
  expandedRowIds?: (string | number)[];
  renderExpandedRow?: (row: any) => React.ReactNode;
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
  expandedRowIds = [],
  renderExpandedRow,
}) => {
  const [visibleRowsCount, setVisibleRowsCount] = useState(initialRowsCount);

  const rowsWithExpanded = useMemo(() => {
    const newRows: any[] = [];
    const visibleRows = allRows.slice(0, visibleRowsCount);

    visibleRows.forEach((row) => {
      newRows.push(row);
      if (expandedRowIds.includes(row.id)) {
        newRows.push({
          id: `${row.id}-expanded`,
          isExpandedRow: true,
          data: row,
        });
      }
    });

    return newRows;
  }, [allRows, visibleRowsCount, expandedRowIds]);

  useEffect(() => {
    setVisibleRowsCount(initialRowsCount);
  }, [allRows, initialRowsCount]);

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

  const columnsWithCustomRender = useMemo(() => {
    return columns.map((col, index) => ({
      ...col,
      renderCell: (params: GridRenderCellParams) => {
        const row = params.row;

        if (row.isExpandedRow) {
          if (index === 0) {
            return (
              <div
                style={{
                  gridColumn: `1 / -1`,
                  width: "100%",
                  padding: 20,
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 1px 2px 0px #00000033",
                }}
              >
                {renderExpandedRow?.(row.data)}
              </div>
            );
          }
          return null;
        }

        return col.renderCell ? col.renderCell(params) : params.value ?? null;
      },
    }));
  }, [columns, renderExpandedRow]);

  return (
    <div onScroll={handleRowsScroll} style={{ width: "100%" }}>
      <DataGrid
        rows={rowsWithExpanded}
        columns={columnsWithCustomRender}
        autoHeight
        disableRowSelectionOnClick
        checkboxSelection={checkboxSelection}
        hideFooter
        onRowClick={onRowClick}
        disableColumnMenu={disableColumnMenu}
        disableColumnSorting={disableColumnSorting}
        disableColumnResize={disableColumnResize}
        density="standard"
        getRowHeight={(params) => {
          if (params.model.isExpandedRow) return "auto";
          return null;
        }}
        getRowClassName={(params) =>
          params.row.isExpandedRow ? "expanded-row" : ""
        }
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
          "& .MuiDataGrid-cell": {
            whiteSpace: "normal",
            lineHeight: "1.5em",
          },
          "& .MuiDataGrid-row.expanded-row": {
            "& .MuiDataGrid-cell": {
              padding: 0,
              borderBottom: "none",
              backgroundColor: "transparent",
            },
            "& .MuiDataGrid-cell:not(:first-of-type)": {
              width: "100%",
            },
          },
        }}
      />
    </div>
  );
};

export default DynamicTable;
