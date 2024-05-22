// import { Upload } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Loading from '../../../shared/components/loading/Loading';
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
import { CountryType } from '../../../shared/types/CountryType';
import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';
// import UploadImage from '../../../shared/components/upload/uploadImage/UploadImage';
// import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { useCountry } from '../../country/hooks/useCountry';
import { useInsertTeamglobal } from '../hooks/useInsertTeamglobal';
import { TeamglobalRoutesEnum } from '../routes';

const TeamglobalInsert = () => {
  const { teamglobalId } = useParams<{ teamglobalId: string }>();

  const {
    teamglobal,
    loading,
    disabledButton,
    isEdit,
    loadingTeamglobal,
    updatedManagersglobalWithoutTeamglobal,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
    handleOnChangeManagerglobalSelect,
    // handleUploadImage,
  } = useInsertTeamglobal(teamglobalId);

  const { countries } = useCountry();
  // const { setNotification } = useGlobalReducer();

  const navigate = useNavigate();

  const handleOnClickCancel = () => {
    navigate(TeamglobalRoutesEnum.TEAMGLOBAL);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'PÁGINA INICIAL',
        },
        {
          name: 'TIMES',
          navigateTo: TeamglobalRoutesEnum.TEAMGLOBAL,
        },
        {
          name: `${isEdit ? 'EDITAR' : 'INSERIR'} TIME`,
        },
      ]}
    >
      {loadingTeamglobal ? (
        <DisplayFlexJustifyCenter>
          <LimitedContainerCard width={400}>
            <DisplayFlexJustifyCenter>
              <Loading size="large" />
            </DisplayFlexJustifyCenter>
          </LimitedContainerCard>
        </DisplayFlexJustifyCenter>
      ) : (
        <DisplayFlexJustifyCenter>
          <LimitedContainerCard width={400}>
            <Input
              onChange={(event) => handleOnChangeInput(event, 'name')}
              value={teamglobal.name}
              margin="0px 0px 16px 0px"
              title="Nome"
              placeholder="Nome"
            />
            <Input
              onChange={(event) => handleOnChangeInput(event, 'srcImage')}
              value={teamglobal.srcImage}
              margin="0px 0px 16px 0px"
              title="Caminho da imagem"
              placeholder="Caminho da imagem"
            />
            {/* <UploadImage
            beforeUpload={(file: File) => {
              if (file.type === 'image/png') {
                handleUploadImage(file, 'srcImage');
                return false;
              } else {
                handleUploadImage(null, 'srcImage');
                setNotification('Erro!', 'error', 'Selecione uma imagem PNG');
                return Upload.LIST_IGNORE;
              }
            }}
            onRemove={() => handleUploadImage(null, 'srcImage')}
          >
            Selecionar imagem PNG
          </UploadImage> */}
            <Select
              title="País"
              placeholder="Selecione um país"
              margin="0px 0px 16px 0px"
              onChange={handleOnChangeCountrySelect}
              value={teamglobal.countryId !== undefined ? `${teamglobal.countryId}` : undefined}
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
            <Select
              title="Treinador"
              placeholder="Selecione um treinador"
              margin="0px 0px 32px 0px"
              onChange={handleOnChangeManagerglobalSelect}
              value={
                teamglobal.managerglobalId !== undefined
                  ? `${teamglobal.managerglobalId}`
                  : undefined
              }
              options={updatedManagersglobalWithoutTeamglobal.map(
                (managerglobal: ManagerglobalType) => ({
                  value: `${managerglobal.id}`,
                  label: `${managerglobal.name}`,
                }),
              )}
              showSearch
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
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

export default TeamglobalInsert;
