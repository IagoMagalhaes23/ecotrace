import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Search from "../../components/Search";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";

const Repositorios = () => {
  const { signout, user } = useAuth();
  const [usuario, setUsuario] = useState({
    nome: "",
    foto: "",
    link: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/pesquisar/"+user).then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setUsuario({
                nome: data.login,
                foto: data.avatar_url,
                link: data.html_url
            });
        })
    );
}, []);

console.log(usuario);

  return (
    <C.Container>
      <Navbar  user={user.user} />
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

export default Repositorios;
