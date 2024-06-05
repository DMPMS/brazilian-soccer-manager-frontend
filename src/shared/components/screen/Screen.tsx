import { Layout } from 'antd';

import { ListBreadcrumb } from '../breadcrumb/Breadcrumb';
import Sidebar from '../sidebar/Sidebar';
import { BreadcrumbStyled, ContentStyled, SIDEBAR_WIDTH } from './screen.style';

interface ScreenProps {
  children: React.ReactNode;
  listBreadcrumb?: ListBreadcrumb[];
}

const Screen = ({ children, listBreadcrumb }: ScreenProps) => {
  return (
    <Layout style={{ backgroundColor: '#052574', minHeight: '100vh' }}>
      <Sidebar />
      <Layout style={{ backgroundColor: '#052574', margin: `7px 7px 7px ${SIDEBAR_WIDTH}px` }}>
        <ContentStyled>
          {listBreadcrumb && <BreadcrumbStyled listBreadcrumb={listBreadcrumb} />}
          <br></br>
          {children}
        </ContentStyled>
      </Layout>
    </Layout>
  );
};

export default Screen;
