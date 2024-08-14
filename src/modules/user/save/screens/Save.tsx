import { Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageProject from '../../../../shared/components/image/ImageProject';
import { LimitedContainerCardProject } from '../../../../shared/components/styles/limited.styled';
import TableProject from '../../../../shared/components/table/TableProject';
import { DATE_FORMAT, DATETIME_FORMAT } from '../../../../shared/constants/others';
import { SaveType } from '../../../../shared/types/SaveType';
import { useSave } from '../hooks/useSave';
import { TitleSave } from '../styles/save.style';

const Save = () => {
  const {
    saves,
    openModalLogout,
    handleOnClickInsert,
    handleOnClickLogout,
    handleOnCancelLogout,
    handleOnConfirmLogout,
  } = useSave();

  const columns: ColumnsType<SaveType> = useMemo(
    () => [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Time',
        dataIndex: 'teamsave',
        key: 'teamsave',
        render: (_, target) =>
          target.controllerManagersave?.teamsave && (
            <FlexProject justify="flex-start" align="center">
              <ImageProject
                src={target.controllerManagersave.teamsave.srcImage}
                width={20}
                height={20}
                margin="0px 5px 0px 0px"
              />
              <text>{target.controllerManagersave.teamsave.name}</text>
            </FlexProject>
          ),
      },
      {
        title: 'Treinador',
        dataIndex: 'controllerManagersave',
        key: 'controllerManagersave',
        render: (_, target) => target.controllerManagersave?.name,
      },
      {
        title: 'Data no salvamento',
        dataIndex: 'datetime',
        key: 'datetime',
        render: (_, target) => dayjs(target.datetime).format(DATE_FORMAT),
      },
      {
        title: 'Último acesso',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (_, target) => dayjs(target.updatedAt).format(DATETIME_FORMAT),
      },
      {
        title: 'Data de criação',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (_, target) => dayjs(target.createdAt).format(DATETIME_FORMAT),
      },
    ],
    [],
  );

  return (
    <>
      <Modal
        title="Atenção"
        open={openModalLogout}
        onOk={handleOnConfirmLogout}
        onCancel={handleOnCancelLogout}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja sair?</p>
      </Modal>

      <FlexProject justify="center" align="center" style={{ height: '100vh' }}>
        <LimitedContainerCardProject width={900} margin="10px">
          <TitleSave level={3}>Salvamentos</TitleSave>
          <FlexProject justify="space-between" margin="0px 0px 16px 0px">
            <ButtonProject type="primary" onClick={handleOnClickLogout}>
              Sair
            </ButtonProject>
            <ButtonProject type="primary" onClick={handleOnClickInsert}>
              Novo jogo
            </ButtonProject>
          </FlexProject>
          <TableProject columns={columns} dataSource={saves} />
        </LimitedContainerCardProject>
      </FlexProject>
    </>
  );
};

export default Save;
