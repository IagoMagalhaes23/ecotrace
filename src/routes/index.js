import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Busca from "../pages/Busca";
import Cadastro from "../pages/Cadastro";
import Historico from "../pages/Historico";
import Login from "../pages/Login";
import Repositorios from "../pages/Repositorios";
import Usuario from "../pages/Usuario";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
        <Route exact path="/historico" element={<Private Item={Historico} />} />
          <Route path="/" element={<Login />} />
          <Route exact path="/repositorios" element={<Private Item={Repositorios} />} />
          <Route path="/" element={<Login />} />
          <Route exact path="/busca" element={<Private Item={Busca} />} />
          <Route path="/" element={<Login />} />
          <Route exact path="/cadastro" element={<Cadastro />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;