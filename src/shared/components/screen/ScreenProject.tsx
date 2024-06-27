import { Layout } from 'antd';

import { ListBreadcrumb } from '../breadcrumb/BreadcrumbProject';
import SidebarProject from '../sidebar/SidebarProject';
import { BreadcrumbProjectStyled, ContentStyled } from './screenProject.style';

interface ScreenProps {
  children: React.ReactNode;
  listBreadcrumb?: ListBreadcrumb[];
}

const Screen = ({ children, listBreadcrumb }: ScreenProps) => {
  return (
    <Layout style={{ backgroundColor: '#052574' }}>
      <SidebarProject />
      <Layout style={{ backgroundColor: '#052574' }}>
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
