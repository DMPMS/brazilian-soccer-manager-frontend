import { Divider } from 'antd';

import Breadcrumb, { ListBreadcrumb } from '../breadcrumb/Breadcrumb';
import Sidebar from '../sidebar/Sidebar';
import { ScreenContainer } from './screen.style';

interface ScreenProps {
  children: React.ReactNode;
  listBreadcrumb?: ListBreadcrumb[];
}

const Screen = ({ children, listBreadcrumb }: ScreenProps) => {
  return (
    <ScreenContainer>
      <Sidebar />
      {listBreadcrumb && (
        <>
          <Breadcrumb listBreadcrumb={listBreadcrumb} />
          <Divider />
        </>
      )}
      {children}
    </ScreenContainer>
  );
};

export default Screen;
