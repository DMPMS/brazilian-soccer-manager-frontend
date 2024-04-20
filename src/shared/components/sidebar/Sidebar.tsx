import { HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu as SidebarAntd, MenuProps as SidebarProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ManagerglobalRoutesEnum } from '../../../modules/managerglobal/routes';
import { ContainerLogoName, LogoSidebar, NameCompany } from './sidebar.style';
import { ContainerSidebar } from './sidebar.style';

type SidebarItem = Required<SidebarProps>['items'][number];

const Sidebar = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');

  const items: SidebarItem[] = [
    {
      key: 'home',
      label: 'Página Inicial',
      icon: <HomeOutlined />,
    },
    {
      key: 'managersglobal',
      label: 'Treinadores',
      icon: <TeamOutlined />,
      children: [
        {
          key: 'managersglobal_view',
          label: 'Visualizar',
          onClick: () => navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL),
        },
        {
          key: 'managersglobal_insert',
          label: 'Inserir',
          onClick: () => navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL_INSERT),
        },
      ],
    },
  ];

  const onClick: SidebarProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <ContainerSidebar>
      <ContainerLogoName>
        <LogoSidebar src="./logo.png" />
        <NameCompany>BSM</NameCompany>
      </ContainerLogoName>
      <SidebarAntd
        theme="dark"
        onClick={onClick}
        style={{ width: 240 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </ContainerSidebar>
  );
};

export default Sidebar;
