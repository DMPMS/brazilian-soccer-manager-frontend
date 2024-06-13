import { Layout } from 'antd';

import { SIDEBAR_WIDTH } from '../../constants/components';
import { ListBreadcrumb } from '../breadcrumb/BreadcrumbProject';
import SidebarProject from '../sidebar/SidebarProject';
import { BreadcrumbProjectStyled, ContentStyled } from './screenProject.style';

interface ScreenProps {
  children: React.ReactNode;
  listBreadcrumb?: ListBreadcrumb[];
}

const Screen = ({ children, listBreadcrumb }: ScreenProps) => {
  return (
    <Layout style={{ backgroundColor: '#052574', minHeight: '100vh' }}>
      <SidebarProject />
      <Layout style={{ backgroundColor: '#052574', margin: `7px 7px 7px ${SIDEBAR_WIDTH}px` }}>
        <ContentStyled>
          {listBreadcrumb && <BreadcrumbProjectStyled listBreadcrumb={listBreadcrumb} />}
          <br></br>
          {children}
        </ContentStyled>
      </Layout>
    </Layout>
  );
};

export default Screen;
