import {
  AppstoreOutlined,
  HomeOutlined,
  LogoutOutlined,
  PartitionOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Menu as SidebarAntd, MenuProps as SidebarProps, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CompetitionglobalRoutesEnum } from '../../../modules/competitionglobal/routes';
import { ManagerglobalRoutesEnum } from '../../../modules/managerglobal/routes';
import { PlayerglobalRoutesEnum } from '../../../modules/playerglobal/routes';
import { TeamglobalRoutesEnum } from '../../../modules/teamglobal/routes';
import { logout } from '../../functions/connection/auth';
import { ContainerLogoName, LogoSidebar, NameCompany } from './sidebar.style';
import { ContainerSidebar } from './sidebar.style';
type SidebarItem = Required<SidebarProps>['items'][number];

const Sidebar = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const items: SidebarItem[] = [
    {
      key: 'home',
      label: 'Página Inicial',
      icon: <HomeOutlined />,
    },
    {
      key: 'playersglobal',
      label: 'Jogadores',
      icon: <UnorderedListOutlined />,
      children: [
        {
          key: 'playersglobal_view',
          label: 'Visualizar',
          onClick: () => navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL),
        },
        {
          key: 'playersglobal_insert',
          label: 'Inserir',
          onClick: () => navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL_INSERT),
        },
      ],
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
    {
      key: 'teamsglobal',
      label: 'Times',
      icon: <PartitionOutlined />,
      children: [
        {
          key: 'teamsglobal_view',
          label: 'Visualizar',
          onClick: () => navigate(TeamglobalRoutesEnum.TEAMGLOBAL),
        },
        {
          key: 'teamsglobal_insert',
          label: 'Inserir',
          onClick: () => navigate(TeamglobalRoutesEnum.TEAMGLOBAL_INSERT),
        },
      ],
    },
    {
      key: 'competitionsglobal',
      label: 'Competições',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: 'competitionsglobal_view',
          label: 'Visualizar',
          onClick: () => navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL),
        },
        {
          key: 'competitionsglobal_insert',
          label: 'Inserir',
          onClick: () => navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL_INSERT),
        },
      ],
    },
    {
      key: 'logout',
      label: 'Sair',
      icon: <LogoutOutlined />,
      onClick: () => showModal(),
    },
  ];

  const onClick: SidebarProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Modal
        title="Atenção"
        open={open}
        onOk={() => logout(navigate)}
        onCancel={hideModal}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja sair?</p>
      </Modal>
      <ContainerSidebar>
        <ContainerLogoName>
          <LogoSidebar src="../../../../public/logo.png" />

          <NameCompany>Brazilian Soccer Manager</NameCompany>
        </ContainerLogoName>
        <SidebarAntd
          onClick={onClick}
          style={{ borderRight: 'none', backgroundColor: '#eff2f5' }}
          selectedKeys={[current]}
          mode="vertical"
          items={items}
        />
      </ContainerSidebar>
    </>
  );
};

export default Sidebar;
