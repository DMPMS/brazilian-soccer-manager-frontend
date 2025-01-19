import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageDivPreviewProject from '../../../../shared/components/images/imageDivPreview/ImageDivPreviewProject';
import ImageProject from '../../../../shared/components/images/imageProject/ImageProject';
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
import { RuleCompetitionTypeEnum } from '../../../../shared/enums/RuleCompetitionType.enum';
import { validateImage } from '../../../../shared/functions/validateImage';
import { CountryType } from '../../../../shared/types/Country.type';
import { RuleType } from '../../../../shared/types/Rule.type';
import { TeamglobalType } from '../../../../shared/types/Teamglobal.type';
import { useCountry } from '../../../shared/country/hooks/useCountry';
import { useRule } from '../../../shared/rule/hooks/useRule';
import { HomeRoutesEnum } from '../../home/routes';
import { useTeamglobal } from '../../teamglobal/hooks/useTeamglobal';
import { useCompetitionglobal } from '../hooks/useCompetitionglobal';
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
    isValidImage,
    srcImage,
    ruleNumberOfTeams,
    ruleCompetitionType,
    teamglobalIdsCount,
    teamglobalOfCompetitionglobalReducerIds,
    teamglobalWithoutCompetitionglobalRuleTypeLeagueIds,
    teamglobalWithoutCompetitionglobalRuleTypeCupIds,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeCountrySelect,
    handleOnChangeRuleSelect,
    handleOnChangeTeamglobalSelect,
  } = useInsertCompetitionglobal(competitionglobalId);

  const { countries } = useCountry();
  const { rules } = useRule();
  const { teamsglobal } = useTeamglobal();
  const { competitionsglobal } = useCompetitionglobal();

  const competitionglobalWithRuleCanBeCreated = (rule: RuleType): boolean => {
    const competitionglobalWithRuleExists = competitionsglobal.find(
      (competitionglobal) => competitionglobal.rule?.competitionType === rule.competitionType,
    );

    if (competitionglobalWithRuleExists) {
      return false;
    }

    if (rule.competitionType === RuleCompetitionTypeEnum.BrazilianLeagueD) {
      const competitionglobalWithRuleBrazilianLeagueCExists = competitionsglobal.find(
        (competitionglobal) =>
          competitionglobal.rule?.competitionType === RuleCompetitionTypeEnum.BrazilianLeagueC,
      );

      if (!competitionglobalWithRuleBrazilianLeagueCExists) {
        return false;
      }
    }

    if (rule.competitionType === RuleCompetitionTypeEnum.BrazilianLeagueC) {
      const competitionglobalWithRuleBrazilianLeagueBExists = competitionsglobal.find(
        (competitionglobal) =>
          competitionglobal.rule?.competitionType === RuleCompetitionTypeEnum.BrazilianLeagueB,
      );

      if (!competitionglobalWithRuleBrazilianLeagueBExists) {
        return false;
      }
    }

    if (rule.competitionType === RuleCompetitionTypeEnum.BrazilianLeagueB) {
      const competitionglobalWithRuleBrazilianLeagueAExists = competitionsglobal.find(
        (competitionglobal) =>
          competitionglobal.rule?.competitionType === RuleCompetitionTypeEnum.BrazilianLeagueA,
      );

      if (!competitionglobalWithRuleBrazilianLeagueAExists) {
        return false;
      }
    }

    if (rule.competitionType === RuleCompetitionTypeEnum.BrazilianSuperCup) {
      const competitionglobalWithRuleBrazilianLeagueAExists = competitionsglobal.find(
        (competitionglobal) =>
          competitionglobal.rule?.competitionType === RuleCompetitionTypeEnum.BrazilianLeagueA,
      );

      const competitionglobalWithRuleBrazilianCupExists = competitionsglobal.find(
        (competitionglobal) =>
          competitionglobal.rule?.competitionType === RuleCompetitionTypeEnum.BrazilianCup,
      );

      if (
        !competitionglobalWithRuleBrazilianLeagueAExists ||
        !competitionglobalWithRuleBrazilianCupExists
      ) {
        return false;
      }
    }

    // Due to the competitionsglobal reducer not being loaded yet. Remove when putting it in useInsertCompetitionglobal.
    if (rule.competitionType === RuleCompetitionTypeEnum.BrazilianLeagueA) {
      return false;
    }

    return true;
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
          <LimitedContainerProject width={1005}>
            <Form layout="vertical" form={formCompetitionglobal} onFinish={handleOnClickInsert}>
              <FlexProject justify="space-between">
                <LimitedContainerCardProject width={400}>
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
                        label: `${rule.name}`,
                        disabled: !competitionglobalWithRuleCanBeCreated(rule),
                      }))}
                      disabled={isEdit}
                    />
                  </Form.Item>

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
                    rules={[
                      { required: true, message: 'Este campo deve ser preenchido.' },
                      {
                        validator: async (_, value) => {
                          if (!value) {
                            return Promise.resolve();
                          }

                          const isValid = await validateImage(value);

                          if (!isValid) {
                            return Promise.reject('Insira um caminho válido.');
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                    ]}
                    tooltip={{
                      title:
                        'Recomenda-se o uso de uma imagem de fundo transparente, com resolução de 100x100 pixels, que ocupe o máximo possível do espaço disponível no quadrado.',
                      icon: <InfoCircleOutlined />,
                    }}
                  >
                    <InputProject
                      placeholder="Caminho da imagem"
                      onChange={(event) => handleOnChangeInput(event, 'srcImage')}
                    />
                  </Form.Item>
                  <FlexProject justify="center">
                    <ImageDivPreviewProject
                      isValidImage={isValidImage}
                      src={srcImage}
                      width={100}
                      height={100}
                    />
                  </FlexProject>

                  <Form.Item
                    label="País"
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
                        type="primary"
                        htmlType="submit"
                      >
                        {isEdit ? 'Salvar' : 'Inserir'}
                      </ButtonProject>
                    </div>
                  </FlexProject>
                </LimitedContainerCardProject>
                <LimitedContainerCardProject width={600}>
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
                        validator: (_, value) => {
                          if (!value || value.length === 0) {
                            return Promise.resolve();
                          } else if (value.length === ruleNumberOfTeams) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(
                              new Error(`Você deve selecionar ${ruleNumberOfTeams} times.`),
                            );
                          }
                        },
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
                      options={teamsglobal
                        .filter((teamglobal: TeamglobalType) =>
                          ruleCompetitionType !== undefined &&
                          [
                            RuleCompetitionTypeEnum.BrazilianLeagueA,
                            RuleCompetitionTypeEnum.BrazilianLeagueB,
                            RuleCompetitionTypeEnum.BrazilianLeagueC,
                            RuleCompetitionTypeEnum.BrazilianLeagueD,
                          ].includes(ruleCompetitionType)
                            ? [
                                ...teamglobalOfCompetitionglobalReducerIds,
                                ...teamglobalWithoutCompetitionglobalRuleTypeLeagueIds,
                              ].includes(teamglobal.id)
                            : ruleCompetitionType !== undefined &&
                                [RuleCompetitionTypeEnum.BrazilianCup].includes(ruleCompetitionType)
                              ? [
                                  ...teamglobalOfCompetitionglobalReducerIds,
                                  ...teamglobalWithoutCompetitionglobalRuleTypeCupIds,
                                ].includes(teamglobal.id)
                              : true,
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
