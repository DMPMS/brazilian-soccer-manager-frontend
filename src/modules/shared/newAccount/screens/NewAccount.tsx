import { InfoCircleOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import dayjs from 'dayjs';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import DatePickerProject from '../../../../shared/components/datepickers/datePickerProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import InputProject from '../../../../shared/components/inputs/input/InputProject';
import InputPasswordProject from '../../../../shared/components/inputs/inputPassword/InputPasswordProject';
import SelectProject from '../../../../shared/components/select/SelectProject';
import {
  LimitedContainerCardProject,
  LimitedContainerProject,
} from '../../../../shared/components/styles/limited.styled';
import CountrySVGProject from '../../../../shared/components/svg/CountrySVGProject';
import {
  CURRENT_DATE_UTC,
  DATE_FORMAT,
  USER_MAX_AGE,
  USER_MAX_LENGH_NAME,
  USER_MAX_LENGH_PASSWORD,
  USER_MIN_AGE,
  USER_MIN_LENGH_NAME,
  USER_MIN_LENGH_PASSWORD,
} from '../../../../shared/constants/others';
import { CountryType } from '../../../../shared/types/Country.type';
import { useCountry } from '../../country/hooks/useCountry';
import { useNewAccount } from '../hooks/useNewAccount';
import { TitleNewAccount } from '../styles/newAccount.style';

const NewAccount = () => {
  const {
    loading,
    disabledButton,
    formUser,
    handleOnChangeInput,
    handleOnChangeDatePicker,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeCountrySelect,
  } = useNewAccount();

  const { countries } = useCountry();

  return (
    <FlexProject justify="center" align="center" style={{ height: '100vh' }}>
      <LimitedContainerCardProject width={605} margin="10px">
        <TitleNewAccount level={3}>Nova Conta</TitleNewAccount>

        <Form layout="vertical" form={formUser} onFinish={handleOnClickInsert}>
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
                label="Data de nascimento"
                name="birthdate"
                required
                tooltip={{
                  title: `A data atual no sistema é ${CURRENT_DATE_UTC.format(DATE_FORMAT)}`,
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  { required: true, message: 'Este campo deve ser preenchido.' },
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.resolve();
                      }

                      const birthdate = dayjs(value).startOf('day');

                      const minDate = CURRENT_DATE_UTC.subtract(USER_MIN_AGE, 'year').startOf(
                        'day',
                      );

                      const maxDate = CURRENT_DATE_UTC.subtract(USER_MAX_AGE, 'year').startOf(
                        'day',
                      );

                      if (birthdate.isAfter(minDate)) {
                        return Promise.reject(`A idade mínima é ${USER_MIN_AGE} anos.`);
                      } else if (birthdate.isBefore(maxDate)) {
                        return Promise.reject(`A idade máxima é ${USER_MAX_AGE} anos.`);
                      } else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              >
                <DatePickerProject
                  placeholder="Selecione a data"
                  minDate={CURRENT_DATE_UTC.subtract(USER_MAX_AGE, 'year').startOf('day')}
                  maxDate={CURRENT_DATE_UTC.subtract(USER_MIN_AGE, 'year').startOf('day')}
                  onChange={(date) => handleOnChangeDatePicker(date, 'birthdate')}
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
                  placeholder="Selecione o país"
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
                      } else {
                        return Promise.reject(new Error('As senhas não são iguais.'));
                      }
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
                type="primary"
                htmlType="submit"
              >
                Criar conta
              </ButtonProject>
            </div>
          </FlexProject>
        </Form>
      </LimitedContainerCardProject>
    </FlexProject>
  );
};

export default NewAccount;
