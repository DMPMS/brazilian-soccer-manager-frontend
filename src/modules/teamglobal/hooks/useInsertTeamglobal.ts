import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
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
import { useManagerglobal } from '../../managerglobal/hooks/useManagerglobal';
import { TeamglobalRoutesEnum } from '../routes';

const DEFAULT_TEAMGLOBAL = {
  name: '',
  srcImage: '',
};

export const useInsertTeamglobal = (teamglobalId?: string) => {
  const navigate = useNavigate();

  const [loadingTeamglobal, setLoadingTeamglobal] = useState(false);
  const { request, loading } = useRequests();
  const {
    setTeamsglobal,
    teamglobal: teamglobalReducer,
    setTeamglobal: setTeamglobalReducer,
  } = useTeamglobalReducer();
  const { setManagersglobalWithoutTeamglobal } = useManagerglobalReducer();

  const [disabledButton, setDisabledButton] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [teamglobal, setTeamglobal] = useState<InsertTeamglobalDTO>(DEFAULT_TEAMGLOBAL);

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { managersglobalWithoutTeamglobal } = useManagerglobal();
  const [updatedManagersglobalWithoutTeamglobal, setUpdatedManagersglobalWithoutTeamglobal] =
    useState<ManagerglobalType[]>(managersglobalWithoutTeamglobal);

  useEffect(() => {
    if (teamglobalReducer && teamglobalReducer.managerglobal) {
      setUpdatedManagersglobalWithoutTeamglobal([
        teamglobalReducer.managerglobal,
        ...managersglobalWithoutTeamglobal,
      ]);
    } else {
      setUpdatedManagersglobalWithoutTeamglobal(managersglobalWithoutTeamglobal);
    }
  }, [teamglobalReducer, managersglobalWithoutTeamglobal]); // Understanding why managersglobalWithoutTeamglobal is necessary.

  useEffect(() => {
    if (teamglobalReducer) {
      setTeamglobal({
        name: teamglobalReducer.name,
        srcImage: teamglobalReducer.srcImage,
        countryId: teamglobalReducer.country?.id,
        managerglobalId: teamglobalReducer.managerglobal?.id,
      });
    } else {
      setTeamglobal(DEFAULT_TEAMGLOBAL);
    }
  }, [teamglobalReducer]);

  useEffect(() => {
    const findTeamglobalById = async (teamglobalId: string) => {
      setLoadingTeamglobal(true);
      await request(
        URL_TEAMGLOBAL_ID.replace('{teamglobalId}', teamglobalId),
        MethodsEnum.GET,
        setTeamglobalReducer,
      );
      setLoadingTeamglobal(false);
    };

    if (teamglobalId) {
      setIsEdit(true);
      findTeamglobalById(teamglobalId);
    } else {
      setIsEdit(false);
      setTeamglobalReducer(undefined);
      setTeamglobal(DEFAULT_TEAMGLOBAL);
    }
  }, [teamglobalId]);

  useEffect(() => {
    if (
      teamglobal.name &&
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
      countryId: Number(value),
    });
  };

  const handleOnChangeManagerglobalSelect = (value: string) => {
    setTeamglobal({
      ...teamglobal,
      managerglobalId: Number(value),
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

    await request(
      URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
      MethodsEnum.GET,
      setManagersglobalWithoutTeamglobal,
    );

    navigate(TeamglobalRoutesEnum.TEAMGLOBAL);
  };

  return {
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
  };
};
