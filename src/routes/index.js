import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Busca from "../pages/Busca";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/busca" element={<Private Item={Busca} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/cadastro" element={<Cadastro />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
