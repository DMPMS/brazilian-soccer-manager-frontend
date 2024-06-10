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
import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';
import { useManagerglobal } from '../hooks/useManagerglobal';
import { ManagerglobalRoutesEnum } from '../routes';

const Managerglobal = () => {
  const {
    managersglobal,
    handleOnSearch,
    handleOnEdit,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete,
  } = useManagerglobal();

  const navigate = useNavigate();

  const handleOnClickInsert = () => {
    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL_INSERT);
  };

  const columns: ColumnsType<ManagerglobalType> = useMemo(
    () => [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
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
        },
        {
          name: 'Treinadores',
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
        <p>Tem certeza que deseja excluir esse treinador?</p>
      </Modal>
      <FlexProject justify="space-between" margin="0px 0px 16px 0px">
        <LimitedContainerProject width={240}>
          <Search placeholder="Buscar treinador" onSearch={handleOnSearch} enterButton />
        </LimitedContainerProject>

        <LimitedContainerProject width={120}>
          <ButtonProject type="primary" onClick={handleOnClickInsert}>
            Inserir
          </ButtonProject>
        </LimitedContainerProject>
      </FlexProject>
      <TableProject columns={columns} dataSource={managersglobal} />
    </Screen>
  );
};

export default Managerglobal;
