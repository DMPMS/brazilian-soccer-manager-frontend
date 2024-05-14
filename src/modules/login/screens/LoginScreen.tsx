import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import { useRequests } from '../../../shared/hooks/useRequests';
import {
  ContainerLogin,
  ContainerLoginScreen,
  LogoImage,
  TitleLogin,
} from '../styles/loginScreen.style';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authRequest, loading } = useRequests();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    authRequest(navigate, {
      email: email,
      password: password,
    });
  };

  return (
    <ContainerLoginScreen>
      <ContainerLogin>
        <LogoImage src="logo.png" />
        <TitleLogin level={3}>Brazilian Soccer Manager</TitleLogin>
        <Input title="E-mail" margin="0px 0px 16px 0px" onChange={handleEmail} value={email} />
        <Input
          type="password"
          title="Senha"
          margin="0px 0px 32px 0px"
          onChange={handlePassword}
          value={password}
        />
        <Button loading={loading} type="primary" onClick={handleLogin}>
          Entrar
        </Button>
      </ContainerLogin>
    </ContainerLoginScreen>
  );
};

export default LoginScreen;
