import {
  AppstoreOutlined,
  HomeOutlined,
  LogoutOutlined,
  PartitionOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CompetitionglobalRoutesEnum } from '../../../modules/competitionglobal/routes';
import { ManagerglobalRoutesEnum } from '../../../modules/managerglobal/routes';
import { PlayerglobalRoutesEnum } from '../../../modules/playerglobal/routes';
import { TeamglobalRoutesEnum } from '../../../modules/teamglobal/routes';
import { logout } from '../../functions/connection/auth';
import { LogoSidebar } from './sidebarProject.style';
import { SidebarItem } from './types/sidebarItem';

const { Sider } = Layout;

const SidebarProject = () => {
  const navigate = useNavigate();

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
      label: 'Página inicial',
      icon: <HomeOutlined />,
    },
    {
      key: 'playersglobal',
      label: 'Jogadores',
      icon: <UnorderedListOutlined />,
      children: [
        {
          key: 'playersglobal_view',
          label: 'Jogadores',
          onClick: () => navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL),
        },
        {
          key: 'playersglobal_insert',
          label: 'Inserir jogador',
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
          label: 'Treinadores',
          onClick: () => navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL),
        },
        {
          key: 'managersglobal_insert',
          label: 'Inserir treinador',
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
          label: 'Times',
          onClick: () => navigate(TeamglobalRoutesEnum.TEAMGLOBAL),
        },
        {
          key: 'teamsglobal_insert',
          label: 'Inserir time',
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
          label: 'Competições',
          onClick: () => navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL),
        },
        {
          key: 'competitionsglobal_insert',
          label: 'Inserir competição',
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

      <Sider
        theme="light"
        collapsed={true}
        style={{
          backgroundColor: '#f0f0f0',
          margin: 7,
          borderRadius: 10,
          boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
          overflow: 'auto',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <LogoSidebar src="../../../../public/logo.png"></LogoSidebar>
        <Menu
          theme="light"
          items={items}
          style={{ backgroundColor: '#f0f0f0', borderRadius: 10, border: 'none' }}
        />
      </Sider>
    </>
  );
};

export default SidebarProject;
