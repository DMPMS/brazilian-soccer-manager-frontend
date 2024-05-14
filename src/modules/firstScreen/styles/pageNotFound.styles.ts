import { Typography } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;

export const ContainerPageNotFound = styled.div`
  background-color: #052574;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Substituir depois
`;

export const DeflatedBallImage = styled.img`
  width: 100%;
  display: block;
`;

export const TitleError = styled(Title)`
  color: #052574;
`;

export const DescriptionError = styled(Text)``;

export const ContainerError = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: justify;

  max-width: 300px;

  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
`;
