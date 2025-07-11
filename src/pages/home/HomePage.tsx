/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Input from "@/components/Input";
import DynamicTable from "@/components/Table";

import type { GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";

import api from "@/services/api";
import { formatDate, formatPhone } from "@/utils/masks";

import {
  ContainerPageTitle,
  ContainerSearchBar,
  ContainerTable,
  MainContainer,
  PageTitle,
} from "./styles";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getEmployees = async () => {
    api
      .get("/employees")
      .then((response: any) => {
        setData(response.data);
      })
      .catch((err: any) => {
        console.error("Erro! ocorreu um erro: " + err);
      });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "image",
      renderHeader: () => <h2 style={{ color: "white" }}>FOTO</h2>,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Avatar alt={params.row.name} src={params.row.image} />
        </div>
      ),
    },
    {
      field: "name",
      renderHeader: () => <h2 style={{ color: "white" }}>NOME</h2>,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 400 }}>{params.value}</h3>
        </div>
      ),
    },
    {
      field: "job",
      renderHeader: () => <h2 style={{ color: "white" }}>CARGO</h2>,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 400 }}>{params.value}</h3>
        </div>
      ),
    },
    {
      field: "admission_date",
      renderHeader: () => <h2 style={{ color: "white" }}>DATA DE ADMISSÃO</h2>,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 400 }}>
            {formatDate(params.value)}
          </h3>
        </div>
      ),
    },
    {
      field: "phone",
      renderHeader: () => <h2 style={{ color: "white" }}>TELEFONE</h2>,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 400 }}>
            {formatPhone(params.value)}
          </h3>
        </div>
      ),
    },
  ];

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
            onChange={(e) => setSearchValue(e.target.value)}
            searchbar
            onSearchClick={() => console.log("Buscando:", searchValue)}
            variant="outlined"
          />
        </ContainerSearchBar>
      </ContainerPageTitle>
      <ContainerTable>
        <DynamicTable
          columns={columns}
          allRows={data}
          initialRowsCount={20}
          loadMoreCount={20}
        />
      </ContainerTable>
    </MainContainer>
  );
}
