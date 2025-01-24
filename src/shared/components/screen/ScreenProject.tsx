import { Layout } from 'antd';

import { ListBreadcrumb } from '../breadcrumb/BreadcrumbProject';
import SidebarProject from '../sidebar/SidebarProject';
import SidebarSavePlayProject from '../sidebar/SidebarSavePlayProject';
import { BreadcrumbProjectStyled, ContentStyled } from './screenProject.style';

interface ScreenProps {
  children: React.ReactNode;
  listBreadcrumb?: ListBreadcrumb[];
  isSavePlay?: boolean;
}

const Screen = ({ children, listBreadcrumb, isSavePlay }: ScreenProps) => {
  return (
    <Layout style={{ backgroundColor: '#052574' }}>
      <SidebarProject />
      {isSavePlay ? <SidebarSavePlayProject /> : <SidebarProject />}
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
