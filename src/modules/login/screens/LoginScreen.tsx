import axios from 'axios';
import { useState } from 'react';

import Button from '../../../shared/buttons/button/Button';
import Input from '../../../shared/inputs/input/Input';
import {
  ContainerLogin,
  ContainerLoginScreen,
  LogoImage,
  TitleLogin,
} from '../styles/loginScreen.style';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:8080/auth',
      data: {
        email: email,
        password: password,
      },
    })
      .then((result) => {
        alert(`Fez login ${result.data.accessToken}`);
        return result.data;
      })
      .catch(() => {
        alert('Usuário ou senha inválido');
      });
  };

  return (
    <ContainerLoginScreen>
      <ContainerLogin>
        <LogoImage src="./logo.png" />
        <TitleLogin>Brazilian Soccer Manager</TitleLogin>
        <Input title="E-mail" margin="16px 0px 0px 0px" onChange={handleEmail} value={email} />
        <Input
          type="password"
          title="Senha"
          margin="16px 0px 0px"
          onChange={handlePassword}
          value={password}
        />
        <Button type="primary" margin="32px 0px 0px 0px" onClick={handleLogin}>
          Entrar
        </Button>
      </ContainerLogin>
    </ContainerLoginScreen>
  );
};

export default LoginScreen;
