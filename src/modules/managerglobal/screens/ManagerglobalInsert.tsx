import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import Select from '../../../shared/components/select/Select';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import {
  LimitedContainer,
  LimitedContainerCard,
} from '../../../shared/components/styles/limited.styled';
import CountrySVG from '../../../shared/components/svg/CountrySVG';
import { useCountry } from '../../country/hooks/useCountry';
import { useInsertManagerglobal } from '../hooks/useInsertManagerglobal';
import { ManagerglobalRoutesEnum } from '../routes';
import { ContainerCountry, ContainerCountryImage } from '../styles/general.style';

const ManagerglobalInsert = () => {
  const {
    managerglobal,
    loading,
    disabledButton,
    onChangeInput,
    handleInsertManagerglobal,
    handleChangeSelect,
  } = useInsertManagerglobal();

  const { countries } = useCountry();

  const navigate = useNavigate();

  const handleOnClickCancel = () => {
    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
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
      <DisplayFlexJustifyCenter>
        <LimitedContainerCard width={400}>
          <Input
            onChange={(event) => onChangeInput(event, 'name')}
            value={managerglobal.name}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            onChange={(event) => onChangeInput(event, 'age', true)}
            value={managerglobal.age}
            margin="0px 0px 16px 0px"
            title="Idade"
            placeholder="Idade"
          />
          <Select
            title="Nacionalidade"
            margin="0px 0px 32px 0px"
            onChange={handleChangeSelect}
            options={countries.map((country) => ({
              value: `${country.id}`,
              label: (
                <ContainerCountry>
                  <ContainerCountryImage>
                    <CountrySVG name={country.name} width={20} height={20} />
                  </ContainerCountryImage>
                  <text>{country.name}</text>
                </ContainerCountry>
              ),
            }))}
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button onClick={handleOnClickCancel}>Cancelar</Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button
                loading={loading}
                disabled={disabledButton}
                onClick={handleInsertManagerglobal}
                type="primary"
              >
                Inserir
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainerCard>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default ManagerglobalInsert;
