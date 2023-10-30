import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Search from "../../components/Search";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";

const Home = () => {
  const { signout, user } = useAuth();
  const navigate = useNavigate();
  const [pesquisa, setPesquisa] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log(pesquisa);
    navigate('/repositorios');
  };

  const handleHistorico = () => {
    navigate('/historico');
  };

  const handleSignout = () => {
    signout();
    navigate('/login');
  };

  return (
    <C.Container>
      <Navbar user={user.user} />
      <Search
        type="text"
        placeholder="Digite o username do Github para buscar"
        value={pesquisa}
        onChange={(e) => [setPesquisa(e.target.value), setError("")]}
      />
      <Button Text="Pesquisar" onClick={handleSearch}/>
      <Button Text="Histórico" onClick={handleHistorico}/>
      <Button Text="Sair" onClick={handleSignout}/>
    </C.Container>
  );
};

export default Home;
