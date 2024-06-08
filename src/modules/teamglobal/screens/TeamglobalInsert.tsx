// import { Upload } from 'antd';
import { Form } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import FlexProject from '../../../shared/components/flex/FlexProject';
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
import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';
// import UploadImage from '../../../shared/components/upload/uploadImage/UploadImage';
// import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { useCountry } from '../../country/hooks/useCountry';
import { useManagerglobal } from '../../managerglobal/hooks/useManagerglobal';
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
    managerglobalOfTeamglobalReducer,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
    handleOnChangeManagerglobalSelect,
    // handleUploadImage,
  } = useInsertTeamglobal(teamglobalId);

  const navigate = useNavigate();

  const { countries } = useCountry();
  const { managersglobalWithoutTeamglobal } = useManagerglobal();
  // const { setNotification } = useGlobalReducer();

  const handleOnClickCancel = () => {
    navigate(TeamglobalRoutesEnum.TEAMGLOBAL);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Página inicial',
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
          <LimitedContainerCard width={400}>
            <FlexProject justify="center">
              <Loading size="large" />
            </FlexProject>
          </LimitedContainerCard>
        </FlexProject>
      ) : (
        <FlexProject justify="center">
          <LimitedContainerCard width={400}>
            <Form layout="vertical" form={formTeamglobal}>
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

              <Form.Item
                label="Treinador"
                name="managerglobalId"
                required
                rules={[{ required: true, message: 'Este campo deve ser preenchido.' }]}
              >
                <SelectProject
                  placeholder="Selecione um treinador"
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
                    ...managersglobalWithoutTeamglobal.map((managerglobal: ManagerglobalType) => ({
                      value: `${managerglobal.id}`,
                      label: `${managerglobal.name}`,
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
            </Form>
          </LimitedContainerCard>
        </FlexProject>
      )}
    </Screen>
  );
};

export default TeamglobalInsert;
