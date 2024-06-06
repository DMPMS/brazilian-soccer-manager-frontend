import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import FlexProject from '../../../shared/components/flex/FlexProject';
import Input from '../../../shared/components/inputs/input/Input';
import InputInteger from '../../../shared/components/inputs/inputInteger/InputInteger';
import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import Select from '../../../shared/components/select/Select';
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
          name: 'Página inicial',
        },
        {
          name: 'Jogadores',
          navigateTo: PlayerglobalRoutesEnum.PLAYERGLOBAL,
        },
        {
          name: `${isEdit ? 'Editar' : 'Inserir'} jogador`,
        },
      ]}
    >
      {loadingPlayerglobal ? (
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
                  onChange={handleOnChangeCountrySelect}
                  value={
                    playerglobal.countryId !== undefined ? `${playerglobal.countryId}` : undefined
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
                  title={`Posições primárias (${selectedPrimaryPositionIds.length} / ${PRIMARY_POSITIONS_MAX})`}
                  placeholder="Selecione as posições"
                  margin="0px 0px 16px 0px"
                  mode="multiple"
                  maxCount={PRIMARY_POSITIONS_MAX}
                  onChange={handleOnChangePrimaryPositionSelect}
                  allowClear
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
                      <FlexProject justify="flex-start" align="center">
                        <PositionTag area={position?.area}>{position?.abbreviation}</PositionTag>
                        <text>{position.name}</text>
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
                <Select
                  title={`Posições secundárias (${selectedSecondaryPositionIds.length} / ${SECONDARY_POSITIONS_MAX})`}
                  placeholder="Selecione as posições"
                  mode="multiple"
                  maxCount={SECONDARY_POSITIONS_MAX}
                  onChange={handleOnChangeSecondaryPositionSelect}
                  allowClear
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
                      <FlexProject justify="flex-start" align="center">
                        <PositionTag area={position?.area}>{position?.abbreviation}</PositionTag>
                        <text>{position.name}</text>
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
              </LimitedContainerCard>
            </FlexProject>
          </LimitedContainer>
        </FlexProject>
      )}
    </Screen>
  );
};

export default PlayerglobalInsert;
