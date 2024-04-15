import { useState } from 'react';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import { useRequests } from '../../../shared/hooks/useRequests';
import {
  ContainerLogin,
  ContainerLoginScreen,
  LogoImage,
  TitleLogin,
} from '../styles/loginScreen.style';
import { UserType } from '../types/UserType';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { postRequest, loading } = useRequests();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    postRequest<UserType>('http://localhost:8080/auth', {
      email: email,
      password: password,
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
        <Button loading={loading} type="primary" margin="32px 0px 0px 0px" onClick={handleLogin}>
          Entrar
        </Button>
      </ContainerLogin>
    </ContainerLoginScreen>
  );
};

export default LoginScreen;
