import { Layout } from 'antd';

import { ListBreadcrumb } from '../breadcrumb/BreadcrumbProject';
import SidebarProject from '../sidebar/SidebarProject';
import { BreadcrumbProjectStyled, ContentStyled, SIDEBAR_WIDTH } from './screenProject.style';

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
