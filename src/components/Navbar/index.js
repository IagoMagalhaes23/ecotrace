import React, { useEffect, useState } from 'react';
import './styles.css';

const Navbar = ({ user }) => {
  const [usuario, setUsuario] = useState({
    nome: "",
    foto: "",
    link: ""
  });

  useEffect(() => {
    fetch("https://api.github.com/users/"+user).then((res) =>
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

  return (
      <div className="topbar">
        <div className="topbar-item">
          <img src={usuario.foto} width="50vw"/>
        </div>
        <div className="topbar-item">
          <a href='/usuario'>{usuario.nome}</a>
        </div>
      </div>
  );
};

export default Navbar;