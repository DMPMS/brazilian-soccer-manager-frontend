import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import InputInteger from '../../../shared/components/inputs/inputInteger/InputInteger';
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
import PositionTag from '../../../shared/components/tags/positionTag/PositionTag';
import { CountryType } from '../../../shared/types/CountryType';
import { PositionType } from '../../../shared/types/PositionType';
import { useCountry } from '../../country/hooks/useCountry';
import { usePosition } from '../../position/hooks/usePosition';
import { useInsertPlayerglobal } from '../hooks/useInsertPlayerglobal';
import { PlayerglobalRoutesEnum } from '../routes';

const PlayerglobalInsert = () => {
  const { playerglobalId } = useParams<{ playerglobalId: string }>();

  const {
    playerglobal,
    loading,
    disabledButton,
    isEdit,
    loadingPlayerglobal,
    selectedPrimaryPositionIds,
    selectedSecondaryPositionIds,
    PRIMARY_POSITIONS_MAX,
    SECONDARY_POSITIONS_MAX,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
    handleOnChangePrimaryPositionSelect,
    handleOnChangeSecondaryPositionSelect,
  } = useInsertPlayerglobal(playerglobalId);

  const navigate = useNavigate();

  const { countries } = useCountry();
  const { positions } = usePosition();

  const handleOnClickCancel = () => {
    navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'PÁGINA INICIAL',
        },
        {
          name: 'JOGADORES',
          navigateTo: PlayerglobalRoutesEnum.PLAYERGLOBAL,
        },
        {
          name: `${isEdit ? 'EDITAR' : 'INSERIR'} JOGADOR`,
        },
      ]}
    >
      {loadingPlayerglobal ? (
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
                <Input
                  onChange={(event) => handleOnChangeInput(event, 'name')}
                  value={playerglobal.name}
                  margin="0px 0px 16px 0px"
                  title="Nome"
                  placeholder="Nome"
                />
                <InputInteger
                  onChange={(event) => handleOnChangeInput(event, 'age', true)}
                  value={playerglobal.age}
                  margin="0px 0px 16px 0px"
                  title="Idade"
                  placeholder="Idade"
                />
                <InputInteger
                  onChange={(event) => handleOnChangeInput(event, 'overall', true)}
                  value={playerglobal.overall}
                  margin="0px 0px 16px 0px"
                  title="Geral"
                  placeholder="Geral"
                />
                <Select
                  title="Nacionalidade"
                  placeholder="Selecione um país"
                  margin="0px 0px 16px 0px"
                  onChange={handleOnChangeCountrySelect}
                  value={
                    playerglobal.countryId !== undefined ? `${playerglobal.countryId}` : undefined
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
                />
              </LimitedContainer>
              <LimitedContainer width={400}>
                <Select
                  title={`Posições primárias (${selectedPrimaryPositionIds.length} / ${PRIMARY_POSITIONS_MAX})`}
                  placeholder="Selecione as posições"
                  margin="0px 0px 16px 0px"
                  mode="multiple"
                  maxCount={PRIMARY_POSITIONS_MAX}
                  onChange={handleOnChangePrimaryPositionSelect}
                  value={
                    playerglobal.primaryPositionIds !== undefined
                      ? playerglobal.primaryPositionIds.map(
                          (primaryPositionId) => `${primaryPositionId}`,
                        )
                      : undefined
                  }
                  options={positions.map((position: PositionType) => ({
                    value: `${position.id}`,
                    disabled: selectedSecondaryPositionIds.includes(position.id) ? true : false,
                    label: (
                      <DisplayFlexDirectionRow>
                        <DisplayFlexAlignCenter>
                          <PositionTag area={position?.area}>{position?.abbreviation}</PositionTag>
                        </DisplayFlexAlignCenter>
                        <text>{position.name}</text>
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
                <Select
                  title={`Posições secundárias (${selectedSecondaryPositionIds.length} / ${SECONDARY_POSITIONS_MAX})`}
                  placeholder="Selecione as posições"
                  margin="0px 0px 32px 0px"
                  mode="multiple"
                  maxCount={SECONDARY_POSITIONS_MAX}
                  onChange={handleOnChangeSecondaryPositionSelect}
                  value={
                    playerglobal.secondaryPositionIds !== undefined
                      ? playerglobal.secondaryPositionIds.map(
                          (secondaryPositionId) => `${secondaryPositionId}`,
                        )
                      : undefined
                  }
                  options={positions.map((position: PositionType) => ({
                    value: `${position.id}`,
                    disabled: selectedPrimaryPositionIds.includes(position.id) ? true : false,
                    label: (
                      <DisplayFlexDirectionRow>
                        <DisplayFlexAlignCenter>
                          <PositionTag area={position?.area}>{position?.abbreviation}</PositionTag>
                        </DisplayFlexAlignCenter>
                        <text>{position.name}</text>
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

export default PlayerglobalInsert;
