import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageProject from '../../../../shared/components/image/ImageProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import { LimitedContainerProject } from '../../../../shared/components/styles/limited.styled';
import CountrySVGProject from '../../../../shared/components/svg/CountrySVGProject';
import TableProject from '../../../../shared/components/table/TableProject';
import { CompetitionglobalType } from '../../../../shared/types/Competitionglobal.type';
import { HomeRoutesEnum } from '../../home/routes';
import { useCompetitionglobal } from '../hooks/useCompetitionglobal';

const Competitionglobal = () => {
  const {
    loading,
    competitionsglobal,
    competitionglobalCanBeDeleted,
    handleOnClickInsert,
    handleOnSearch,
    handleOnEdit,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete,
  } = useCompetitionglobal();

  const columns: ColumnsType<CompetitionglobalType> = useMemo(
    () => [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (_, target) => (
          <FlexProject justify="flex-start" align="center">
            <ImageProject src={target.srcImage} width={20} height={20} margin="0px 5px 0px 0px" />
            <text>
              {target.name} {target.season}
            </text>
          </FlexProject>
        ),
      },
      {
        title: 'País',
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
        title: 'Ações',
        dataIndex: '',
        key: 'x',
        render: (_, target) => (
          <Space>
            <ButtonProject
              onClick={() => handleOnEdit(target.id)}
              icon={<EditOutlined />}
            ></ButtonProject>

            {competitionglobalCanBeDeleted(target) && (
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
    [competitionsglobal],
  );

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Página inicial',
          navigateTo: HomeRoutesEnum.HOME,
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
        confirmLoading={loading}
      >
        <p>Tem certeza que deseja excluir essa competição?</p>
      </Modal>
      <FlexProject justify="space-between" margin="0px 0px 16px 0px">
        <LimitedContainerProject width={240}>
          <Search placeholder="Buscar competição" onSearch={handleOnSearch} enterButton />
        </LimitedContainerProject>

        <ButtonProject type="primary" onClick={handleOnClickInsert}>
          Inserir
        </ButtonProject>
      </FlexProject>
      <TableProject columns={columns} dataSource={competitionsglobal} />
    </Screen>
  );
};

export default Competitionglobal;
