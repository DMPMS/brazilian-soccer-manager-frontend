import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Radio, Typography } from 'antd';
import dayjs from 'dayjs';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import DatePickerProject from '../../../../shared/components/datepickers/datePickerProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageProject from '../../../../shared/components/images/imageProject/ImageProject';
import InputProject from '../../../../shared/components/inputs/input/InputProject';
import SelectProject from '../../../../shared/components/select/SelectProject';
import {
  LimitedContainerCardProject,
  LimitedContainerProject,
} from '../../../../shared/components/styles/limited.styled';
import CountrySVGProject from '../../../../shared/components/svg/CountrySVGProject';
import {
  CURRENT_DATE_UTC,
  DATE_FORMAT,
  SAVE_MAX_LENGH_MANAGER_NAME,
  SAVE_MAX_LENGH_NAME,
  SAVE_MAX_MANAGER_AGE,
  SAVE_MIN_LENGH_MANAGER_NAME,
  SAVE_MIN_LENGH_NAME,
  SAVE_MIN_MANAGER_AGE,
} from '../../../../shared/constants/others';
import { RuleCompetitionTypeEnum } from '../../../../shared/enums/RuleCompetitionType.enum';
import { CompetitionglobalType } from '../../../../shared/types/Competitionglobal.type';
import { CountryType } from '../../../../shared/types/Country.type';
import { TeamglobalType } from '../../../../shared/types/Teamglobal.type';
import { useCompetitionglobal } from '../../../admin/competitionglobal/hooks/useCompetitionglobal';
import { useTeamglobal } from '../../../admin/teamglobal/hooks/useTeamglobal';
import { useCountry } from '../../../shared/country/hooks/useCountry';
import { useInsertSave } from '../hooks/useInsertSave';
import { TitleSaveInsert } from '../styles/saveInsert.style';

const { Text } = Typography;

const SaveInsert = () => {
  const {
    loading,
    disabledButton,
    formSave,
    competitionsglobalDistinctCountryIds,
    selectedCompetitionsglobalCountryId,
    selectedCompetitionglobalId,
    selectedRadioOption,
    userSaveNames,
    handleOnChangeInput,
    handleOnChangeDatePicker,
    handleOnChangeRadio,
    handleOnChangeCompetitionglobalCountrySelect,
    handleOnChangeCompetitionglobalSelect,
    handleOnChangeTeamglobalSelect,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeManagerCountrySelect,
  } = useInsertSave();

  const { countries } = useCountry();
  const { competitionsglobal } = useCompetitionglobal();
  const { teamsglobal } = useTeamglobal();

  return (
    <FlexProject justify="center" align="center" style={{ height: '100vh' }}>
      <LimitedContainerCardProject width={605} margin="10px">
        <TitleSaveInsert level={3}>Novo Jogo</TitleSaveInsert>

        <Form layout="vertical" form={formSave} onFinish={handleOnClickInsert}>
          <FlexProject justify="space-between">
            <FlexProject justify="space-between" vertical>
              <LimitedContainerProject width={300}>
                <FlexProject justify="center">
                  <Text type="secondary">Informações do time e do save</Text>
                </FlexProject>
              </LimitedContainerProject>
              <LimitedContainerProject width={300}>
                <Form.Item
                  label="Nome do save"
                  name="name"
                  required
                  rules={[
                    { required: true, message: 'Este campo deve ser preenchido.' },
                    {
                      min: SAVE_MIN_LENGH_NAME,
                      message: `Inclua pelo menos ${SAVE_MIN_LENGH_NAME} caracteres.`,
                    },
                    {
                      max: SAVE_MAX_LENGH_NAME,
                      message: `Inclua até ${SAVE_MAX_LENGH_NAME} caracteres.`,
                    },
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.resolve();
                        }

                        if (userSaveNames.includes(value)) {
                          return Promise.reject(`Você já possui um salvamento com este nome.`);
                        } else {
                          return Promise.resolve();
                        }
                      },
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
                  label="Selecione o país"
                  name="competitionsglobalCountryId"
                  required
                  rules={[{ required: true, message: 'Este campo deve ser preenchido.' }]}
                >
                  <SelectProject
                    placeholder="Selecione o país"
                    allowClear
                    onChange={handleOnChangeCompetitionglobalCountrySelect}
                    options={countries
                      .filter((country: CountryType) =>
                        competitionsglobalDistinctCountryIds.includes(country.id),
                      )
                      .map((country: CountryType) => ({
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
                  label="Selecione a competição"
                  name="competitionglobalId"
                  required
                  rules={[{ required: true, message: 'Este campo deve ser preenchido.' }]}
                >
                  <SelectProject
                    placeholder={
                      selectedCompetitionsglobalCountryId
                        ? 'Selecione a competição'
                        : 'Selecione o país'
                    }
                    allowClear
                    disabled={selectedCompetitionsglobalCountryId === undefined}
                    onChange={handleOnChangeCompetitionglobalSelect}
                    options={competitionsglobal
                      .filter(
                        (competitionglobal: CompetitionglobalType) =>
                          competitionglobal.country?.id === selectedCompetitionsglobalCountryId &&
                          (competitionglobal.rule?.competitionType ===
                            RuleCompetitionTypeEnum.BrazilianLeagueA ||
                            competitionglobal.rule?.competitionType ===
                              RuleCompetitionTypeEnum.BrazilianLeagueB ||
                            competitionglobal.rule?.competitionType ===
                              RuleCompetitionTypeEnum.BrazilianLeagueC ||
                            competitionglobal.rule?.competitionType ===
                              RuleCompetitionTypeEnum.BrazilianLeagueD),
                      )
                      .map((competitionglobal: CompetitionglobalType) => ({
                        value: `${competitionglobal.id}`,
                        label: (
                          <FlexProject justify="flex-start" align="center">
                            <ImageProject
                              src={competitionglobal.srcImage}
                              width={20}
                              height={20}
                              margin="0px 5px 0px 0px"
                            />
                            <text>{competitionglobal.name}</text>
                          </FlexProject>
                        ),
                      }))}
                    showSearch
                    filterOption={(input, option) =>
                      option.label.props.children[1].props.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.label.props.children[1].props.children
                        .toLowerCase()
                        .localeCompare(optionB.label.props.children[1].props.children.toLowerCase())
                    }
                  />
                </Form.Item>
              </LimitedContainerProject>
              <LimitedContainerProject width={300}>
                <Form.Item
                  label="Selecione o time"
                  name="teamglobalId"
                  required
                  rules={[{ required: true, message: 'Este campo deve ser preenchido.' }]}
                >
                  <SelectProject
                    placeholder={
                      selectedCompetitionglobalId ? 'Selecione o time' : 'Selecione a competição'
                    }
                    allowClear
                    disabled={selectedCompetitionglobalId === undefined}
                    onChange={handleOnChangeTeamglobalSelect}
                    options={teamsglobal
                      .filter((teamglobal: TeamglobalType) =>
                        teamglobal.competitionsglobalTeamglobal?.some(
                          (competitionglobalTeamglobal) =>
                            competitionglobalTeamglobal.competitionglobal?.id ===
                            selectedCompetitionglobalId,
                        ),
                      )
                      .map((teamglobal: TeamglobalType) => ({
                        value: `${teamglobal.id}`,
                        label: (
                          <FlexProject justify="flex-start" align="center">
                            <ImageProject
                              src={teamglobal.srcImage}
                              width={20}
                              height={20}
                              margin="0px 5px 0px 0px"
                            />
                            <text>{teamglobal.name}</text>
                          </FlexProject>
                        ),
                      }))}
                    showSearch
                    filterOption={(input, option) =>
                      option.label.props.children[1].props.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.label.props.children[1].props.children
                        .toLowerCase()
                        .localeCompare(optionB.label.props.children[1].props.children.toLowerCase())
                    }
                  />
                </Form.Item>
              </LimitedContainerProject>
            </FlexProject>
            <FlexProject justify="space-between" vertical>
              <LimitedContainerProject width={300}>
                <FlexProject justify="center">
                  <Text type="secondary">Informações do treinador</Text>
                </FlexProject>
              </LimitedContainerProject>
              <LimitedContainerProject width={300}>
                <Form.Item label="Treinador do time" name="isCustomManager" required>
                  <Radio.Group
                    defaultValue="default"
                    buttonStyle="solid"
                    onChange={(event) => handleOnChangeRadio(event)}
                    style={{ width: '100%', textAlign: 'center' }}
                  >
                    <Radio.Button value="default" style={{ width: '50%' }}>
                      Padrão
                    </Radio.Button>
                    <Radio.Button value="custom" style={{ width: '50%' }}>
                      Personalizado
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </LimitedContainerProject>
              <LimitedContainerProject width={300}>
                <Form.Item
                  label="Nome"
                  name="managerName"
                  required
                  rules={[
                    { required: true, message: 'Este campo deve ser preenchido.' },
                    {
                      min: SAVE_MIN_LENGH_MANAGER_NAME,
                      message: `Inclua pelo menos ${SAVE_MIN_LENGH_MANAGER_NAME} caracteres.`,
                    },
                    {
                      max: SAVE_MAX_LENGH_MANAGER_NAME,
                      message: `Inclua até ${SAVE_MAX_LENGH_MANAGER_NAME} caracteres.`,
                    },
                  ]}
                >
                  <InputProject
                    placeholder={selectedRadioOption === 'default' ? 'Selecione o time' : 'Nome'}
                    disabled={selectedRadioOption === 'default'}
                    onChange={(event) => handleOnChangeInput(event, 'managerName')}
                  />
                </Form.Item>
              </LimitedContainerProject>
              <LimitedContainerProject width={300}>
                <Form.Item
                  label="Data de nascimento"
                  name="managerBirthdate"
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
                          SAVE_MIN_MANAGER_AGE,
                          'year',
                        ).startOf('day');

                        const maxDate = CURRENT_DATE_UTC.subtract(
                          SAVE_MAX_MANAGER_AGE,
                          'year',
                        ).startOf('day');

                        if (birthdate.isAfter(minDate)) {
                          return Promise.reject(`A idade mínima é ${SAVE_MIN_MANAGER_AGE} anos.`);
                        } else if (birthdate.isBefore(maxDate)) {
                          return Promise.reject(`A idade máxima é ${SAVE_MAX_MANAGER_AGE} anos.`);
                        } else {
                          return Promise.resolve();
                        }
                      },
                    },
                  ]}
                >
                  <DatePickerProject
                    placeholder={
                      selectedRadioOption === 'default' ? 'Selecione o time' : 'Selecione a data'
                    }
                    minDate={CURRENT_DATE_UTC.subtract(SAVE_MAX_MANAGER_AGE, 'year').startOf('day')}
                    maxDate={CURRENT_DATE_UTC.subtract(SAVE_MIN_MANAGER_AGE, 'year').startOf('day')}
                    disabled={selectedRadioOption === 'default'}
                    onChange={(date) => handleOnChangeDatePicker(date, 'managerBirthdate')}
                  />
                </Form.Item>
              </LimitedContainerProject>
              <LimitedContainerProject width={300}>
                <Form.Item
                  label="Nacionalidade"
                  name="managerCountryId"
                  required
                  rules={[{ required: true, message: 'Este campo deve ser preenchido.' }]}
                >
                  <SelectProject
                    placeholder={
                      selectedRadioOption === 'default' ? 'Selecione o time' : 'Selecione o país'
                    }
                    allowClear
                    disabled={selectedRadioOption === 'default'}
                    onChange={handleOnChangeManagerCountrySelect}
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
            </FlexProject>
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
                Criar jogo
              </ButtonProject>
            </div>
          </FlexProject>
        </Form>
      </LimitedContainerCardProject>
    </FlexProject>
  );
};

export default SaveInsert;
