import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyBetween } from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import CountrySVG from '../../../shared/components/svg/CountrySVG';
import Table from '../../../shared/components/table/Table';
import { URL_MANAGERGLOBAL } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';
import { ManagerglobalRoutesEnum } from '../routes';
import { ContainerCountry, ContainerCountryImage } from '../styles/general.style';

const columns: ColumnsType<ManagerglobalType> = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Idade',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Nacionalidade',
    dataIndex: 'country',
    key: 'country',
    render: (_, target) => (
      <ContainerCountry>
        <ContainerCountryImage>
          <CountrySVG name={target.country?.name} width={20} height={20} />
        </ContainerCountryImage>
        <text>{target.country?.name}</text>
      </ContainerCountry>
    ),
  },
];

const Managerglobal = () => {
  const { managersglobal, setManagersglobal } = useDataContext();
  const { request } = useRequests();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');

  const managersglobalFiltered = managersglobal.filter((manager) =>
    manager.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    request<ManagerglobalType[]>(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);
  }, []);

  const handleOnClickInsert = () => {
    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL_INSERT);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
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
      <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar treinador" onSearch={handleSearch} enterButton />
        </LimitedContainer>

        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickInsert}>
            Inserir
          </Button>
        </LimitedContainer>
      </DisplayFlexJustifyBetween>
      <Table columns={columns} dataSource={managersglobalFiltered} />
    </Screen>
  );
};

export default Managerglobal;
