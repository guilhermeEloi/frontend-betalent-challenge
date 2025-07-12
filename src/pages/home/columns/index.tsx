/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, IconButton } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { formatDate, formatPhone } from "@/utils/masks";

const centerCellStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  height: "100%",
  alignItems: "center",
};

const textStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 400,
};

const iconStyle: React.CSSProperties = {
  color: "#0500FF",
};

const renderHeader = (title: string) => (
  <h2 style={{ color: "white" }}>{title}</h2>
);

const renderCenteredTextCell = (text: string) => (
  <div style={centerCellStyle}>
    <h3 style={textStyle}>{text}</h3>
  </div>
);

const renderFormattedTextCell = (value: any, formatter: (v: any) => string) => (
  <div style={centerCellStyle}>
    <h3 style={textStyle}>{formatter(value)}</h3>
  </div>
);

export const employeeColumns: GridColDef[] = [
  {
    field: "image",
    renderHeader: () => renderHeader("FOTO"),
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <div style={centerCellStyle}>
        <Avatar alt={params.row.name} src={params.row.image} />
      </div>
    ),
  },
  {
    field: "name",
    renderHeader: () => renderHeader("NOME"),
    flex: 1,
    headerAlign: "center",
    renderCell: (params) => renderCenteredTextCell(params.value),
  },
  {
    field: "job",
    renderHeader: () => renderHeader("CARGO"),
    flex: 1,
    headerAlign: "center",
    renderCell: (params) => renderCenteredTextCell(params.value),
  },
  {
    field: "admission_date",
    renderHeader: () => renderHeader("DATA DE ADMISSÃO"),
    flex: 1,
    headerAlign: "center",
    renderCell: (params) => renderFormattedTextCell(params.value, formatDate),
  },
  {
    field: "phone",
    renderHeader: () => renderHeader("TELEFONE"),
    flex: 1,
    headerAlign: "center",
    renderCell: (params) => renderFormattedTextCell(params.value, formatPhone),
  },
];

export const getEmployeeMobileColumns = (
  expandedRowIds: (string | number)[],
  toggleRow: (id: string | number) => void
): GridColDef[] => [
  {
    field: "image",
    renderHeader: () => renderHeader("FOTO"),
    width: 90,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <div style={centerCellStyle}>
        <Avatar alt={params.row.name} src={params.row.image} />
      </div>
    ),
  },
  {
    field: "name",
    renderHeader: () => renderHeader("NOME"),
    headerAlign: "center",
    flex: 1,
    renderCell: (params) => renderCenteredTextCell(params.value),
  },
  {
    field: "actions",
    headerName: "•",
    headerAlign: "center",
    width: 20,
    renderCell: (params) => {
      if (params.row.isExpandedRow) return null;

      const isOpen = expandedRowIds.includes(params.row.id);

      return (
        <IconButton
          onClick={() => toggleRow(params.row.id)}
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          {isOpen ? (
            <KeyboardArrowUpIcon fontSize="large" style={iconStyle} />
          ) : (
            <KeyboardArrowDownIcon fontSize="large" style={iconStyle} />
          )}
        </IconButton>
      );
    },
  },
];
