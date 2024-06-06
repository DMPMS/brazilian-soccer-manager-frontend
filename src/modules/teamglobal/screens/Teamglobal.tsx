import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import FlexProject from '../../../shared/components/flex/FlexProject';
import Image from '../../../shared/components/image/Image';
import Screen from '../../../shared/components/screen/Screen';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import CountrySVG from '../../../shared/components/svg/CountrySVG';
import Table from '../../../shared/components/table/Table';
import { TeamglobalType } from '../../../shared/types/TeamglobalType';
import { useTeamglobal } from '../hooks/useTeamglobal';
import { TeamglobalRoutesEnum } from '../routes';

const Teamglobal = () => {
  const {
    teamsglobal,
    handleOnSearch,
    handleOnEdit,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete,
  } = useTeamglobal();

  const navigate = useNavigate();

  const handleOnClickInsert = () => {
    navigate(TeamglobalRoutesEnum.TEAMGLOBAL_INSERT);
  };

  const columns: ColumnsType<TeamglobalType> = useMemo(
    () => [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (_, target) => (
          <FlexProject justify="flex-start" align="center">
            <Image src={target.srcImage} width={20} height={20} margin="0px 5px 0px 0px" />
            <text>{target.name}</text>
          </FlexProject>
        ),
      },
      {
        title: 'Treinador',
        dataIndex: 'managerglobal',
        key: 'managerglobal',
        render: (_, target) => target.managerglobal?.name,
      },
      {
        title: 'País',
        dataIndex: 'country',
        key: 'country',
        render: (_, target) => (
          <FlexProject justify="flex-start" align="center">
            <CountrySVG
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
        title: 'Ações',
        dataIndex: '',
        key: 'x',
        render: (_, target) => (
          <Space>
            <Button onClick={() => handleOnEdit(target.id)} icon={<EditOutlined />}></Button>
            {target.competitionsglobalTeamglobal &&
              target.competitionsglobalTeamglobal?.length === 0 && (
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
          name: 'Times',
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
        <p>Tem certeza que deseja excluir esse time?</p>
      </Modal>
      <FlexProject justify="space-between" margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar time" onSearch={handleOnSearch} enterButton />
        </LimitedContainer>

        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickInsert}>
            Inserir
          </Button>
        </LimitedContainer>
      </FlexProject>

      <Table columns={columns} dataSource={teamsglobal} />
    </Screen>
  );
};

export default Teamglobal;
