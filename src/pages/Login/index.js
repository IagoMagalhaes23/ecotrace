import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email | !senha | !user) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha, user);

    if (res) {
      setError(res);
      return;
    }

    navigate("/busca");
  };

  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
});

// Using useEffect for single rendering
useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/data").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setdata({
                name: data.Name,
                age: data.Age,
                date: data.Date,
                programming: data.programming,
            });
        })
    );
}, []);

  return (
    <C.Container>
      <C.Content>
        <C.Label>Login</C.Label>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <Input
          type="text"
          placeholder="Digite seu nome de usuário no GitHub"
          value={user}
          onChange={(e) => [setUser(e.target.value), setError("")]}
        />
        {<C.labelError>{error}</C.labelError>}
        {<Button Text="Entrar" onClick={handleLogin} />}
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            {<Link to="/cadastro">&nbsp;Registre-se</Link>}
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Login;