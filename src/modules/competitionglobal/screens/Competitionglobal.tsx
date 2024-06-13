import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonProject from '../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../shared/components/flex/FlexProject';
import ImageProject from '../../../shared/components/image/ImageProject';
import Screen from '../../../shared/components/screen/ScreenProject';
import { LimitedContainerProject } from '../../../shared/components/styles/limited.styled';
import CountrySVGProject from '../../../shared/components/svg/CountrySVGProject';
import TableProject from '../../../shared/components/table/TableProject';
import {
  RULE_COMPETITIONTYPE_CUP,
  RULE_COMPETITIONTYPE_LEAGUE,
} from '../../../shared/constants/others';
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
            <ImageProject src={target.srcImage} width={20} height={20} margin="0px 5px 0px 0px" />
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
          if (target.rule?.competitionType === RULE_COMPETITIONTYPE_LEAGUE) {
            return 'Liga';
          } else if (target.rule?.competitionType === RULE_COMPETITIONTYPE_CUP) {
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
            <ButtonProject
              type="primary"
              danger
              onClick={() => handleOnOpenModalDelete(target.id)}
              icon={<DeleteOutlined />}
            ></ButtonProject>
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
        <LimitedContainerProject width={240}>
          <Search placeholder="Buscar competição" onSearch={handleOnSearch} enterButton />
        </LimitedContainerProject>

        <LimitedContainerProject width={120}>
          <ButtonProject type="primary" onClick={handleOnClickInsert}>
            Inserir
          </ButtonProject>
        </LimitedContainerProject>
      </FlexProject>
      <TableProject columns={columns} dataSource={competitionsglobal} />
    </Screen>
  );
};

export default Competitionglobal;
