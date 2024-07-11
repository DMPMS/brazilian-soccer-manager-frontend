import { Form } from 'antd';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import InputProject from '../../../../shared/components/inputs/input/InputProject';
import InputIntegerProject from '../../../../shared/components/inputs/inputInteger/InputIntegerProject';
import InputPasswordProject from '../../../../shared/components/inputs/inputPassword/InputPasswordProject';
import SelectProject from '../../../../shared/components/select/SelectProject';
import {
  LimitedContainerCardProject,
  LimitedContainerProject,
} from '../../../../shared/components/styles/limited.styled';
import CountrySVGProject from '../../../../shared/components/svg/CountrySVGProject';
import {
  USER_MAX_AGE,
  USER_MAX_LENGH_NAME,
  USER_MAX_LENGH_PASSWORD,
  USER_MIN_AGE,
  USER_MIN_LENGH_NAME,
  USER_MIN_LENGH_PASSWORD,
} from '../../../../shared/constants/others';
import { CountryType } from '../../../../shared/types/CountryType';
import { useCountry } from '../../country/hooks/useCountry';
import { useNewAccount } from '../hooks/useNewAccount';
import { TitleNewAccount } from '../styles/newAccountScreen.style';

const NewAccountScreen = () => {
  const {
    loading,
    disabledButton,
    formUser,
    handleOnChangeInput,
    handleOnChangeInputNumber,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeCountrySelect,
  } = useNewAccount();

  const { countries } = useCountry();

  return (
    <FlexProject justify="center" align="center" style={{ height: '100vh' }}>
      <LimitedContainerCardProject width={605} margin="10px">
        <FlexProject justify="center" align="center" vertical style={{ textAlign: 'center' }}>
          <TitleNewAccount level={3}>Nova Conta</TitleNewAccount>
        </FlexProject>

        <Form layout="vertical" form={formUser}>
          <FlexProject justify="space-between">
            <LimitedContainerProject width={300}>
              <Form.Item
                label="Nome"
                name="name"
                required
                rules={[
                  { required: true, message: 'Este campo deve ser preenchido.' },
                  {
                    min: USER_MIN_LENGH_NAME,
                    message: `Inclua pelo menos ${USER_MIN_LENGH_NAME} caracteres.`,
                  },
                  {
                    max: USER_MAX_LENGH_NAME,
                    message: `Inclua até ${USER_MAX_LENGH_NAME} caracteres.`,
                  },
                ]}
              >
                <InputProject
                  placeholder="Nome"
                  onChange={(event) => handleOnChangeInput(event, 'name')}
                />
              </Form.Item>
            </LimitedContainerProject>
            <LimitedContainerProject width={300}>
              <Form.Item
                label="Idade"
                name="age"
                required
                rules={[
                  { required: true, message: 'Este campo deve ser preenchido.' },
                  {
                    type: 'number',
                    min: USER_MIN_AGE,
                    message: `A idade mínima é ${USER_MIN_AGE}.`,
                  },
                  {
                    type: 'number',
                    max: USER_MAX_AGE,
                    message: `A idade máxima é ${USER_MAX_AGE}.`,
                  },
                ]}
              >
                <InputIntegerProject
                  placeholder="Idade"
                  onChange={(value) => {
                    handleOnChangeInputNumber(value, 'age');
                  }}
                />
              </Form.Item>
            </LimitedContainerProject>
          </FlexProject>

          <FlexProject justify="space-between">
            <LimitedContainerProject width={300}>
              <Form.Item
                label="Nacionalidade"
                name="countryId"
                required
                rules={[{ required: true, message: 'Este campo deve ser preenchido.' }]}
              >
                <SelectProject
                  placeholder="Selecione um país"
                  allowClear
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
            </LimitedContainerProject>
            <LimitedContainerProject width={300}>
              <Form.Item
                label="E-mail"
                name="email"
                required
                rules={[
                  { required: true, message: 'Este campo deve ser preenchido.' },
                  { type: 'email', message: 'Insira um e-mail válido.' },
                ]}
              >
                <InputProject
                  placeholder="E-mail"
                  onChange={(event) => handleOnChangeInput(event, 'email')}
                />
              </Form.Item>
            </LimitedContainerProject>
          </FlexProject>

          <FlexProject justify="space-between">
            <LimitedContainerProject width={300}>
              <Form.Item
                label="Senha"
                name="password"
                required
                rules={[
                  { required: true, message: 'Este campo deve ser preenchido.' },
                  {
                    min: USER_MIN_LENGH_PASSWORD,
                    message: `Inclua pelo menos ${USER_MIN_LENGH_PASSWORD} caracteres.`,
                  },
                  {
                    max: USER_MAX_LENGH_PASSWORD,
                    message: `Inclua até ${USER_MAX_LENGH_PASSWORD} caracteres.`,
                  },
                ]}
              >
                <InputPasswordProject
                  placeholder="********"
                  onChange={(event) => handleOnChangeInput(event, 'password')}
                />
              </Form.Item>
            </LimitedContainerProject>
            <LimitedContainerProject width={300}>
              <Form.Item
                label="Confirmar senha"
                name="confirmPassword"
                required
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Digite sua senha novamente.' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('As senhas não são iguais.'));
                    },
                  }),
                ]}
              >
                <InputPasswordProject
                  placeholder="********"
                  onChange={(event) => handleOnChangeInput(event, 'confirmPassword')}
                />
              </Form.Item>
            </LimitedContainerProject>
          </FlexProject>
        </Form>

        <FlexProject justify="space-between">
          <div>
            <ButtonProject onClick={handleOnClickCancel}>Cancelar</ButtonProject>
          </div>
          <div>
            <ButtonProject onClick={handleOnClickReset} margin="0px 8px 0px 0px">
              Resetar
            </ButtonProject>

            <ButtonProject
              loading={loading}
              disabled={disabledButton}
              onClick={handleOnClickInsert}
              type="primary"
            >
              Criar conta
            </ButtonProject>
          </div>
        </FlexProject>
      </LimitedContainerCardProject>
    </FlexProject>
  );
};

export default NewAccountScreen;
