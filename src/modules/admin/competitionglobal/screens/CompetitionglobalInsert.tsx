import { Form, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageProject from '../../../../shared/components/image/ImageProject';
import InputProject from '../../../../shared/components/inputs/input/InputProject';
import LoadingProject from '../../../../shared/components/loading/LoadingProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import SelectProject from '../../../../shared/components/select/SelectProject';
import {
  LimitedContainerCardProject,
  LimitedContainerProject,
} from '../../../../shared/components/styles/limited.styled';
import CountrySVGProject from '../../../../shared/components/svg/CountrySVGProject';
import {
  COMPETITIONGLOBAL_MAX_LENGH_NAME,
  COMPETITIONGLOBAL_MAX_LENGH_SEASON,
  COMPETITIONGLOBAL_MIN_LENGH_NAME,
  COMPETITIONGLOBAL_MIN_LENGH_SEASON,
} from '../../../../shared/constants/others';
import { CountryType } from '../../../../shared/types/CountryType';
import { RuleType } from '../../../../shared/types/RuleType';
import { TeamglobalType } from '../../../../shared/types/TeamglobalType';
import { useCountry } from '../../../shared/country/hooks/useCountry';
import { useRule } from '../../../shared/rule/hooks/useRule';
import { HomeRoutesEnum } from '../../home/routes';
import { useTeamglobal } from '../../teamglobal/hooks/useTeamglobal';
import { useInsertCompetitionglobal } from '../hooks/useInsertCompetitionglobal';
import { CompetitionglobalRoutesEnum } from '../routes';

const CompetitionglobalInsert = () => {
  const { competitionglobalId } = useParams<{ competitionglobalId: string }>();

  const {
    loading,
    disabledButton,
    isEdit,
    loadingCompetitionglobal,
    formCompetitionglobal,
    ruleNumberOfTeams,
    teamglobalIdsCount,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnChangeCountrySelect,
    handleOnChangeRuleSelect,
    handleOnChangeTeamglobalSelect,
  } = useInsertCompetitionglobal(competitionglobalId);

  const navigate = useNavigate();

  const { countries } = useCountry();
  const { rules } = useRule();
  const { teamsglobal } = useTeamglobal();

  const handleOnClickCancel = () => {
    navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Página inicial',
          navigateTo: HomeRoutesEnum.HOME,
        },
        {
          name: 'Competições',
          navigateTo: CompetitionglobalRoutesEnum.COMPETITIONGLOBAL,
        },
        {
          name: `${isEdit ? 'Editar' : 'Inserir'} competição`,
        },
      ]}
    >
      {loadingCompetitionglobal ? (
        <FlexProject justify="center" align="center">
          <LoadingProject width={50} height={50} />
        </FlexProject>
      ) : (
        <FlexProject justify="center">
          <LimitedContainerProject width={805}>
            <Form layout="vertical" form={formCompetitionglobal}>
              <FlexProject justify="space-between">
                <LimitedContainerCardProject width={400}>
                  <FlexProject justify="space-between">
                    <LimitedContainerProject width={250}>
                      <Form.Item
                        label="Nome"
                        name="name"
                        required
                        rules={[
                          { required: true, message: 'Este campo deve ser preenchido.' },
                          {
                            min: COMPETITIONGLOBAL_MIN_LENGH_NAME,
                            message: `Inclua pelo menos ${COMPETITIONGLOBAL_MIN_LENGH_NAME} caracteres.`,
                          },
                          {
                            max: COMPETITIONGLOBAL_MAX_LENGH_NAME,
                            message: `Inclua até ${COMPETITIONGLOBAL_MAX_LENGH_NAME} caracteres.`,
                          },
                        ]}
                      >
                        <InputProject
                          placeholder="Nome"
                          onChange={(event) => handleOnChangeInput(event, 'name')}
                        />
                      </Form.Item>
                    </LimitedContainerProject>
                    <LimitedContainerProject width={100}>
                      <Form.Item
                        label="Temporada"
                        name="season"
                        required
                        rules={[
                          { required: true, message: 'Este campo deve ser preenchido.' },
                          {
                            min: COMPETITIONGLOBAL_MIN_LENGH_SEASON,
                            message: `Inclua pelo menos ${COMPETITIONGLOBAL_MIN_LENGH_SEASON} caracteres.`,
                          },
                          {
                            max: COMPETITIONGLOBAL_MAX_LENGH_SEASON,
                            message: `Inclua até ${COMPETITIONGLOBAL_MAX_LENGH_SEASON} caracteres.`,
                          },
                        ]}
                      >
                        <InputProject
                          placeholder="Temporada"
                          onChange={(event) => handleOnChangeInput(event, 'season')}
                        />
                      </Form.Item>
                    </LimitedContainerProject>
                  </FlexProject>

                  <Form.Item
                    label="Caminho da imagem"
                    name="srcImage"
                    required
                    rules={[{ required: true, message: 'Este campo deve ser preenchido.' }]}
                  >
                    <InputProject
                      placeholder="Caminho da imagem"
                      onChange={(event) => handleOnChangeInput(event, 'srcImage')}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Regras"
                    name="ruleId"
                    required
                    rules={[{ required: true, message: 'Este campo deve ser preenchido.' }]}
                  >
                    <SelectProject
                      placeholder="Selecione as regras"
                      allowClear
                      onChange={handleOnChangeRuleSelect}
                      options={rules.map((rule: RuleType) => ({
                        value: `${rule.id}`,
                        label: `${rule.name}: ${rule.numberOfTeams} times; Até ${rule.yellowCardsMax} cartões amarelos.`,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    label="País"
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
                      disabled={isEdit}
                    />
                  </Form.Item>

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
                <LimitedContainerCardProject width={400}>
                  <Form.Item
                    label={
                      ruleNumberOfTeams > 0 ? (
                        <Typography.Text type="secondary">
                          <Typography.Text>Times</Typography.Text> ({teamglobalIdsCount} /{' '}
                          {ruleNumberOfTeams})
                        </Typography.Text>
                      ) : (
                        `Times`
                      )
                    }
                    name="teamglobalIds"
                    required
                    rules={[
                      { required: true, message: 'Este campo deve ser preenchido.' },
                      {
                        validator: (_, value) =>
                          !value || value.length === 0
                            ? Promise.resolve()
                            : value.length === ruleNumberOfTeams
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error(`Você deve selecionar ${ruleNumberOfTeams} times.`),
                                ),
                      },
                    ]}
                  >
                    <SelectProject
                      placeholder={
                        ruleNumberOfTeams > 0 ? 'Selecione os times' : 'Selecione as regras'
                      }
                      allowClear
                      mode="multiple"
                      maxCount={ruleNumberOfTeams}
                      disabled={ruleNumberOfTeams === 0}
                      onChange={handleOnChangeTeamglobalSelect}
                      options={teamsglobal.map((teamglobal: TeamglobalType) => ({
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
                          .localeCompare(
                            optionB.label.props.children[1].props.children.toLowerCase(),
                          )
                      }
                    />
                  </Form.Item>
                </LimitedContainerCardProject>
              </FlexProject>
            </Form>
          </LimitedContainerProject>
        </FlexProject>
      )}
    </Screen>
  );
};

export default CompetitionglobalInsert;
