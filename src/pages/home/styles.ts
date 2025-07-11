import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f0f0;
  min-height: 100vh;
  overflow-x: hidden;
`;

export const ContainerPageTitle = styled.div`
  display: flex;
  width: 100%;
  height: 10vh;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
`;

export const PageTitle = styled.h1`
  font-weight: 500;
  font-size: 20px;
  color: #1c1c1c;
`;

export const ContainerSearchBar = styled.div`
  width: 288px;
`;

export const ContainerTable = styled.div`
  width: 95%;
  height: 60vh;
  margin-top: 40px;
`;
