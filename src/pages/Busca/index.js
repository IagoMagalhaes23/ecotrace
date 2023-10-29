import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Search from "../../components/Search";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <C.Container>
      <Navbar/>
      <Search/>
      <Button/>
      <Button/>
    </C.Container>
  );
};

export default Home;
