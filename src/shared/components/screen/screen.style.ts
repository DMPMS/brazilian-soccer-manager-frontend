import styled from 'styled-components';

export const ScreenContainer = styled.div`
  background-color: #eff2f5;

  margin: 10px 10px 10px auto;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);

  width: calc(100% - 265px - 45px); // 100% - sidebar - margin and paddin screen

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;

  overflow: auto;
`;
