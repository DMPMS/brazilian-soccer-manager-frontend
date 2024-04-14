import styled from 'styled-components';

export const ContainerLoginScreen = styled.div`
  background-color: #052574;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Substituir depois
`;

export const LogoImage = styled.img`
  width: 70%;
  display: block;
`;

export const TitleLogin = styled.h3`
  color: #052574;
`;

export const ContainerLogin = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  max-width: 300px;

  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
`;
