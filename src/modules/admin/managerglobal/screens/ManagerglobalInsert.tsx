import { InfoCircleOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import DatePickerProject from '../../../../shared/components/datepickers/datePickerProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import InputProject from '../../../../shared/components/inputs/input/InputProject';
import LoadingProject from '../../../../shared/components/loading/LoadingProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import SelectProject from '../../../../shared/components/select/SelectProject';
import { LimitedContainerCardProject } from '../../../../shared/components/styles/limited.styled';
import CountrySVGProject from '../../../../shared/components/svg/CountrySVGProject';
import {
  CURRENT_DATE_UTC,
  DATE_FORMAT,
  MANAGERGLOBAL_MAX_AGE,
  MANAGERGLOBAL_MAX_LENGH_NAME,
  MANAGERGLOBAL_MIN_AGE,
  MANAGERGLOBAL_MIN_LENGH_NAME,
} from '../../../../shared/constants/others';
import { CountryType } from '../../../../shared/types/CountryType';
import { useCountry } from '../../../shared/country/hooks/useCountry';
import { HomeRoutesEnum } from '../../home/routes';
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
    handleOnChangeDatePicker,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeCountrySelect,
  } = useInsertManagerglobal(managerglobalId);

  const { countries } = useCountry();

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Página inicial',
          navigateTo: HomeRoutesEnum.HOME,
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
        // style={{ minHeight: 'calc(100vh - 125px)' }
        <FlexProject justify="center">
          <LoadingProject width={50} height={50} />
        </FlexProject>
      ) : (
        <FlexProject justify="center">
          <LimitedContainerCardProject width={400}>
            <Form layout="vertical" form={formManagerglobal}>
              <Form.Item
                label="Nome"
                name="name"
                required
                rules={[
                  { required: true, message: 'Este campo deve ser preenchido.' },
                  {
                    min: MANAGERGLOBAL_MIN_LENGH_NAME,
                    message: `Inclua pelo menos ${MANAGERGLOBAL_MIN_LENGH_NAME} caracteres.`,
                  },
                  {
                    max: MANAGERGLOBAL_MAX_LENGH_NAME,
                    message: `Inclua até ${MANAGERGLOBAL_MAX_LENGH_NAME} caracteres.`,
                  },
                ]}
              >
                <InputProject
                  placeholder="Nome"
                  onChange={(event) => handleOnChangeInput(event, 'name')}
                />
              </Form.Item>

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

                      const minDate = CURRENT_DATE_UTC.subtract(
                        MANAGERGLOBAL_MIN_AGE,
                        'year',
                      ).startOf('day');

                      const maxDate = CURRENT_DATE_UTC.subtract(
                        MANAGERGLOBAL_MAX_AGE,
                        'year',
                      ).startOf('day');

                      if (birthdate.isAfter(minDate)) {
                        return Promise.reject(`A idade mínima é ${MANAGERGLOBAL_MIN_AGE} anos.`);
                      } else if (birthdate.isBefore(maxDate)) {
                        return Promise.reject(`A idade máxima é ${MANAGERGLOBAL_MAX_AGE} anos.`);
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <DatePickerProject
                  placeholder="Selecione uma data"
                  minDate={CURRENT_DATE_UTC.subtract(MANAGERGLOBAL_MAX_AGE, 'year').startOf('day')}
                  maxDate={CURRENT_DATE_UTC.subtract(MANAGERGLOBAL_MIN_AGE, 'year').startOf('day')}
                  onChange={(date) => handleOnChangeDatePicker(date, 'birthdate')}
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
                  {isEdit ? 'Salvar' : 'Inserir'}
                </ButtonProject>
              </div>
            </FlexProject>
          </LimitedContainerCardProject>
        </FlexProject>
      )}
    </Screen>
  );
};

export default ManagerglobalInsert;
