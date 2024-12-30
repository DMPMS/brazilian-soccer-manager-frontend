import { Form, Typography } from 'antd';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import InputProject from '../../../../shared/components/inputs/input/InputProject';
import InputPasswordProject from '../../../../shared/components/inputs/inputPassword/InputPasswordProject';
import { LimitedContainerCardProject } from '../../../../shared/components/styles/limited.styled';
import { useSignIn } from '../hooks/useSignIn';
import { LogoSignIn, TitleSignIn } from '../styles/signIn.style';

const { Text, Link } = Typography;

const SignIn = () => {
  const { loading, disabledButton, handleOnChangeInput, handleOnClickSignIn, handleOnClickSignUp } =
    useSignIn();

  return (
    <FlexProject justify="center" align="center" style={{ height: '100vh' }}>
      <LimitedContainerCardProject width={300} margin="10px">
        <FlexProject justify="center" align="center" vertical style={{ textAlign: 'center' }}>
          <LogoSignIn src="logo.png" />
          <TitleSignIn level={3}>Brazilian Soccer Manager</TitleSignIn>
        </FlexProject>

        <Form layout="vertical" onFinish={handleOnClickSignIn}>
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

          <ButtonProject
            loading={loading}
            disabled={disabledButton}
            type="primary"
            htmlType="submit"
            width="100%"
            margin="0px 0px 8px 0px"
          >
            Entrar
          </ButtonProject>

          <FlexProject justify="center" align="center">
            <Text>
              Novo por aqui? <Link onClick={handleOnClickSignUp}>Cadastre-se</Link> agora!
            </Text>
          </FlexProject>
        </Form>
      </LimitedContainerCardProject>
    </FlexProject>
  );
};

export default SignIn;
