import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageProject from '../../../../shared/components/image/ImageProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import { LimitedContainerProject } from '../../../../shared/components/styles/limited.styled';
import CountrySVGProject from '../../../../shared/components/svg/CountrySVGProject';
import TableProject from '../../../../shared/components/table/TableProject';
import PositionTagProject from '../../../../shared/components/tags/positionTag/PositionTagProject';
import { PLAYERGLOBAL_PRIMARY_POSITION_RATING } from '../../../../shared/constants/others';
import { PlayerglobalType } from '../../../../shared/types/PlayerglobalType';
import { HomeRoutesEnum } from '../../home/routes';
import { usePlayerglobal } from '../hooks/usePlayerglobal';
import { PlayerglobalRoutesEnum } from '../routes';

const Playerglobal = () => {
  const {
    playersglobal,
    handleOnSearch,
    handleOnEdit,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete,
  } = usePlayerglobal();

  const navigate = useNavigate();

  const handleOnClickInsert = () => {
    navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL_INSERT);
  };

  const columns: ColumnsType<PlayerglobalType> = useMemo(
    () => [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Geral',
        dataIndex: 'overall',
        key: 'overall',
      },
      {
        title: 'Posições',
        dataIndex: 'positions',
        key: 'positions',
        render: (_, target) => (
          <>
            {target.playersglobalPosition
              ?.filter(
                (playerglobalPosition) =>
                  playerglobalPosition.rating === PLAYERGLOBAL_PRIMARY_POSITION_RATING,
              )
              .map((playerglobalPosition, index) => (
                <PositionTagProject area={playerglobalPosition.position?.area} key={index}>
                  {playerglobalPosition.position?.abbreviation}
                </PositionTagProject>
              ))}
          </>
        ),
      },
      {
        title: 'Nacionalidade',
        dataIndex: 'country',
        key: 'country',
        render: (_, target) => (
          <FlexProject justify="flex-start" align="center">
            <CountrySVGProject
              name={target.country?.name}
              width={20}
              height={20}
              style={{ margin: '0px 5px 0px 0px' }}
            />
            <text>{target.country?.name}</text>
          </FlexProject>
        ),
      },
      {
        title: 'Time',
        dataIndex: 'teamglobal',
        key: 'teamglobal',
        render: (_, target) =>
          target.teamglobal && (
            <FlexProject justify="flex-start" align="center">
              <ImageProject
                src={target.teamglobal.srcImage}
                width={20}
                height={20}
                margin="0px 5px 0px 0px"
              />
              <text>{target.teamglobal.name}</text>
            </FlexProject>
          ),
      },
      {
        title: 'Ações',
        dataIndex: '',
        key: 'x',
        render: (_, target) => (
          <Space>
            <ButtonProject
              onClick={() => handleOnEdit(target.id)}
              icon={<EditOutlined />}
            ></ButtonProject>
            {!target.teamglobal && (
              <ButtonProject
                type="primary"
                danger
                onClick={() => handleOnOpenModalDelete(target.id)}
                icon={<DeleteOutlined />}
              ></ButtonProject>
            )}
          </Space>
        ),
      },
    ],
    [],
  );

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Página inicial',
          navigateTo: HomeRoutesEnum.HOME,
        },
        {
          name: 'Jogadores',
        },
      ]}
    >
      <Modal
        title="Atenção"
        open={openModalDelete}
        onOk={handleOnDelete}
        onCancel={handleOnCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir esse jogador?</p>
      </Modal>
      <FlexProject justify="space-between" margin="0px 0px 16px 0px">
        <LimitedContainerProject width={240}>
          <Search placeholder="Buscar jogador" onSearch={handleOnSearch} enterButton />
        </LimitedContainerProject>

        <LimitedContainerProject width={120}>
          <ButtonProject type="primary" onClick={handleOnClickInsert}>
            Inserir
          </ButtonProject>
        </LimitedContainerProject>
      </FlexProject>
      <TableProject columns={columns} dataSource={playersglobal} />
    </Screen>
  );
};

export default Playerglobal;
