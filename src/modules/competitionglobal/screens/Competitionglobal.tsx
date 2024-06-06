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
import { CompetitionglobalType } from '../../../shared/types/CompetitionglobalType';
import { useCompetitionglobal } from '../hooks/useCompetitionglobal';
import { CompetitionglobalRoutesEnum } from '../routes';

const Competitionglobal = () => {
  const {
    competitionsglobal,
    handleOnSearch,
    handleOnEdit,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete,
  } = useCompetitionglobal();

  const navigate = useNavigate();

  const handleOnClickInsert = () => {
    navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL_INSERT);
  };

  const columns: ColumnsType<CompetitionglobalType> = useMemo(
    () => [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (_, target) => (
          <FlexProject justify="flex-start" align="center">
            <Image src={target.srcImage} width={20} height={20} margin="0px 5px 0px 0px" />
            <text>
              {target.name} {target.season}
            </text>
          </FlexProject>
        ),
      },
      {
        title: 'Tipo',
        dataIndex: 'type',
        key: 'type',
        render: (_, target) => {
          if (target.rule?.competitionType === 1) {
            return 'Liga';
          } else if (target.rule?.competitionType === 2) {
            return 'Copa';
          } else {
            return '';
          }
        },
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
            <Button
              type="primary"
              danger
              onClick={() => handleOnOpenModalDelete(target.id)}
              icon={<DeleteOutlined />}
            ></Button>
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
          name: 'Competições',
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
        <p>Tem certeza que deseja excluir essa competição?</p>
      </Modal>
      <FlexProject justify="space-between" margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar competição" onSearch={handleOnSearch} enterButton />
        </LimitedContainer>

        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickInsert}>
            Inserir
          </Button>
        </LimitedContainer>
      </FlexProject>
      <Table columns={columns} dataSource={competitionsglobal} />
    </Screen>
  );
};

export default Competitionglobal;
