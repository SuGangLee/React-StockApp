import React from "react";
import Home from "./screens/Home";
import styled from "styled-components";
import NavigationBar from "./components/NavigationBar";
import { MdCandlestickChart } from "react-icons/md";
import { Route, Routes, Link, useNavigate, Outlet } from "react-router-dom";
import LikePage from "./screens/LikePage";
import Portfoilo from "./screens/Portfolio";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Title onClick={() => navigate("/")}>
          <MdCandlestickChart size={30} />
          Stockvest
        </Title>
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/like" element={<LikePage />} />
            <Route path="/portfolio" element={<Portfoilo />} />
          </Routes>
        </ContentContainer>
        <NavigationBar />
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: auto;
  width: 390px;
  height: 768px;
  margin-top: 5%;
  margin-bottom: 5%;
  position: relative;
  box-shadow: 2px 2px 5px 5px lightgray;
`;
const ContentContainer = styled.div`
  width: 100%;
  height: 700px;

  margin: auto;
  overflow: scroll; //스크롤
`;

const Title = styled.div`
  display: flex;
  font-weight: 700;
  padding: 3%;

  justify-content: center;
  align-items: center;
`;

export default App;
