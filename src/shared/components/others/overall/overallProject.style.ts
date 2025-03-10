import styled from 'styled-components';

interface TextStyledProps {
  color: string;
  margin?: string;
}

export const TextStyled = styled.text<TextStyledProps>`
  font-weight: 700;
  color: ${(props) => props.color};

  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
`;
