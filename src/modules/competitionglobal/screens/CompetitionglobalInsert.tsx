import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import Select from '../../../shared/components/select/Select';
import {
  DisplayFlexAlignCenter,
  DisplayFlexDirectionRow,
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import {
  LimitedContainer,
  LimitedContainerCard,
} from '../../../shared/components/styles/limited.styled';
import CountrySVG from '../../../shared/components/svg/CountrySVG';
import { RuleType } from '../../../shared/types/RuleType';
import { useCountry } from '../../country/hooks/useCountry';
import { useRule } from '../../rule/hooks/useRule';
import { useInsertCompetitionglobal } from '../hooks/useInsertCompetitionglobal';
import { CompetitionglobalRoutesEnum } from '../routes';

const CompetitionglobalInsert = () => {
  const {
    competitionglobal,
    loading,
    disabledButton,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
    handleOnChangeRuleSelect,
  } = useInsertCompetitionglobal();

  const { countries } = useCountry();
  const { rules } = useRule();

  const navigate = useNavigate();

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
          name: 'INSERIR COMPETIÇÃO',
        },
      ]}
    >
      <DisplayFlexJustifyCenter>
        <LimitedContainerCard width={400}>
          <Input
            onChange={(event) => handleOnChangeInput(event, 'name')}
            value={competitionglobal.name}
            margin="0px 0px 16px 0px"
            title="Nome"
            placeholder="Nome"
          />
          <Input
            onChange={(event) => handleOnChangeInput(event, 'season')}
            value={competitionglobal.season}
            margin="0px 0px 16px 0px"
            title="Temporada"
            placeholder="Temporada"
          />
          <Input
            onChange={(event) => handleOnChangeInput(event, 'srcImage')}
            value={competitionglobal.srcImage}
            margin="0px 0px 16px 0px"
            title="Caminho da imagem"
            placeholder="Caminho da imagem"
          />
          <Select
            title="Regras"
            margin="0px 0px 32px 0px"
            onChange={handleOnChangeRuleSelect}
            options={rules.map((rule: RuleType) => ({
              value: `${rule.id}`,
              label: `${rule.name}`,
            }))}
          />
          <Select
            title="País"
            margin="0px 0px 32px 0px"
            onChange={handleOnChangeCountrySelect}
            options={countries.map((country) => ({
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
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button onClick={handleOnClickCancel}>Cancelar</Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button
                loading={loading}
                disabled={disabledButton}
                onClick={handleOnClickInsert}
                type="primary"
              >
                Inserir
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainerCard>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default CompetitionglobalInsert;
