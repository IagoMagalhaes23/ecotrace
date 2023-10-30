import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userGitHub: ''
  });

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  const signin = (email, password, user) => {
    fetch('/login') // Substitua pela URL da sua API
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Erro ao buscar os dados:', error));
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password && hasUser[0].user === user) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password, user });
        return;
      } else {
        return "E-mail, senha ou usuário incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signup = (email, password, user) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
    
    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password, user }];
    } else {
      newUser = [{ email, password, user }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));
    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
