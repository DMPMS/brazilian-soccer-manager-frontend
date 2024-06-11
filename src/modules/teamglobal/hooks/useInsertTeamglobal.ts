import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  URL_MANAGERGLOBAL,
  URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
  URL_TEAMGLOBAL,
  URL_TEAMGLOBAL_ID,
} from '../../../shared/constants/urls';
import { InsertTeamglobalDTO } from '../../../shared/dtos/InsertTeamglobal.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';
import { useManagerglobalReducer } from '../../../store/reducers/managerglobalReducer/useManagerglobalReducer';
import { useTeamglobalReducer } from '../../../store/reducers/teamglobalReducer/useTeamglobalReducer';
import { TeamglobalRoutesEnum } from '../routes';

const DEFAULT_TEAMGLOBAL = {
  name: '',
  srcImage: '',
  countryId: undefined,
  managerglobalId: undefined,
};

export const useInsertTeamglobal = (teamglobalId?: string) => {
  const {
    setTeamsglobal,
    teamglobal: teamglobalReducer,
    setTeamglobal: setTeamglobalReducer,
  } = useTeamglobalReducer();
  const { setManagersglobalWithoutTeamglobal, setManagersglobal } = useManagerglobalReducer();

  const { request, loading } = useRequests();
  const navigate = useNavigate();

  const [loadingTeamglobal, setLoadingTeamglobal] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [teamglobal, setTeamglobal] = useState<InsertTeamglobalDTO>(DEFAULT_TEAMGLOBAL);

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formTeamglobal] = useForm();

  const [managerglobalOfTeamglobalReducer, setManagerglobalOfTeamglobalReducer] = useState<
    ManagerglobalType | undefined
  >(undefined);

  useEffect(() => {
    if (teamglobalId) {
      const findAndSetTeamglobalReducer = async (teamglobalId: string) => {
        setLoadingTeamglobal(true);
        await request(
          URL_TEAMGLOBAL_ID.replace('{teamglobalId}', teamglobalId),
          MethodsEnum.GET,
          setTeamglobalReducer,
        );
        setLoadingTeamglobal(false);
      };

      setIsEdit(true);
      findAndSetTeamglobalReducer(teamglobalId);
    } else {
      setIsEdit(false);
      setTeamglobalReducer(undefined);
    }
  }, [teamglobalId]);

  useEffect(() => {
    if (teamglobalReducer) {
      setTeamglobal({
        name: teamglobalReducer.name,
        srcImage: teamglobalReducer.srcImage,
        countryId: teamglobalReducer.country?.id,
        managerglobalId: teamglobalReducer.managerglobal?.id,
      });

      formTeamglobal.setFieldsValue({
        name: teamglobalReducer.name,
        srcImage: teamglobalReducer.srcImage,
        countryId:
          teamglobalReducer.country?.id !== undefined
            ? `${teamglobalReducer.country.id}`
            : undefined,
        managerglobalId:
          teamglobalReducer.managerglobal?.id !== undefined
            ? `${teamglobalReducer.managerglobal.id}`
            : undefined,
      });

      setManagerglobalOfTeamglobalReducer(teamglobalReducer.managerglobal);
    } else {
      setTeamglobal(DEFAULT_TEAMGLOBAL);
      formTeamglobal.resetFields();
      setManagerglobalOfTeamglobalReducer(undefined);
    }
  }, [teamglobalReducer]);

  useEffect(() => {
    if (
      teamglobal.name.length >= 3 &&
      teamglobal.name.length <= 40 &&
      teamglobal.srcImage &&
      teamglobal.countryId &&
      teamglobal.managerglobalId
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [teamglobal]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setTeamglobal({
      ...teamglobal,
      [nameObject]: event.target.value,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleUploadImage = (file: File | null, nameObject: string) => {
  //   if (file !== null) {
  //     setSelectedFile(file);
  //     setTeamglobal({
  //       ...teamglobal,
  //       [nameObject]: file.name,
  //     });
  //   } else {
  //     setSelectedFile(file);
  //     setTeamglobal({
  //       ...teamglobal,
  //       [nameObject]: '',
  //     });
  //   }
  // };

  const handleOnChangeCountrySelect = (value: string) => {
    setTeamglobal({
      ...teamglobal,
      countryId: value ? Number(value) : undefined,
    });
  };

  const handleOnChangeManagerglobalSelect = (value: string) => {
    setTeamglobal({
      ...teamglobal,
      managerglobalId: value ? Number(value) : undefined,
    });
  };

  const handleOnClickInsert = async () => {
    if (teamglobalId) {
      await request(
        URL_TEAMGLOBAL_ID.replace('{teamglobalId}', teamglobalId),
        MethodsEnum.PUT,
        undefined,
        teamglobal,
        'Time editado com sucesso!',
      );
    } else {
      await request(
        URL_TEAMGLOBAL,
        MethodsEnum.POST,
        undefined,
        teamglobal,
        'Time inserido com sucesso!',
      );
    }

    await request(URL_TEAMGLOBAL, MethodsEnum.GET, setTeamsglobal);

    await request(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);
    await request(
      URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
      MethodsEnum.GET,
      setManagersglobalWithoutTeamglobal,
    );

    navigate(TeamglobalRoutesEnum.TEAMGLOBAL);
  };

  return {
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
  };
};
