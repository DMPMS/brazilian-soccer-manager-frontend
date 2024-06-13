import { Layout } from 'antd';
import styled from 'styled-components';

import { SIDEBAR_WIDTH } from '../../constants/components';
import BreadcrumbProject from '../breadcrumb/BreadcrumbProject';

const { Content } = Layout;

export const BreadcrumbProjectStyled = styled(BreadcrumbProject)`
  margin: 0px 0px 5px 0px;
`;

export const ContentStyled = styled(Content)`
  background-color: #f0f0f0;

  margin: 7px 7px 7px 94px;

  width: calc(100% - ${SIDEBAR_WIDTH}px - 7px);

  padding: 15px;
  border-radius: 10px;

  overflow: auto;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;
