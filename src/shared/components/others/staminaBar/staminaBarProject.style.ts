import styled from 'styled-components';

interface StaminaBarProps {
  width: number;
  backgroundColor: string;
}

export const StaminaContainer = styled.div`
  background-color: #dddddd;

  width: 100%;
  height: 10px;

  border-radius: 10px;
  overflow: hidden;
`;

export const StaminaBar = styled.div<StaminaBarProps>`
  background-color: ${(props) => props.backgroundColor};

  width: ${(props) => props.width}%;
  height: 100%;
`;
