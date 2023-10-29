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
      <Search
        type="text"
        placeholder="Digite o username do Github para buscar"
        // value={}
        // onChange={(e) => [setEmail(e.target.value), setError("")]}
      />
      <Button Text="Pesquisar" /*onClick={handleLogin}*//>
      <Button Text="Histórico" /*onClick={handleLogin}*//>
    </C.Container>
  );
};

export default Home;
