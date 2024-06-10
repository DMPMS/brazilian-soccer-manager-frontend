import { Form } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ButtonProject from '../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../shared/components/flex/FlexProject';
import InputProject from '../../../shared/components/inputs/input/InputProject';
import InputIntegerProject from '../../../shared/components/inputs/inputInteger/InputIntegerProject';
import LoadingProject from '../../../shared/components/loading/LoadingProject';
import Screen from '../../../shared/components/screen/ScreenProject';
import SelectProject from '../../../shared/components/select/SelectProject';
import {
  LimitedContainerProject,
  LimitedContainerProjectCardProject,
} from '../../../shared/components/styles/limited.styled';
import CountrySVGProject from '../../../shared/components/svg/CountrySVGProject';
import { CountryType } from '../../../shared/types/CountryType';
import { useCountry } from '../../country/hooks/useCountry';
import { useInsertManagerglobal } from '../hooks/useInsertManagerglobal';
import { ManagerglobalRoutesEnum } from '../routes';

const ManagerglobalInsert = () => {
  const { managerglobalId } = useParams<{ managerglobalId: string }>();

  const {
    loading,
    disabledButton,
    isEdit,
    loadingManagerglobal,
    formManagerglobal,
    handleOnChangeInput,
    handleOnChangeInputNumber,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
  } = useInsertManagerglobal(managerglobalId);

  const navigate = useNavigate();

  const { countries } = useCountry();

  const handleOnClickCancel = () => {
    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Página inicial',
        },
        {
          name: 'Treinadores',
          navigateTo: ManagerglobalRoutesEnum.MANAGERGLOBAL,
        },
        {
          name: `${isEdit ? 'Editar' : 'Inserir'} treinador`,
        },
      ]}
    >
      {loadingManagerglobal ? (
        <FlexProject justify="center">
          <LimitedContainerProjectCardProject width={400}>
            <FlexProject justify="center">
              <LoadingProject size="large" />
            </FlexProject>
          </LimitedContainerProjectCardProject>
        </FlexProject>
      ) : (
        <FlexProject justify="center">
          <LimitedContainerProjectCardProject width={400}>
            <Form layout="vertical" form={formManagerglobal}>
              <Form.Item
                label="Nome"
                name="name"
                required
                rules={[
                  { required: true, message: 'Este campo deve ser preenchido.' },
                  { min: 3, message: 'Inclua pelo menos 3 caracteres.' },
                  { max: 40, message: 'Inclua até 40 caracteres.' },
                ]}
              >
                <InputProject
                  placeholder="Nome"
                  onChange={(event) => handleOnChangeInput(event, 'name')}
                />
              </Form.Item>

              <Form.Item
                label="Idade"
                name="age"
                required
                rules={[
                  { required: true, message: 'Este campo deve ser preenchido.' },
                  { type: 'number', min: 18, message: 'A idade mínima é 18.' },
                  { type: 'number', max: 90, message: 'A idade máxima é 90.' },
                ]}
              >
                <InputIntegerProject
                  placeholder="Idade"
                  onChange={(value) => {
                    handleOnChangeInputNumber(value, 'age');
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Nacionalidade"
                name="countryId"
                required
                rules={[{ required: true, message: 'Este campo deve ser preenchido.' }]}
              >
                <SelectProject
                  placeholder="Selecione um país"
                  onChange={handleOnChangeCountrySelect}
                  options={countries.map((country: CountryType) => ({
                    value: `${country.id}`,
                    label: (
                      <FlexProject justify="flex-start" align="center">
                        <CountrySVGProject
                          name={country.name}
                          width={20}
                          height={20}
                          style={{ margin: '0px 5px 0px 0px' }}
                        />
                        <text>{country.name}</text>
                      </FlexProject>
                    ),
                  }))}
                  showSearch
                  filterOption={(input, option) =>
                    option.label.props.children[1].props.children
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Form>

            <FlexProject justify="flex-end">
              <LimitedContainerProject margin="0px 8px 0px 0px" width={120}>
                <ButtonProject onClick={handleOnClickCancel}>Cancelar</ButtonProject>
              </LimitedContainerProject>
              <LimitedContainerProject width={120}>
                <ButtonProject
                  loading={loading}
                  disabled={disabledButton}
                  onClick={handleOnClickInsert}
                  type="primary"
                >
                  {isEdit ? 'Salvar' : 'Inserir'}
                </ButtonProject>
              </LimitedContainerProject>
            </FlexProject>
          </LimitedContainerProjectCardProject>
        </FlexProject>
      )}
    </Screen>
  );
};

export default ManagerglobalInsert;
