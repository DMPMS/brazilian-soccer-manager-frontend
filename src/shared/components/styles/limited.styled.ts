import styled from 'styled-components';

interface LimitedContainerProjectProjectProps {
  width: number;
  margin?: string;
}

export const LimitedContainerProject = styled.div<LimitedContainerProjectProjectProps>`
  width: ${(props) => props.width}px;
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
`;

export const LimitedContainerCardProject = styled(LimitedContainerProject)`
  background-color: #ffffff;

  padding: 15px;
  border-radius: 10px;
`;
