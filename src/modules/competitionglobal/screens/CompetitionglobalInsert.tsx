import { Form } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import FlexProject from '../../../shared/components/flex/FlexProject';
import Image from '../../../shared/components/image/Image';
import InputProject from '../../../shared/components/inputs/input/InputProject';
import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import SelectProject from '../../../shared/components/select/SelectProject';
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
    loading,
    disabledButton,
    isEdit,
    loadingCompetitionglobal,
    formCompetitionglobal,
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
            <Form layout="vertical" form={formCompetitionglobal}>
              <FlexProject justify="space-between">
                <LimitedContainerCard width={400}>
                  <FlexProject justify="space-between">
                    <LimitedContainer width={250}>
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
                    </LimitedContainer>
                    <LimitedContainer width={100}>
                      <Form.Item
                        label="Temporada"
                        name="season"
                        required
                        rules={[
                          { required: true, message: 'Este campo deve ser preenchido.' },
                          { min: 3, message: 'Inclua pelo menos 3 caracteres.' },
                          { max: 12, message: 'Inclua até 12 caracteres.' },
                        ]}
                      >
                        <InputProject
                          placeholder="Temporada"
                          onChange={(event) => handleOnChangeInput(event, 'season')}
                        />
                      </Form.Item>
                    </LimitedContainer>
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
                      onChange={handleOnChangeCountrySelect}
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
                  </Form.Item>

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
                  <Form.Item
                    label={
                      ruleNumberOfTeams > 0
                        ? `Times (${teamglobalIdsCount} / ${ruleNumberOfTeams})`
                        : `Times`
                    }
                    name="teamglobalIds"
                    required
                    rules={[{ required: true, message: 'Este campo deve ser preenchido.' }]}
                  >
                    <SelectProject
                      placeholder={
                        ruleNumberOfTeams > 0 ? 'Selecione os times' : 'Selecione as regras'
                      }
                      mode="multiple"
                      maxCount={ruleNumberOfTeams}
                      disabled={ruleNumberOfTeams === 0}
                      onChange={handleOnChangeTeamglobalSelect}
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
                          .localeCompare(
                            optionB.label.props.children[1].props.children.toLowerCase(),
                          )
                      }
                    />
                  </Form.Item>
                </LimitedContainerCard>
              </FlexProject>
            </Form>
          </LimitedContainer>
        </FlexProject>
      )}
    </Screen>
  );
};

export default CompetitionglobalInsert;
