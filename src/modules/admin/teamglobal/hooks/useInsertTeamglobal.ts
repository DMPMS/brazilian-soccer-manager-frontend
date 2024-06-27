import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_TEAMGLOBAL } from '../../../../shared/constants/dtos';
import {
  TEAMGLOBAL_MAX_LENGH_NAME,
  TEAMGLOBAL_MAX_PLAYERSGLOBAL,
  TEAMGLOBAL_MIN_LENGH_NAME,
  TEAMGLOBAL_MIN_PLAYERSGLOBAL,
} from '../../../../shared/constants/others';
import {
  URL_MANAGERGLOBAL,
  URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
  URL_PLAYERGLOBAL,
  URL_PLAYERGLOBAL_WITHOUT_TEAMGLOBAL,
  URL_TEAMGLOBAL,
  URL_TEAMGLOBAL_ID,
} from '../../../../shared/constants/urls';
import { InsertTeamglobalDTO } from '../../../../shared/dtos/InsertTeamglobal.dto';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { ManagerglobalType } from '../../../../shared/types/ManagerglobalType';
import { PlayerglobalType } from '../../../../shared/types/PlayerglobalType';
import { useManagerglobalReducer } from '../../../../store/reducers/managerglobalReducer/useManagerglobalReducer';
import { usePlayerglobalReducer } from '../../../../store/reducers/playerglobalReducer/usePlayerglobalReducer';
import { useTeamglobalReducer } from '../../../../store/reducers/teamglobalReducer/useTeamglobalReducer';
import { TeamglobalRoutesEnum } from '../routes';

export const useInsertTeamglobal = (teamglobalId?: string) => {
  const {
    setTeamsglobal,
    teamglobal: teamglobalReducer,
    setTeamglobal: setTeamglobalReducer,
  } = useTeamglobalReducer();
  const { setManagersglobalWithoutTeamglobal, setManagersglobal } = useManagerglobalReducer();
  const { setPlayersglobalWithoutTeamglobal, setPlayersglobal } = usePlayerglobalReducer();

  const { request, loading } = useRequests();
  const navigate = useNavigate();

  const [loadingTeamglobal, setLoadingTeamglobal] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [teamglobal, setTeamglobal] = useState<InsertTeamglobalDTO>(DEFAULT_TEAMGLOBAL);

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formTeamglobal] = useForm();

  const [playerglobalIdsCount, setPlayerglobalIdsCount] = useState<number>(0);

  const [managerglobalOfTeamglobalReducer, setManagerglobalOfTeamglobalReducer] = useState<
    ManagerglobalType | undefined
  >(undefined);

  const [playersglobalOfTeamglobalReducer, setPlayersglobalOfTeamglobalReducer] = useState<
    PlayerglobalType[]
  >([]);

  useEffect(() => {
    if (teamglobalId) {
      const findAndSetTeamglobalReducer = async (teamglobalId: string) => {
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
      setLoadingTeamglobal(false);
    }
  }, [teamglobalId]);

  useEffect(() => {
    if (teamglobalReducer) {
      const playerglobalIds: number[] = [];

      teamglobalReducer.playersglobal?.forEach((playerglobal) => {
        playerglobalIds.push(playerglobal.id);
      });

      setTeamglobal({
        name: teamglobalReducer.name,
        srcImage: teamglobalReducer.srcImage,
        countryId: teamglobalReducer.country?.id,
        managerglobalId: teamglobalReducer.managerglobal?.id,
        playerglobalIds: playerglobalIds,
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
        playerglobalIds:
          playerglobalIds.length !== 0
            ? playerglobalIds.map((playerglobalId) => `${playerglobalId}`)
            : undefined,
      });

      setPlayerglobalIdsCount(teamglobalReducer.playersglobal?.length || 0);
      setManagerglobalOfTeamglobalReducer(teamglobalReducer.managerglobal);
      setPlayersglobalOfTeamglobalReducer(teamglobalReducer.playersglobal || []);
    } else {
      setTeamglobal(DEFAULT_TEAMGLOBAL);
      formTeamglobal.resetFields();
      setPlayerglobalIdsCount(0);
      setManagerglobalOfTeamglobalReducer(undefined);
      setPlayersglobalOfTeamglobalReducer([]);
    }
  }, [teamglobalReducer]);

  useEffect(() => {
    if (
      teamglobal.name.length >= TEAMGLOBAL_MIN_LENGH_NAME &&
      teamglobal.name.length <= TEAMGLOBAL_MAX_LENGH_NAME &&
      teamglobal.srcImage &&
      teamglobal.countryId &&
      teamglobal.managerglobalId &&
      teamglobal.playerglobalIds.length >= TEAMGLOBAL_MIN_PLAYERSGLOBAL &&
      teamglobal.playerglobalIds.length <= TEAMGLOBAL_MAX_PLAYERSGLOBAL
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

  const handleOnChangePlayerglobalSelect = (values: string[]) => {
    const updatedValues = values.map((value) => Number(value));

    setPlayerglobalIdsCount(updatedValues.length);

    setTeamglobal({
      ...teamglobal,
      playerglobalIds: updatedValues,
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

    await request(URL_PLAYERGLOBAL, MethodsEnum.GET, setPlayersglobal);
    await request(
      URL_PLAYERGLOBAL_WITHOUT_TEAMGLOBAL,
      MethodsEnum.GET,
      setPlayersglobalWithoutTeamglobal,
    );

    await request(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);
    await request(
      URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
      MethodsEnum.GET,
      setManagersglobalWithoutTeamglobal,
    );

    navigate(TeamglobalRoutesEnum.TEAMGLOBAL);
  };

  const handleOnClickReset = () => {
    setTeamglobal(DEFAULT_TEAMGLOBAL);
    formTeamglobal.resetFields();
    setPlayerglobalIdsCount(0);
  };

  return {
    loading,
    disabledButton,
    isEdit,
    loadingTeamglobal,
    formTeamglobal,
    playerglobalIdsCount,
    managerglobalOfTeamglobalReducer,
    playersglobalOfTeamglobalReducer,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnChangeCountrySelect,
    handleOnChangeManagerglobalSelect,
    handleOnChangePlayerglobalSelect,
    // handleUploadImage,
  };
};
