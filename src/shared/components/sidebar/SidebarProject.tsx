import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CompetitionglobalRoutesEnum } from '../../../modules/admin/competitionglobal/routes';
import { HomeRoutesEnum } from '../../../modules/admin/home/routes';
import { ManagerglobalRoutesEnum } from '../../../modules/admin/managerglobal/routes';
import { PlayerglobalRoutesEnum } from '../../../modules/admin/playerglobal/routes';
import { TeamglobalRoutesEnum } from '../../../modules/admin/teamglobal/routes';
import { logout } from '../../functions/connection/auth';
import ModalLogoutProject from '../modals/logout/ModalLogoutProject';
import CompetitionIconSVGProject from '../svg/CompetitionIconSVGProject';
import HomeIconSVGProject from '../svg/HomeIconSVGProject';
import LogoutIconSVGProject from '../svg/LogoutIconSVGProject';
import ManagerIconSVGProject from '../svg/ManagerIconSVGProject';
import PlayerIconSVGProject from '../svg/PlayeIconSVGProject';
import TeamIconSVGProject from '../svg/TeamIconSVGProject';
import { LogoSidebar } from './sidebarProject.style';
import { SidebarItem } from './types/SidebarItem';

const { Sider } = Layout;

const SidebarProject = () => {
  const navigate = useNavigate();

  const [openModalLogout, setOpenModalLogout] = useState(false);

  const handleOnClickLogout = () => {
    setOpenModalLogout(true);
  };

  const handleOnCancelLogout = () => {
    setOpenModalLogout(false);
  };

  const handleOnConfirmLogout = () => {
    logout(navigate);
  };

  const items: SidebarItem[] = [
    {
      key: 'home',
      label: 'Página inicial',
      icon: <HomeIconSVGProject />,
      onClick: () => navigate(HomeRoutesEnum.HOME),
    },
    {
      key: 'playersglobal',
      label: 'Jogadores',
      icon: <PlayerIconSVGProject />,
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
      icon: <ManagerIconSVGProject />,
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
      icon: <TeamIconSVGProject />,
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
      icon: <CompetitionIconSVGProject />,
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
      icon: <LogoutIconSVGProject />,
      onClick: () => handleOnClickLogout(),
    },
  ];

  return (
    <>
      <ModalLogoutProject
        open={openModalLogout}
        onOk={handleOnConfirmLogout}
        onCancel={handleOnCancelLogout}
      />

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
        <LogoSidebar src="/logo.png"></LogoSidebar>
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
