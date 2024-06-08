import { Form } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import FlexProject from '../../../shared/components/flex/FlexProject';
import InputProject from '../../../shared/components/inputs/input/InputProject';
import InputIntegerProject from '../../../shared/components/inputs/inputInteger/InputIntegerProject';
import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import SelectProject from '../../../shared/components/select/SelectProject';
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
    loading,
    disabledButton,
    isEdit,
    loadingPlayerglobal,
    formPlayerglobal,
    selectedPrimaryPositionIds,
    selectedSecondaryPositionIds,
    PRIMARY_POSITIONS_MAX,
    SECONDARY_POSITIONS_MAX,
    handleOnChangeInput,
    handleOnChangeInputNumber,
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
            <Form layout="vertical" form={formPlayerglobal}>
              <FlexProject justify="space-between">
                <LimitedContainerCard width={400}>
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

                  <Form.Item
                    label="Idade"
                    name="age"
                    required
                    rules={[
                      { required: true, message: 'Este campo deve ser preenchido.' },
                      { type: 'number', min: 14, message: 'A idade mínima é 14.' },
                      { type: 'number', max: 50, message: 'A idade máxima é 50.' },
                    ]}
                  >
                    <InputIntegerProject
                      placeholder="Idade"
                      onChange={(value) => {
                        handleOnChangeInputNumber(value, 'age');
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Geral"
                    name="overall"
                    required
                    rules={[
                      { required: true, message: 'Este campo deve ser preenchido.' },
                      { type: 'number', min: 1, message: 'O geral mínimo é 1.' },
                      { type: 'number', max: 100, message: 'O geral máximo é 100.' },
                    ]}
                  >
                    <InputIntegerProject
                      placeholder="Geral"
                      onChange={(value) => {
                        handleOnChangeInputNumber(value, 'overall');
                      }}
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
                    label={`Posições primárias (${selectedPrimaryPositionIds.length} / ${PRIMARY_POSITIONS_MAX})`}
                    name="primaryPositionIds"
                    required
                    rules={[{ required: true, message: 'Este campo deve ser preenchido.' }]}
                  >
                    <SelectProject
                      placeholder="Selecione pelo menos uma posição"
                      mode="multiple"
                      maxCount={PRIMARY_POSITIONS_MAX}
                      onChange={handleOnChangePrimaryPositionSelect}
                      options={positions.map((position: PositionType) => ({
                        value: `${position.id}`,
                        disabled: selectedSecondaryPositionIds.includes(position.id) ? true : false,
                        label: (
                          <FlexProject justify="flex-start" align="center">
                            <PositionTag area={position?.area}>
                              {position?.abbreviation}
                            </PositionTag>
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
                  </Form.Item>

                  <Form.Item
                    label={`Posições secundárias (${selectedSecondaryPositionIds.length} / ${SECONDARY_POSITIONS_MAX})`}
                    name="secondaryPositionIds"
                  >
                    <SelectProject
                      placeholder="Selecione as posições"
                      mode="multiple"
                      maxCount={SECONDARY_POSITIONS_MAX}
                      onChange={handleOnChangeSecondaryPositionSelect}
                      options={positions.map((position: PositionType) => ({
                        value: `${position.id}`,
                        disabled: selectedPrimaryPositionIds.includes(position.id) ? true : false,
                        label: (
                          <FlexProject justify="flex-start" align="center">
                            <PositionTag area={position?.area}>
                              {position?.abbreviation}
                            </PositionTag>
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

export default PlayerglobalInsert;
