import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import Select from '../../../shared/components/select/Select';
import { DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { URL_COUNTRY, URL_MANAGERGLOBAL } from '../../../shared/constants/urls';
import { InsertManagerglobalDto } from '../../../shared/dtos/InsertManagerglobal.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ManagerglobalRoutesEnum } from '../routes';
import { ManagerglobalInsertContainer } from '../styles/managerglobalInsert.style';

const ManagerglobalInsert = () => {
  const [managerglobal, setManagerglobal] = useState<InsertManagerglobalDto>({
    name: '',
    age: 0,
  });
  const { countries, setCountries } = useDataContext();
  const { setNotification } = useGlobalContext();
  const { request } = useRequests();

  const navigate = useNavigate();

  useEffect(() => {
    if (countries.length === 0) {
      request(URL_COUNTRY, MethodsEnum.GET, setCountries);
    }
  }, []);

  const handleInsertManagerglobal = async () => {
    await connectionAPIPost(URL_MANAGERGLOBAL, managerglobal)
      .then(() => {
        setNotification('Sucesso!', 'success', 'Treinador inserido com sucesso!');
        navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
      });
  };

  const handleOnClickCancel = () => {
    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setManagerglobal({
      ...managerglobal,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    });
  };

  const handleChange = (value: string) => {
    setManagerglobal({
      ...managerglobal,
      countryId: Number(value),
    });
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'PÁGINA INICIAL',
        },
        {
          name: 'TREINADORES',
          navigateTo: ManagerglobalRoutesEnum.MANAGERGLOBAL,
        },
        {
          name: 'INSERIR TREINADOR',
        },
      ]}
    >
      <ManagerglobalInsertContainer>
        <LimitedContainer width={400}>
          <Input
            onChange={(event) => onChange(event, 'name')}
            value={managerglobal.name}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            onChange={(event) => onChange(event, 'age', true)}
            value={managerglobal.age}
            margin="0px 0px 16px 0px"
            title="Idade"
            placeholder="Idade"
          />
          <Select
            title="Nacionalidade"
            margin="0px 0px 32px 0px"
            onChange={handleChange}
            options={countries.map((country) => ({
              value: `${country.id}`,
              label: `${country.name}`,
            }))}
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button danger onClick={handleOnClickCancel}>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button onClick={handleInsertManagerglobal} type="primary">
                Inserir treinador
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </ManagerglobalInsertContainer>
    </Screen>
  );
};

export default ManagerglobalInsert;
