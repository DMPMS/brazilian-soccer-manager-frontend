// import { Upload } from 'antd';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import Select from '../../../shared/components/select/Select';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import {
  LimitedContainer,
  LimitedContainerCard,
} from '../../../shared/components/styles/limited.styled';
import CountrySVG from '../../../shared/components/svg/CountrySVG';
// import UploadImage from '../../../shared/components/upload/uploadImage/UploadImage';
// import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { useCountry } from '../../country/hooks/useCountry';
import { useManagerglobal } from '../../managerglobal/hooks/useManagerglobal';
import { ContainerCountry, ContainerCountryImage } from '../../managerglobal/styles/general.style';
import { useInsertTeamglobal } from '../hooks/useInsertTeamglobal';
import { TeamglobalRoutesEnum } from '../routes';

const TeamglobalInsert = () => {
  const {
    teamglobal,
    loading,
    disabledButton,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
    handleOnChangeManagerglobalSelect,
    // handleUploadImage,
  } = useInsertTeamglobal();

  const { countries } = useCountry();
  const { managersglobal } = useManagerglobal();
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
          name: 'INSERIR TIME',
        },
      ]}
    >
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
            title="Nacionalidade"
            margin="0px 0px 32px 0px"
            onChange={handleOnChangeCountrySelect}
            options={countries.map((country) => ({
              value: `${country.id}`,
              label: (
                <ContainerCountry>
                  <ContainerCountryImage>
                    <CountrySVG name={country.name} width={20} height={20} />
                  </ContainerCountryImage>
                  <text>{country.name}</text>
                </ContainerCountry>
              ),
            }))}
          />
          <Select
            title="Treinador"
            margin="0px 0px 32px 0px"
            onChange={handleOnChangeManagerglobalSelect}
            options={managersglobal.map((managerglobal) => ({
              value: `${managerglobal.id}`,
              label: `${managerglobal.name}`,
            }))}
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

export default TeamglobalInsert;
