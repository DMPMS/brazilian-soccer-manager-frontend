import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Image from '../../../shared/components/image/Image';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexAlignCenter,
  DisplayFlexDirectionRow,
  DisplayFlexJustifyBetween,
} from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import CountrySVG from '../../../shared/components/svg/CountrySVG';
import Table from '../../../shared/components/table/Table';
import PositionTag from '../../../shared/components/tags/positionTag/PositionTag';
import { PlayerglobalType } from '../../../shared/types/PlayerglobalType';
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
              ?.filter((playerglobalPosition) => playerglobalPosition.rating === 1)
              .map((playerglobalPosition, index) => (
                <PositionTag area={playerglobalPosition.position?.area} key={index}>
                  {playerglobalPosition.position?.abbreviation}
                </PositionTag>
              ))}
          </>
        ),
      },
      {
        title: 'Nacionalidade',
        dataIndex: 'country',
        key: 'country',
        render: (_, target) => (
          <DisplayFlexDirectionRow>
            <DisplayFlexAlignCenter margin="0px 5px 0px 0px">
              <CountrySVG name={target.country?.name} width={20} height={20} />
            </DisplayFlexAlignCenter>
            <text>{target.country?.name}</text>
          </DisplayFlexDirectionRow>
        ),
      },
      {
        title: 'Time',
        dataIndex: 'teamglobal',
        key: 'teamglobal',
        render: (_, target) =>
          target.teamglobal && (
            <DisplayFlexDirectionRow>
              <DisplayFlexAlignCenter margin="0px 5px 0px 0px">
                <Image src={target.teamglobal.srcImage} width={20} height={20} />
              </DisplayFlexAlignCenter>
              <text>{target.teamglobal.name}</text>
            </DisplayFlexDirectionRow>
          ),
      },
      {
        title: 'Ações',
        dataIndex: '',
        key: 'x',
        render: (_, target) => (
          <Space>
            <Button onClick={() => handleOnEdit(target.id)} icon={<EditOutlined />}></Button>
            {!target.teamglobal && (
              <Button
                type="primary"
                danger
                onClick={() => handleOnOpenModalDelete(target.id)}
                icon={<DeleteOutlined />}
              ></Button>
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
      <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar jogador" onSearch={handleOnSearch} enterButton />
        </LimitedContainer>

        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickInsert}>
            Inserir
          </Button>
        </LimitedContainer>
      </DisplayFlexJustifyBetween>
      <Table columns={columns} dataSource={playersglobal} />
    </Screen>
  );
};

export default Playerglobal;
