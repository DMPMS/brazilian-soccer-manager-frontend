import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Typography } from 'antd';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import DatePickerProject from '../../../../shared/components/datepickers/datePickerProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageProject from '../../../../shared/components/image/ImageProject';
import InputProject from '../../../../shared/components/inputs/input/InputProject';
import InputIntegerProject from '../../../../shared/components/inputs/inputInteger/InputIntegerProject';
import LoadingProject from '../../../../shared/components/loading/LoadingProject';
import PlayerPositionsRating from '../../../../shared/components/others/playerPositionsRating/playerPositionsRating';
import Screen from '../../../../shared/components/screen/ScreenProject';
import SelectProject from '../../../../shared/components/select/SelectProject';
import {
  LimitedContainerCardProject,
  LimitedContainerProject,
} from '../../../../shared/components/styles/limited.styled';
import CountrySVGProject from '../../../../shared/components/svg/CountrySVGProject';
import PositionTagProject from '../../../../shared/components/tags/positionTag/PositionTagProject';
import {
  CURRENT_DATE_UTC,
  DATE_FORMAT,
  PLAYERGLOBAL_MAX_AGE,
  PLAYERGLOBAL_MAX_LENGH_NAME,
  PLAYERGLOBAL_MAX_OVERALL,
  PLAYERGLOBAL_MAX_PRIMARY_POSITIONS,
  PLAYERGLOBAL_MAX_SECONDARY_POSITIONS,
  PLAYERGLOBAL_MIN_AGE,
  PLAYERGLOBAL_MIN_LENGH_NAME,
  PLAYERGLOBAL_MIN_OVERALL,
  TEAMGLOBAL_MAX_PLAYERSGLOBAL,
} from '../../../../shared/constants/others';
import { PLAYERGLOBAL_MIN_PRIMARY_POSITIONS } from '../../../../shared/constants/others';
import { CountryType } from '../../../../shared/types/Country.type';
import { PositionType } from '../../../../shared/types/Position.type';
import { TeamglobalType } from '../../../../shared/types/Teamglobal.type';
import { useCountry } from '../../../shared/country/hooks/useCountry';
import { usePosition } from '../../../shared/position/hooks/usePosition';
import { HomeRoutesEnum } from '../../home/routes';
import { useTeamglobal } from '../../teamglobal/hooks/useTeamglobal';
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
    playerglobalReducerTeamglobalId,
    playerglobal,
    handleOnChangeInput,
    handleOnChangeInputNumber,
    handleOnChangeDatePicker,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeCountrySelect,
    handleOnChangeTeamglobalSelect,
    handleOnChangePrimaryPositionSelect,
    handleOnChangeSecondaryPositionSelect,
  } = useInsertPlayerglobal(playerglobalId);

  const { countries } = useCountry();
  const { teamsglobal } = useTeamglobal();
  const { positions } = usePosition();

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Página inicial',
          navigateTo: HomeRoutesEnum.HOME,
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
          <LoadingProject width={50} height={50} />
        </FlexProject>
      ) : (
        <FlexProject justify="center">
          <LimitedContainerProject width={1110}>
            <Form layout="vertical" form={formPlayerglobal}>
              <FlexProject justify="space-between">
                <LimitedContainerCardProject width={400}>
                  <Form.Item
                    label="Nome"
                    name="name"
                    required
                    rules={[
                      { required: true, message: 'Este campo deve ser preenchido.' },
                      {
                        min: PLAYERGLOBAL_MIN_LENGH_NAME,
                        message: `Inclua pelo menos ${PLAYERGLOBAL_MIN_LENGH_NAME} caracteres.`,
                      },
                      {
                        max: PLAYERGLOBAL_MAX_LENGH_NAME,
                        message: `Inclua até ${PLAYERGLOBAL_MAX_LENGH_NAME} caracteres.`,
                      },
                    ]}
                  >
                    <InputProject
                      placeholder="Nome"
                      onChange={(event) => handleOnChangeInput(event, 'name')}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Data de nascimento"
                    name="birthdate"
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
                            PLAYERGLOBAL_MIN_AGE,
                            'year',
                          ).startOf('day');

                          const maxDate = CURRENT_DATE_UTC.subtract(
                            PLAYERGLOBAL_MAX_AGE,
                            'year',
                          ).startOf('day');

                          if (birthdate.isAfter(minDate)) {
                            return Promise.reject(`A idade mínima é ${PLAYERGLOBAL_MIN_AGE} anos.`);
                          } else if (birthdate.isBefore(maxDate)) {
                            return Promise.reject(`A idade máxima é ${PLAYERGLOBAL_MAX_AGE} anos.`);
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <DatePickerProject
                      placeholder="Selecione a data"
                      minDate={CURRENT_DATE_UTC.subtract(PLAYERGLOBAL_MAX_AGE, 'year').startOf(
                        'day',
                      )}
                      maxDate={CURRENT_DATE_UTC.subtract(PLAYERGLOBAL_MIN_AGE, 'year').startOf(
                        'day',
                      )}
                      onChange={(date) => handleOnChangeDatePicker(date, 'birthdate')}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Geral"
                    name="overall"
                    required
                    rules={[
                      { required: true, message: 'Este campo deve ser preenchido.' },
                      {
                        type: 'number',
                        min: PLAYERGLOBAL_MIN_OVERALL,
                        message: `O geral mínimo é ${PLAYERGLOBAL_MIN_OVERALL}.`,
                      },
                      {
                        type: 'number',
                        max: PLAYERGLOBAL_MAX_OVERALL,
                        message: `O geral máximo é ${PLAYERGLOBAL_MAX_OVERALL}.`,
                      },
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
                    label="Time"
                    name="teamglobalId"
                    tooltip={{
                      title:
                        'Times que já atingiram o número máximo de jogadores aparecerão como uma opção desabilitada.',
                      icon: <InfoCircleOutlined />,
                    }}
                  >
                    <SelectProject
                      placeholder="Selecione o time"
                      allowClear
                      onChange={handleOnChangeTeamglobalSelect}
                      options={teamsglobal.map((teamglobal: TeamglobalType) => ({
                        value: `${teamglobal.id}`,
                        disabled:
                          teamglobal.playersglobalCount === TEAMGLOBAL_MAX_PLAYERSGLOBAL
                            ? teamglobal.id === playerglobalReducerTeamglobalId
                              ? false
                              : true
                            : false,
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

                  <Form.Item
                    label={
                      <Typography.Text type="secondary">
                        <Typography.Text>Posições primárias</Typography.Text> (
                        {playerglobal.primaryPositionIds.length} /{' '}
                        {PLAYERGLOBAL_MAX_PRIMARY_POSITIONS})
                      </Typography.Text>
                    }
                    name="primaryPositionIds"
                    required
                    rules={[
                      { required: true, message: 'Este campo deve ser preenchido.' },
                      {
                        validator: (_, value) =>
                          !value || value.length === 0
                            ? Promise.resolve()
                            : value.length >= PLAYERGLOBAL_MIN_PRIMARY_POSITIONS
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error(
                                    `Você deve selecionar pelo menos ${PLAYERGLOBAL_MIN_PRIMARY_POSITIONS} posições.`,
                                  ),
                                ),
                      },
                    ]}
                  >
                    <SelectProject
                      placeholder="Selecione as posição"
                      allowClear
                      mode="multiple"
                      maxCount={PLAYERGLOBAL_MAX_PRIMARY_POSITIONS}
                      onChange={handleOnChangePrimaryPositionSelect}
                      options={positions.map((position: PositionType) => ({
                        value: `${position.id}`,
                        disabled: playerglobal.secondaryPositionIds.includes(position.id)
                          ? true
                          : false,
                        label: (
                          <FlexProject justify="flex-start" align="center">
                            <PositionTagProject area={position?.area}>
                              {position?.abbreviation}
                            </PositionTagProject>
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
                    label={
                      <Typography.Text type="secondary">
                        <Typography.Text>Posições secundárias</Typography.Text> (
                        {playerglobal.secondaryPositionIds.length} /{' '}
                        {PLAYERGLOBAL_MAX_SECONDARY_POSITIONS})
                      </Typography.Text>
                    }
                    name="secondaryPositionIds"
                  >
                    <SelectProject
                      placeholder="Selecione as posições"
                      allowClear
                      mode="multiple"
                      maxCount={PLAYERGLOBAL_MAX_SECONDARY_POSITIONS}
                      onChange={handleOnChangeSecondaryPositionSelect}
                      options={positions.map((position: PositionType) => ({
                        value: `${position.id}`,
                        disabled: playerglobal.primaryPositionIds.includes(position.id)
                          ? true
                          : false,
                        label: (
                          <FlexProject justify="flex-start" align="center">
                            <PositionTagProject area={position?.area}>
                              {position?.abbreviation}
                            </PositionTagProject>
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
                </LimitedContainerCardProject>
                <LimitedContainerCardProject width={300}>
                  <PlayerPositionsRating
                    playerOverall={playerglobal.overall}
                    primaryPositionIds={playerglobal.primaryPositionIds}
                    secondaryPositionIds={playerglobal.secondaryPositionIds}
                  ></PlayerPositionsRating>
                </LimitedContainerCardProject>
              </FlexProject>
            </Form>
          </LimitedContainerProject>
        </FlexProject>
      )}
    </Screen>
  );
};

export default PlayerglobalInsert;
