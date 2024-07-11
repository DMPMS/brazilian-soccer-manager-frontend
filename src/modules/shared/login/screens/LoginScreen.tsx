import { Form, Typography } from 'antd';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import InputProject from '../../../../shared/components/inputs/input/InputProject';
import InputPasswordProject from '../../../../shared/components/inputs/inputPassword/InputPasswordProject';
import { LimitedContainerCardProject } from '../../../../shared/components/styles/limited.styled';
import { useLogin } from '../hooks/useLogin';
import { LogoLogin, TitleLogin } from '../styles/loginScreen.style';

const { Text, Link } = Typography;

const LoginScreen = () => {
  const {
    loading,
    disabledButton,
    handleOnChangeInput,
    handleOnClickLogin,
    handleOnClickNewAccount,
  } = useLogin();

  return (
    <FlexProject justify="center" align="center" style={{ height: '100vh' }}>
      <LimitedContainerCardProject width={300} margin="10px">
        <FlexProject justify="center" align="center" vertical style={{ textAlign: 'center' }}>
          <LogoLogin src="logo.png" />
          <TitleLogin level={3}>Brazilian Soccer Manager</TitleLogin>
        </FlexProject>

        <Form layout="vertical">
          <Form.Item
            name="email"
            required
            rules={[
              { required: true, message: 'Insira seu e-mail.' },
              { type: 'email', message: 'Insira um e-mail válido.' },
            ]}
          >
            <InputProject
              placeholder="E-mail"
              onChange={(event) => handleOnChangeInput(event, 'email')}
            />
          </Form.Item>

          <Form.Item
            name="password"
            required
            rules={[{ required: true, message: 'Insira sua senha.' }]}
          >
            <InputPasswordProject
              placeholder="********"
              onChange={(event) => handleOnChangeInput(event, 'password')}
            />
          </Form.Item>
        </Form>

        <ButtonProject
          loading={loading}
          disabled={disabledButton}
          type="primary"
          onClick={handleOnClickLogin}
          width="100%"
          margin="0px 0px 8px 0px"
        >
          Entrar
        </ButtonProject>

        <FlexProject justify="center" align="center">
          <Text>
            Novo por aqui? <Link onClick={handleOnClickNewAccount}>Cadastre-se</Link> agora!
          </Text>
        </FlexProject>
      </LimitedContainerCardProject>
    </FlexProject>
  );
};

export default LoginScreen;
