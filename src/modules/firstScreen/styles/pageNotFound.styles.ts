import styled from 'styled-components';

export const ContainerPageNotFound = styled.div`
  background-color: #052574;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Substituir depois
`;

export const DeflatedBallImage = styled.img`
  width: 70%;
  display: block;
`;

export const TitleError = styled.h3`
  color: #052574;
`;

export const DescriptionError = styled.p``;

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
