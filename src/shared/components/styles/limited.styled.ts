import styled from 'styled-components';

interface LimitedContainerProps {
  width: number;
  margin?: string;
}

export const LimitedContainer = styled.div<LimitedContainerProps>`
  width: ${(props) => props.width}px;
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
`;

export const LimitedContainerCard = styled(LimitedContainer)`
  background-color: #ffffff;

  padding: 15px;
  border-radius: 10px;
`;
