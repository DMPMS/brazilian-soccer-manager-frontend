import { Form, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
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
  TEAMGLOBAL_MAX_LENGH_NAME,
  TEAMGLOBAL_MAX_PLAYERSGLOBAL,
  TEAMGLOBAL_MIN_LENGH_NAME,
  TEAMGLOBAL_MIN_PLAYERSGLOBAL,
} from '../../../../shared/constants/others';
import { CountryType } from '../../../../shared/types/Country.type';
import { ManagerglobalType } from '../../../../shared/types/Managerglobal.type';
import { PlayerglobalType } from '../../../../shared/types/Playerglobal.type';
import { useCountry } from '../../../shared/country/hooks/useCountry';
import { HomeRoutesEnum } from '../../home/routes';
import { useInsertTeamglobal } from '../hooks/useInsertTeamglobal';
import { TeamglobalRoutesEnum } from '../routes';

const TeamglobalInsert = () => {
  const { teamglobalId } = useParams<{ teamglobalId: string }>();

  const {
    loading,
    disabledButton,
    isEdit,
    loadingTeamglobal,
    formTeamglobal,
    playerglobalIdsCount,
    managerglobalOfTeamglobalReducer,
    playersglobalOfTeamglobalReducer,
    managersglobalWithoutTeamglobal,
    playersglobalWithoutTeamglobal,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeCountrySelect,
    handleOnChangeManagerglobalSelect,
    handleOnChangePlayerglobalSelect,
  } = useInsertTeamglobal(teamglobalId);

  const { countries } = useCountry();

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Página inicial',
          navigateTo: HomeRoutesEnum.HOME,
        },
        {
          name: 'Times',
          navigateTo: TeamglobalRoutesEnum.TEAMGLOBAL,
        },
        {
          name: `${isEdit ? 'Editar' : 'Inserir'} time`,
        },
      ]}
    >
      {loadingTeamglobal ? (
        <FlexProject justify="center">
          <LoadingProject width={50} height={50} />
        </FlexProject>
      ) : (
        <FlexProject justify="center">
          <LimitedContainerProject width={1005}>
            <Form layout="vertical" form={formTeamglobal} onFinish={handleOnClickInsert}>
              <FlexProject justify="space-between">
                <LimitedContainerCardProject width={400}>
                  <Form.Item
                    label="Nome"
                    name="name"
                    required
                    rules={[
                      { required: true, message: 'Este campo deve ser preenchido.' },
                      {
                        min: TEAMGLOBAL_MIN_LENGH_NAME,
                        message: `Inclua pelo menos ${TEAMGLOBAL_MIN_LENGH_NAME} caracteres.`,
                      },
                      {
                        max: TEAMGLOBAL_MAX_LENGH_NAME,
                        message: `Inclua até ${TEAMGLOBAL_MAX_LENGH_NAME} caracteres.`,
                      },
                    ]}
                  >
                    <InputProject
                      placeholder="Nome"
                      onChange={(event) => handleOnChangeInput(event, 'name')}
                    />
                  </Form.Item>

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

                  <Form.Item
                    label="Treinador"
                    name="managerglobalId"
                    required
                    rules={[{ required: true, message: 'Este campo deve ser preenchido.' }]}
                  >
                    <SelectProject
                      placeholder="Selecione o treinador"
                      allowClear
                      onChange={handleOnChangeManagerglobalSelect}
                      options={[
                        ...(managerglobalOfTeamglobalReducer !== undefined
                          ? [
                              {
                                value: `${managerglobalOfTeamglobalReducer.id}`,
                                label: `${managerglobalOfTeamglobalReducer.name}`,
                              },
                            ]
                          : []),
                        ...managersglobalWithoutTeamglobal.map(
                          (managerglobal: ManagerglobalType) => ({
                            value: `${managerglobal.id}`,
                            label: `${managerglobal.name}`,
                          }),
                        ),
                      ]}
                      showSearch
                      filterOption={(input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase())
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())
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
                      <Typography.Text type="secondary">
                        <Typography.Text>Jogadores</Typography.Text> ({playerglobalIdsCount} /{' '}
                        {TEAMGLOBAL_MAX_PLAYERSGLOBAL})
                      </Typography.Text>
                    }
                    name="playerglobalIds"
                    required
                    rules={[
                      { required: true, message: 'Este campo deve ser preenchido.' },
                      {
                        validator: (_, value) => {
                          if (!value || value.length === 0) {
                            return Promise.resolve();
                          } else if (value.length >= TEAMGLOBAL_MIN_PLAYERSGLOBAL) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(
                              new Error(
                                `Você deve selecionar pelo menos ${TEAMGLOBAL_MIN_PLAYERSGLOBAL} jogadores.`,
                              ),
                            );
                          }
                        },
                      },
                    ]}
                  >
                    <SelectProject
                      placeholder="Selecione os jogadores"
                      allowClear
                      mode="multiple"
                      maxCount={TEAMGLOBAL_MAX_PLAYERSGLOBAL}
                      onChange={handleOnChangePlayerglobalSelect}
                      options={[
                        ...playersglobalOfTeamglobalReducer.map(
                          (playerglobal: PlayerglobalType) => ({
                            value: `${playerglobal.id}`,
                            label: `${playerglobal.name}`,
                          }),
                        ),
                        ...playersglobalWithoutTeamglobal.map((playerglobal: PlayerglobalType) => ({
                          value: `${playerglobal.id}`,
                          label: `${playerglobal.name}`,
                        })),
                      ]}
                      showSearch
                      filterOption={(input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase())
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())
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

export default TeamglobalInsert;
