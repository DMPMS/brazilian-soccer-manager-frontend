import { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { URL_MANAGERGLOBAL } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';
import { ManagerglobalRoutesEnum } from '../routes';

const columns: ColumnsType<ManagerglobalType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Idade',
    dataIndex: 'age',
    key: 'age',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Nacionalidade',
    dataIndex: 'country',
    key: 'country',
    render: (_, target) => <a>{target.country?.name}</a>,
  },
];

const Managerglobal = () => {
  const { managersglobal, setManagersglobal } = useDataContext();
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    request<ManagerglobalType[]>(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);
  }, []);

  const handleOnClickInsert = () => {
    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL_INSERT);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'PÁGINA INICIAL',
        },
        {
          name: 'TREINADORES',
        },
      ]}
    >
      <Button onClick={handleOnClickInsert}>Inserir</Button>
      <Table columns={columns} dataSource={managersglobal} />
    </Screen>
  );
};

export default Managerglobal;
