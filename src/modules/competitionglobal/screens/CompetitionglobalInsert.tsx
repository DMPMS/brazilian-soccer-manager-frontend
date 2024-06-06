import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import FlexProject from '../../../shared/components/flex/FlexProject';
import Image from '../../../shared/components/image/Image';
import Input from '../../../shared/components/inputs/input/Input';
import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import Select from '../../../shared/components/select/Select';
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
    teamglobalIdsCount,
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
          name: 'Página inicial',
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
        <FlexProject justify="center">
          <LimitedContainerCard width={400}>
            <FlexProject justify="center">
              <Loading size="large" />
            </FlexProject>
          </LimitedContainerCard>
        </FlexProject>
      ) : (
        <FlexProject justify="center">
          <LimitedContainer width={805}>
            <FlexProject justify="space-between">
              <LimitedContainerCard width={400}>
                <FlexProject justify="space-between">
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
                </FlexProject>
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
                  onChange={handleOnChangeCountrySelect}
                  value={
                    competitionglobal.countryId !== undefined
                      ? `${competitionglobal.countryId}`
                      : undefined
                  }
                  margin="0px 0px 16px 0px"
                  options={countries.map((country: CountryType) => ({
                    value: `${country.id}`,
                    label: (
                      <FlexProject justify="flex-start" align="center">
                        <CountrySVG
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
                <FlexProject justify="flex-end">
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
                </FlexProject>
              </LimitedContainerCard>
              <LimitedContainerCard width={400}>
                <Select
                  title={
                    ruleNumberOfTeams > 0
                      ? `Times (${teamglobalIdsCount} / ${ruleNumberOfTeams})`
                      : `Times`
                  }
                  placeholder={ruleNumberOfTeams > 0 ? 'Selecione os times' : 'Selecione as regras'}
                  margin="0px 0px 16px 0px"
                  mode="multiple"
                  maxCount={ruleNumberOfTeams}
                  disabled={ruleNumberOfTeams === 0}
                  onChange={handleOnChangeTeamglobalSelect}
                  allowClear
                  value={
                    competitionglobal.teamglobalIds !== undefined
                      ? competitionglobal.teamglobalIds.map((teamglobalId) => `${teamglobalId}`)
                      : undefined
                  }
                  options={teamsglobal.map((teamglobal: TeamglobalType) => ({
                    value: `${teamglobal.id}`,
                    label: (
                      <FlexProject justify="flex-start" align="center">
                        <Image
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
              </LimitedContainerCard>
            </FlexProject>
          </LimitedContainer>
        </FlexProject>
      )}
    </Screen>
  );
};

export default CompetitionglobalInsert;
