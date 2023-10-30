import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
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
    // setFormData({
    //   email: email,
    //   password: password,
    //   username: user
    // });
    // axios.post('/login', formData) // Substitua pela URL da sua API Flask
    //   .then(response => {
    //     console.log('Resposta da API:', response.data);
    //     console.log('Código de status:', response.status); // Aqui você pode ler o código de status
    //     if(response.status === 200){
    //           const token = Math.random().toString(36).substring(2);
    //           localStorage.setItem("user_token", JSON.stringify({ email, token }));
    //           setUser({ email, password, user });
    //           return;
    //     }else{
    //       return "E-mail, senha ou usuário incorretos";
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Erro ao enviar dados:', error);
    //     if (error.response) {
    //       console.log('Código de status de erro:', error.response.status); // Aqui você pode ler o código de status de erro
    //     }
    //   });
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
      setFormData({
        email: email,
        password: password,
        username: user
      });
      axios.post('/cadastros', formData)
      .then(response => {
        console.log('Resposta da API:', response.data);
        const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
    
        const hasUser = usersStorage?.filter((user) => user.email === email);

        let newUser;

        if (usersStorage) {
          newUser = [...usersStorage, { email, password, user }];
        } else {
          newUser = [{ email, password, user }];
        }

        localStorage.setItem("users_bd", JSON.stringify(newUser));

        return;
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
    

    

    // if (hasUser?.length) {
    //   return "Já tem uma conta com esse E-mail";
    // }

    
    // return;
  };


  // const signin = (email, password, user) => {
  //   const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

  //   const hasUser = usersStorage?.filter((user) => user.email === email);

  //   if (hasUser?.length) {
  //     if (hasUser[0].email === email && hasUser[0].password === password && hasUser[0].user === user) {
  //       const token = Math.random().toString(36).substring(2);
  //       localStorage.setItem("user_token", JSON.stringify({ email, token }));
  //       setUser({ email, password, user });
  //       return;
  //     } else {
  //       return "E-mail, senha ou usuário incorretos";
  //     }
  //   } else {
  //     return "Usuário não cadastrado";
  //   }
  // };

  // const signup = (email, password, user) => {
  //   const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
    
  //   const hasUser = usersStorage?.filter((user) => user.email === email);

  //   if (hasUser?.length) {
  //     return "Já tem uma conta com esse E-mail";
  //   }

  //   let newUser;

  //   if (usersStorage) {
  //     newUser = [...usersStorage, { email, password, user }];
  //   } else {
  //     newUser = [{ email, password, user }];
  //   }

  //   localStorage.setItem("users_bd", JSON.stringify(newUser));
  //   return;
  // };

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
