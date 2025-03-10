import { Button } from 'antd';
import styled from 'styled-components';

interface ButtonStyledProps {
  margin?: string;
  width?: string;
}

export const ButtonStyled = styled(Button)<ButtonStyledProps>`
  ${(props) => (props.width ? `width: ${props.width}` : '')};
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
`;
