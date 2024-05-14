import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import InputInteger from '../../../shared/components/inputs/inputInteger/InputInteger';
import Screen from '../../../shared/components/screen/Screen';
import Select from '../../../shared/components/select/Select';
import {
  DisplayFlexAlignCenter,
  DisplayFlexDirectionRow,
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import {
  LimitedContainer,
  LimitedContainerCard,
} from '../../../shared/components/styles/limited.styled';
import CountrySVG from '../../../shared/components/svg/CountrySVG';
import { CountryType } from '../../../shared/types/CountryType';
import { useCountry } from '../../country/hooks/useCountry';
import { useInsertManagerglobal } from '../hooks/useInsertManagerglobal';
import { ManagerglobalRoutesEnum } from '../routes';

const ManagerglobalInsert = () => {
  const {
    managerglobal,
    loading,
    disabledButton,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
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
            onChange={(event) => handleOnChangeInput(event, 'name')}
            value={managerglobal.name}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <InputInteger
            onChange={(event) => handleOnChangeInput(event, 'age', true)}
            value={managerglobal.age}
            margin="0px 0px 16px 0px"
            title="Idade"
            placeholder="Idade"
          />
          <Select
            title="Nacionalidade"
            margin="0px 0px 32px 0px"
            onChange={handleOnChangeCountrySelect}
            options={countries.map((country: CountryType) => ({
              value: `${country.id}`,
              label: (
                <DisplayFlexDirectionRow>
                  <DisplayFlexAlignCenter margin="0px 5px 0px 0px">
                    <CountrySVG name={country.name} width={20} height={20} />
                  </DisplayFlexAlignCenter>
                  <text>{country.name}</text>
                </DisplayFlexDirectionRow>
              ),
            }))}
            showSearch
            filterOption={(input, option) =>
              option.label.props.children[1].props.children
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button onClick={handleOnClickCancel}>Cancelar</Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button
                loading={loading}
                disabled={disabledButton}
                onClick={handleOnClickInsert}
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
