import { Layout, Menu, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SaveRoutesEnum } from '../../../modules/user/save/routes';
import { useSavePlay } from '../../../modules/user/savePlay/hooks/useSavePlay';
import { SavePlayRoutesEnum } from '../../../modules/user/savePlay/routes';
import { useSavePlayReducer } from '../../../store/reducers/savePlayReducer/useSavePlayReducer';
import HomeIconSVGProject from '../svg/HomeIconSVGProject';
import LogoutIconSVGProject from '../svg/LogoutIconSVGProject';
import PlayerIconSVGProject from '../svg/PlayeIconSVGProject';
import { LogoSidebar } from './sidebarProject.style';
import { SidebarItem } from './types/SidebarItem';

const { Sider } = Layout;

const SidebarSavePlayProject = () => {
  const { savePlay } = useSavePlay();
  const { setSavePlay } = useSavePlayReducer();

  const navigate = useNavigate();

  const [openModalExit, setOpenModalExit] = useState(false);

  const handleOnClickExit = () => {
    setOpenModalExit(true);
  };

  const handleOnCancelExit = () => {
    setOpenModalExit(false);
  };

  const handleOnConfirmExit = () => {
    setSavePlay(undefined);
    navigate(SaveRoutesEnum.SAVE);
  };

  const items: SidebarItem[] = [
    {
      key: 'savePlayHome',
      label: 'Página inicial',
      icon: <HomeIconSVGProject />,
      onClick: () => navigate(SavePlayRoutesEnum.SAVE_PLAY_HOME),
    },
    {
      key: 'savePlaySquad',
      label: 'Elenco',
      icon: <PlayerIconSVGProject />,
      onClick: () => navigate(SavePlayRoutesEnum.SAVE_PLAY_SQUAD),
    },
    {
      key: 'exit',
      label: 'Sair',
      icon: <LogoutIconSVGProject />,
      onClick: () => handleOnClickExit(),
    },
  ];

  return (
    <>
      <Modal
        title="Atenção"
        open={openModalExit}
        onOk={handleOnConfirmExit}
        onCancel={handleOnCancelExit}
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
        <LogoSidebar src={savePlay?.controllerManagersave?.teamsave?.srcImage}></LogoSidebar>

        <Menu
          theme="light"
          items={items}
          style={{ backgroundColor: '#f0f0f0', borderRadius: 10, border: 'none' }}
        />
      </Sider>
    </>
  );
};

export default SidebarSavePlayProject;
