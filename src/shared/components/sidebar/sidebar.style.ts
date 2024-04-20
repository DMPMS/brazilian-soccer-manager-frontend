import styled from 'styled-components';

export const ContainerSidebar = styled.div`
  background-color: #eff2f5;
  font-family: Arial, sans-serif;

  max-width: 240px;

  position: fixed;
  top: 0;
  bottom: 0;

  margin: 10px 5px 10px 10px;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
`;

export const ContainerLogoName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const LogoSidebar = styled.img`
  width: 40%;
  display: block;
  padding: 5px;
`;

export const NameCompany = styled.text`
  color: #052574;
  padding: 5px;
`;
