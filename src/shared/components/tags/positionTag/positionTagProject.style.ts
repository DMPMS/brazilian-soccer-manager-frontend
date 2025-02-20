import { Tag } from 'antd';
import styled from 'styled-components';

export const TagStyled = styled(Tag)<{ primaryPosition?: boolean }>`
  width: 40px;
  text-align: center;
  position: relative;

  ${({ primaryPosition }) =>
    primaryPosition &&
    `
    &::before {
      content: '★'; 
      position: absolute;
      top: -6.0px;
      left: 0px;
      font-size: 10px;
      color: gold;
    }
  `}
`;
