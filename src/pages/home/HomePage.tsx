/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useTheme, useMediaQuery, type Theme } from "@mui/material";

import Header from "@/components/Header";
import Input from "@/components/Input";
import DynamicTable from "@/components/Table";
import Loader from "@/components/Loader";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  filterEmployees,
  resetFilteredEmployees,
  setEmployees,
  setSearchValue,
} from "@/redux/slices/employeesSlice";

import { employeeColumns, getEmployeeMobileColumns } from "./columns";
import { useEmployees } from "./hooks/useHome";

import { formatDate, formatPhone } from "@/utils/masks";

import {
  ContainerPageTitle,
  ContainerSearchBar,
  ContainerTable,
  MainContainer,
  PageTitle,
} from "./styles";

import type { Employee } from "./types";

const ExpandedRowItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px dotted #DFDFDF",
      marginTop: 10,
    }}
  >
    <h2 style={{ fontSize: 16 }}>{label}</h2>
    <h3 style={{ fontSize: 16, fontWeight: 400 }}>{value}</h3>
  </div>
);

const renderRowDetails = (row: Employee) => (
  <>
    <ExpandedRowItem label="Cargo" value={row.job} />
    <ExpandedRowItem
      label="Data de admissão"
      value={formatDate(row.admission_date)}
    />
    <ExpandedRowItem label="Telefone" value={formatPhone(row.phone)} />
  </>
);

export default function HomePage() {
  const dispatch = useDispatch();

  const { fetchEmployees, loading, error } = useEmployees();

  const [expandedRowIds, setExpandedRowIds] = useState<(string | number)[]>([]);

  const theme = useTheme<Theme>();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { filteredEmployees, searchValue } = useSelector(
    (state: RootState) => state.employees
  );

  const toggleRow = (id: string | number) => {
    setExpandedRowIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchEmployees().then((data: any) => {
      if (data) dispatch(setEmployees(data));
    });
  }, [fetchEmployees, dispatch]);

  if (error)
    return (
      <MainContainer>
        <Header />
        <p style={{ padding: 16, color: "red" }}>
          Erro ao carregar funcionários: {error.message}
        </p>
      </MainContainer>
    );

  const columns = isSmallScreen
    ? getEmployeeMobileColumns(expandedRowIds, toggleRow)
    : employeeColumns;

  return (
    <MainContainer>
      <Header />

      <ContainerPageTitle>
        <PageTitle>Funcionários</PageTitle>

        <ContainerSearchBar>
          <Input
            label="Pesquisar"
            name="search"
            value={searchValue}
            onChange={(e) => {
              const value = e.target.value;
              dispatch(setSearchValue(value));

              if (value.trim() === "") {
                dispatch(resetFilteredEmployees());
              }
            }}
            searchbar
            onSearchClick={() => dispatch(filterEmployees())}
            variant="outlined"
          />
        </ContainerSearchBar>
      </ContainerPageTitle>

      <ContainerTable>
        {loading ? (
          <Loader />
        ) : (
          <DynamicTable
            columns={columns}
            allRows={filteredEmployees}
            initialRowsCount={20}
            loadMoreCount={20}
            expandedRowIds={expandedRowIds}
            renderExpandedRow={renderRowDetails}
          />
        )}
      </ContainerTable>
    </MainContainer>
  );
}
