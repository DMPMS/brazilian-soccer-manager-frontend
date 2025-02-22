import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_FORMATION_ID, DEFAULT_TEAMGLOBAL } from '../../../../shared/constants/dtos';
import {
  TEAMGLOBAL_MAX_LENGH_NAME,
  TEAMGLOBAL_MAX_PLAYERSGLOBAL,
  TEAMGLOBAL_MIN_LENGH_NAME,
  TEAMGLOBAL_MIN_PLAYERSGLOBAL,
} from '../../../../shared/constants/others';
import {
  URL_MANAGERGLOBAL,
  URL_PLAYERGLOBAL,
  URL_TEAMGLOBAL,
  URL_TEAMGLOBAL_ID,
} from '../../../../shared/constants/urls';
import { InsertTeamglobalDTO } from '../../../../shared/dtos/insertTeamglobal.dto';
import { FormationEnum } from '../../../../shared/enums/Formation.enum';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { validateImage } from '../../../../shared/functions/validateImage';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { ManagerglobalType } from '../../../../shared/types/Managerglobal.type';
import { PlayerglobalType } from '../../../../shared/types/Playerglobal.type';
import { TeamglobalType } from '../../../../shared/types/Teamglobal.type';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
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
  const { setManagersglobal } = useManagerglobalReducer();
  const { setPlayersglobal } = usePlayerglobalReducer();
  const { setNotification } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [loadingTeamglobal, setLoadingTeamglobal] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [teamglobal, setTeamglobal] = useState<InsertTeamglobalDTO>(DEFAULT_TEAMGLOBAL);

  const [formTeamglobal] = useForm();

  const [isValidImage, setIsValidImage] = useState<boolean>(false); // It's on top
  const [srcImage, setSrcImage] = useState<string>('');
  const [playerglobalIds, setPlayerglobalIds] = useState<number[]>([]);
  const [formationId, setFormationId] = useState<FormationEnum>(DEFAULT_FORMATION_ID);
  const [squadplanglobalPlayersglobalDict, setSquadplanglobalPlayersglobalDict] = useState<{
    [key: string]: number | undefined;
  }>({});

  const [managerglobalOfTeamglobalReducer, setManagerglobalOfTeamglobalReducer] = useState<
    ManagerglobalType | undefined
  >(undefined);

  const [playersglobalOfTeamglobalReducer, setPlayersglobalOfTeamglobalReducer] = useState<
    PlayerglobalType[]
  >([]);

  const [managersglobalWithoutTeamglobal, setManagersglobalWithoutTeamglobal] = useState<
    ManagerglobalType[]
  >([]);

  const [playersglobalWithoutTeamglobal, setPlayersglobalWithoutTeamglobal] = useState<
    PlayerglobalType[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      await newRequest(MethodsEnum.GET, URL_MANAGERGLOBAL, false, {
        isWithoutTeamglobal: true,
      }).then((data: ManagerglobalType[]) => {
        setManagersglobalWithoutTeamglobal(data);
      });

      await newRequest(MethodsEnum.GET, URL_PLAYERGLOBAL, false, {
        isWithoutTeamglobal: true,
      }).then((data: PlayerglobalType[]) => {
        setPlayersglobalWithoutTeamglobal(data);
      });

      if (teamglobalId) {
        await newRequest(
          MethodsEnum.GET,
          URL_TEAMGLOBAL_ID.replace('{teamglobalId}', teamglobalId),
        ).then((data: TeamglobalType) => {
          setTeamglobalReducer(data);
        });

        setIsEdit(true);
        setLoadingTeamglobal(false);
      } else {
        setIsEdit(false);
        setTeamglobalReducer(undefined);
        setLoadingTeamglobal(false);
      }
    };

    fetchData();
  }, [teamglobalId]);

  useEffect(() => {
    const fetchData = async () => {
      if (teamglobalReducer) {
        const playerglobalIds: number[] = [];

        teamglobalReducer.playersglobal?.forEach((playerglobal) => {
          playerglobalIds.push(playerglobal.id);
        });

        const squadplanglobalFormationId =
          teamglobalReducer.squadplanglobal?.formation?.id || DEFAULT_FORMATION_ID;

        const squadplanglobalPlayerglobalIds =
          teamglobalReducer.squadplanglobal?.playerglobalIds || [];

        setTeamglobal({
          name: teamglobalReducer.name,
          srcImage: teamglobalReducer.srcImage,
          countryId: teamglobalReducer.country?.id,
          managerglobalId: teamglobalReducer.managerglobal?.id,
          playerglobalIds: playerglobalIds,
          squadplanglobalFormationId: squadplanglobalFormationId,
          squadplanglobalPlayerglobalIds: squadplanglobalPlayerglobalIds,
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
          squadplanglobalFormationId: `${squadplanglobalFormationId}`,
          ...Object.fromEntries(
            squadplanglobalPlayerglobalIds.map((squadplanglobalPlayerglobalId, index) => [
              `squadplanglobalPlayerglobal${index}`,
              squadplanglobalPlayerglobalId.toString(),
            ]),
          ),
        });

        setIsValidImage((await validateImage(teamglobalReducer.srcImage)) ? true : false);
        setSrcImage(teamglobalReducer.srcImage);

        setPlayerglobalIds(playerglobalIds);
        setFormationId(squadplanglobalFormationId);

        const obj = Object.fromEntries(
          squadplanglobalPlayerglobalIds.map((value, index) => [index, value]),
        );
        setSquadplanglobalPlayersglobalDict(obj);

        setManagerglobalOfTeamglobalReducer(teamglobalReducer.managerglobal);
        setPlayersglobalOfTeamglobalReducer(teamglobalReducer.playersglobal || []);
      } else {
        setTeamglobal(DEFAULT_TEAMGLOBAL);
        formTeamglobal.resetFields();
        formTeamglobal.setFieldsValue({ squadplanglobalFormationId: `${DEFAULT_FORMATION_ID}` });
        setIsValidImage(false);
        setSrcImage('');
        setPlayerglobalIds([]);
        setFormationId(DEFAULT_FORMATION_ID);
        setSquadplanglobalPlayersglobalDict({});
        setManagerglobalOfTeamglobalReducer(undefined);
        setPlayersglobalOfTeamglobalReducer([]);
      }
    };

    fetchData();
  }, [teamglobalReducer]);

  useEffect(() => {
    if (
      teamglobal.name.length >= TEAMGLOBAL_MIN_LENGH_NAME &&
      teamglobal.name.length <= TEAMGLOBAL_MAX_LENGH_NAME &&
      teamglobal.srcImage &&
      teamglobal.countryId &&
      teamglobal.managerglobalId &&
      teamglobal.playerglobalIds.length >= TEAMGLOBAL_MIN_PLAYERSGLOBAL &&
      teamglobal.playerglobalIds.length <= TEAMGLOBAL_MAX_PLAYERSGLOBAL &&
      teamglobal.squadplanglobalFormationId &&
      teamglobal.squadplanglobalPlayerglobalIds.every((item) => item !== 0) &&
      isValidImage
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [teamglobal, isValidImage]);

  const handleOnChangeInput = async (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
  ) => {
    const inputValue = event.target.value;

    setTeamglobal({
      ...teamglobal,
      [nameObject]: inputValue,
    });

    if (nameObject === 'srcImage') {
      setIsValidImage((await validateImage(inputValue)) ? true : false);
      setSrcImage(inputValue);
    }
  };

  const handleOnChangeCountrySelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setTeamglobal({
      ...teamglobal,
      countryId: selectValue,
    });
  };

  const handleOnChangeManagerglobalSelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setTeamglobal({
      ...teamglobal,
      managerglobalId: selectValue,
    });
  };

  const handleOnChangePlayerglobalSelect = (values: string[]) => {
    const selectValues = values.map((value) => Number(value));

    setPlayerglobalIds(selectValues);

    const removedPlayerglobalIds = teamglobal.playerglobalIds.filter(
      (playerglobalId) => !selectValues.includes(playerglobalId),
    );

    const squadplanglobalPlayerglobalIdsUpdated = [...teamglobal.squadplanglobalPlayerglobalIds];
    const squadplanglobalPlayersglobalDictUpdated = { ...squadplanglobalPlayersglobalDict };

    removedPlayerglobalIds.forEach((playerglobalId) => {
      const index = squadplanglobalPlayerglobalIdsUpdated.indexOf(playerglobalId);

      if (index !== -1) {
        squadplanglobalPlayerglobalIdsUpdated[index] = 0;
        squadplanglobalPlayersglobalDictUpdated[index] = undefined;
        formTeamglobal.resetFields([`squadplanglobalPlayerglobal${index}`]);
      }
    });

    setTeamglobal({
      ...teamglobal,
      playerglobalIds: selectValues,
      squadplanglobalPlayerglobalIds: squadplanglobalPlayerglobalIdsUpdated,
    });

    setSquadplanglobalPlayersglobalDict(squadplanglobalPlayersglobalDictUpdated);
  };

  const handleOnChangeFormationSelect = (value: string) => {
    const selectValue = value ? Number(value) : DEFAULT_FORMATION_ID;

    setFormationId(selectValue);

    setTeamglobal({
      ...teamglobal,
      squadplanglobalFormationId: selectValue,
    });
  };

  const handleOnChangeSquadplanglobalPositionSelect = (index: number, value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setSquadplanglobalPlayersglobalDict({
      ...squadplanglobalPlayersglobalDict,
      [index]: selectValue,
    });

    const squadplanglobalPlayerglobalIdsUpdated = [...teamglobal.squadplanglobalPlayerglobalIds];
    squadplanglobalPlayerglobalIdsUpdated[index] = selectValue || 0;

    setTeamglobal({
      ...teamglobal,
      squadplanglobalPlayerglobalIds: squadplanglobalPlayerglobalIdsUpdated,
    });
  };

  const handleOnInsert = async () => {
    if (teamglobalId) {
      await newRequest(
        MethodsEnum.PUT,
        URL_TEAMGLOBAL_ID.replace('{teamglobalId}', teamglobalId),
        false,
        {},
        teamglobal,
      );
    } else {
      await newRequest(MethodsEnum.POST, URL_TEAMGLOBAL, false, {}, teamglobal);
    }

    await newRequest(MethodsEnum.GET, URL_TEAMGLOBAL).then((data: TeamglobalType[]) => {
      setTeamsglobal(data);
    });

    await newRequest(MethodsEnum.GET, URL_PLAYERGLOBAL).then((data: PlayerglobalType[]) => {
      setPlayersglobal(data);
    });

    await newRequest(MethodsEnum.GET, URL_MANAGERGLOBAL).then((data: ManagerglobalType[]) => {
      setManagersglobal(data);
    });

    if (teamglobalId) {
      setNotification('Time editado.', 'success');
    } else {
      setNotification('Time inserido.', 'success');
    }

    navigate(TeamglobalRoutesEnum.TEAMGLOBAL);
  };

  const handleOnReset = () => {
    setTeamglobal(DEFAULT_TEAMGLOBAL);
    formTeamglobal.resetFields();
    setIsValidImage(false);
    setSrcImage('');
    setPlayerglobalIds([]);
    setFormationId(DEFAULT_FORMATION_ID);
    setSquadplanglobalPlayersglobalDict({});
  };

  const handleOnCancel = () => {
    navigate(TeamglobalRoutesEnum.TEAMGLOBAL);
  };

  return {
    loading,
    disabledButton,
    isEdit,
    loadingTeamglobal,
    formTeamglobal,
    isValidImage,
    srcImage,
    playerglobalIds,
    managerglobalOfTeamglobalReducer,
    playersglobalOfTeamglobalReducer,
    managersglobalWithoutTeamglobal,
    playersglobalWithoutTeamglobal,
    formationId,
    squadplanglobalPlayersglobalDict,
    handleOnChangeInput,
    handleOnInsert,
    handleOnReset,
    handleOnCancel,
    handleOnChangeCountrySelect,
    handleOnChangeManagerglobalSelect,
    handleOnChangePlayerglobalSelect,
    handleOnChangeFormationSelect,
    handleOnChangeSquadplanglobalPositionSelect,
  };
};
