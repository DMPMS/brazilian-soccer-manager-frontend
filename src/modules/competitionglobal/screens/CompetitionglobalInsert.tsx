import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Image from '../../../shared/components/image/Image';
import Input from '../../../shared/components/inputs/input/Input';
import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import Select from '../../../shared/components/select/Select';
import {
  DisplayFlexAlignCenter,
  DisplayFlexDirectionRow,
  DisplayFlexJustifyBetween,
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import {
  LimitedContainer,
  LimitedContainerCard,
} from '../../../shared/components/styles/limited.styled';
import CountrySVG from '../../../shared/components/svg/CountrySVG';
import { CountryType } from '../../../shared/types/CountryType';
import { RuleType } from '../../../shared/types/RuleType';
import { TeamglobalType } from '../../../shared/types/TeamglobalType';
import { useCountry } from '../../country/hooks/useCountry';
import { useRule } from '../../rule/hooks/useRule';
import { useTeamglobal } from '../../teamglobal/hooks/useTeamglobal';
import { useInsertCompetitionglobal } from '../hooks/useInsertCompetitionglobal';
import { CompetitionglobalRoutesEnum } from '../routes';

const CompetitionglobalInsert = () => {
  const { competitionglobalId } = useParams<{ competitionglobalId: string }>();

  const {
    competitionglobal,
    loading,
    disabledButton,
    isEdit,
    loadingCompetitionglobal,
    ruleNumberOfTeams,
    selectedTeamglobalIds,
    handleOnChangeInput,
    handleOnClickInsert,
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
          name: 'PÁGINA INICIAL',
        },
        {
          name: 'COMPETIÇÕES',
          navigateTo: CompetitionglobalRoutesEnum.COMPETITIONGLOBAL,
        },
        {
          name: `${isEdit ? 'EDITAR' : 'INSERIR'} COMPETIÇÃO`,
        },
      ]}
    >
      {loadingCompetitionglobal ? (
        <DisplayFlexJustifyCenter>
          <LimitedContainerCard width={400}>
            <DisplayFlexJustifyCenter>
              <Loading size="large" />
            </DisplayFlexJustifyCenter>
          </LimitedContainerCard>
        </DisplayFlexJustifyCenter>
      ) : (
        <DisplayFlexJustifyCenter>
          <LimitedContainerCard width={825}>
            <DisplayFlexJustifyBetween>
              <LimitedContainer width={400}>
                <DisplayFlexJustifyBetween>
                  <LimitedContainer width={250}>
                    <Input
                      onChange={(event) => handleOnChangeInput(event, 'name')}
                      value={competitionglobal.name}
                      margin="0px 0px 16px 0px"
                      title="Nome"
                      placeholder="Nome"
                    />
                  </LimitedContainer>
                  <LimitedContainer width={100}>
                    <Input
                      onChange={(event) => handleOnChangeInput(event, 'season')}
                      value={competitionglobal.season}
                      margin="0px 0px 16px 0px"
                      title="Temporada"
                      placeholder="Temporada"
                    />
                  </LimitedContainer>
                </DisplayFlexJustifyBetween>
                <Input
                  onChange={(event) => handleOnChangeInput(event, 'srcImage')}
                  value={competitionglobal.srcImage}
                  margin="0px 0px 16px 0px"
                  title="Caminho da imagem"
                  placeholder="Caminho da imagem"
                />
                <Select
                  title="Regras"
                  placeholder="Selecione as regras"
                  margin="0px 0px 16px 0px"
                  onChange={handleOnChangeRuleSelect}
                  value={
                    competitionglobal.ruleId !== undefined
                      ? `${competitionglobal.ruleId}`
                      : undefined
                  }
                  options={rules.map((rule: RuleType) => ({
                    value: `${rule.id}`,
                    label: `${rule.name}: ${rule.numberOfTeams} times; Até ${rule.yellowCardsMax} cartões amarelos.`,
                  }))}
                />
                <Select
                  title="País"
                  placeholder="Selecione um país"
                  margin="0px 0px 32px 0px"
                  onChange={handleOnChangeCountrySelect}
                  value={
                    competitionglobal.countryId !== undefined
                      ? `${competitionglobal.countryId}`
                      : undefined
                  }
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
                  disabled={isEdit}
                />
              </LimitedContainer>
              <LimitedContainer width={400}>
                <Select
                  title={
                    ruleNumberOfTeams > 0
                      ? `Times (${selectedTeamglobalIds.length} / ${ruleNumberOfTeams})`
                      : `Times`
                  }
                  placeholder={ruleNumberOfTeams > 0 ? 'Selecione os times' : 'Selecione as regras'}
                  margin="0px 0px 16px 0px"
                  mode="multiple"
                  maxCount={ruleNumberOfTeams}
                  disabled={ruleNumberOfTeams === 0}
                  onChange={handleOnChangeTeamglobalSelect}
                  value={
                    competitionglobal.teamglobalIds !== undefined
                      ? competitionglobal.teamglobalIds.map((teamglobalId) => `${teamglobalId}`)
                      : undefined
                  }
                  options={teamsglobal.map((teamglobal: TeamglobalType) => ({
                    value: `${teamglobal.id}`,
                    label: (
                      <DisplayFlexDirectionRow>
                        <DisplayFlexAlignCenter margin="0px 5px 0px 0px">
                          <Image src={teamglobal.srcImage} width={20} height={20} />
                        </DisplayFlexAlignCenter>
                        <text>{teamglobal.name}</text>
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
              </LimitedContainer>
            </DisplayFlexJustifyBetween>
            <DisplayFlexJustifyRight>
              <LimitedContainer margin="0px 8px 0px 0px" width={120}>
                <Button onClick={handleOnClickCancel}>Cancelar</Button>
              </LimitedContainer>
              <LimitedContainer width={120}>
                <Button
                  loading={loading}
                  disabled={disabledButton}
                  onClick={handleOnClickInsert}
                  type="primary"
                >
                  {isEdit ? 'Salvar' : 'Inserir'}
                </Button>
              </LimitedContainer>
            </DisplayFlexJustifyRight>
          </LimitedContainerCard>
        </DisplayFlexJustifyCenter>
      )}
    </Screen>
  );
};

export default CompetitionglobalInsert;
