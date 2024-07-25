import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import FlexProject from '../../../../shared/components/flex/FlexProject';
import { LimitedContainerCardProject } from '../../../../shared/components/styles/limited.styled';
import TableProject from '../../../../shared/components/table/TableProject';
import { SaveType } from '../../../../shared/types/SaveType';
import { useSave } from '../hooks/useSave';
import { TitleSave } from '../styles/save.style';

const Save = () => {
  const { saves } = useSave();

  const columns: ColumnsType<SaveType> = useMemo(
    () => [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Time',
        dataIndex: '',
        key: '',
      },
      {
        title: 'Treinador',
        dataIndex: '',
        key: '',
      },
      {
        title: 'Último acesso',
        dataIndex: '',
        key: '',
      },
    ],
    [],
  );

  return (
    <FlexProject justify="center" align="center" style={{ height: '100vh' }}>
      <LimitedContainerCardProject width={605} margin="10px">
        <FlexProject justify="center" align="center" vertical style={{ textAlign: 'center' }}>
          <TitleSave level={3}>Salvamentos</TitleSave>
          <TableProject columns={columns} dataSource={saves} />
        </FlexProject>
      </LimitedContainerCardProject>
    </FlexProject>
  );
};

export default Save;
