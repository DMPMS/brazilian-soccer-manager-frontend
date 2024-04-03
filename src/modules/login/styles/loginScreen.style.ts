import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const ContainerLoginScreen = styled.div`
  background-color: #cfe7d7;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LogoImage = styled.img`
  width: 200px;
`;

export const TitleLogin = styled(Title)`
  color: #006397;
`;

export const ContainerLogin = styled.div`
  display: flex;
  justify-content: center;
  background-color: #edebeb;
  width: 100%;
  height: 70vh;
  max-width: 400px;
  border-radius: 20px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
`;

export const LimitedContainer = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
