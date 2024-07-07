import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_PLAYERGLOBAL } from '../../../../shared/constants/dtos';
import {
  PLAYERGLOBAL_MAX_AGE,
  PLAYERGLOBAL_MAX_LENGH_NAME,
  PLAYERGLOBAL_MAX_OVERALL,
  PLAYERGLOBAL_MAX_PRIMARY_POSITIONS,
  PLAYERGLOBAL_MAX_SECONDARY_POSITIONS,
  PLAYERGLOBAL_MIN_AGE,
  PLAYERGLOBAL_MIN_LENGH_NAME,
  PLAYERGLOBAL_MIN_OVERALL,
  PLAYERGLOBAL_MIN_PRIMARY_POSITIONS,
  PLAYERGLOBAL_PRIMARY_POSITION_RATING,
  PLAYERGLOBAL_SECONDARY_POSITION_RATING,
} from '../../../../shared/constants/others';
import {
  URL_PLAYERGLOBAL,
  URL_PLAYERGLOBAL_ID,
  URL_TEAMGLOBAL,
} from '../../../../shared/constants/urls';
import { InsertPlayerglobalDTO } from '../../../../shared/dtos/InsertPlayerglobal.dto';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { usePlayerglobalReducer } from '../../../../store/reducers/playerglobalReducer/usePlayerglobalReducer';
import { useTeamglobalReducer } from '../../../../store/reducers/teamglobalReducer/useTeamglobalReducer';
import { PlayerglobalRoutesEnum } from '../routes';

export const useInsertPlayerglobal = (playerglobalId?: string) => {
  const {
    setPlayersglobal,
    setPlayersglobalWithoutTeamglobal,
    playerglobal: playerglobalReducer,
    setPlayerglobal: setPlayerglobalReducer,
  } = usePlayerglobalReducer();
  const { setTeamsglobal } = useTeamglobalReducer();
  const { setNotification } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [loadingPlayerglobal, setLoadingPlayerglobal] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [playerglobal, setPlayerglobal] = useState<InsertPlayerglobalDTO>(DEFAULT_PLAYERGLOBAL);

  const [formPlayerglobal] = useForm();

  useEffect(() => {
    if (playerglobalId) {
      const findAndSetPlayerglobalReducer = async (playerglobalId: string) => {
        await newRequest(
          MethodsEnum.GET,
          URL_PLAYERGLOBAL_ID.replace('{playerglobalId}', playerglobalId),
        ).then((data) => {
          setPlayerglobalReducer(data);
        });

        setLoadingPlayerglobal(false);
      };

      setIsEdit(true);
      findAndSetPlayerglobalReducer(playerglobalId);
    } else {
      setIsEdit(false);
      setPlayerglobalReducer(undefined);
      setLoadingPlayerglobal(false);
    }
  }, [playerglobalId]);

  useEffect(() => {
    if (playerglobalReducer) {
      const primaryPositionIds: number[] = [];
      const secondaryPositionIds: number[] = [];

      playerglobalReducer.playersglobalPosition?.forEach((playerglobalPosition) => {
        if (playerglobalPosition.position) {
          if (playerglobalPosition.rating === PLAYERGLOBAL_PRIMARY_POSITION_RATING) {
            primaryPositionIds.push(playerglobalPosition.position.id);
          } else if (playerglobalPosition.rating === PLAYERGLOBAL_SECONDARY_POSITION_RATING) {
            secondaryPositionIds.push(playerglobalPosition.position.id);
          }
        }
      });

      setPlayerglobal({
        name: playerglobalReducer.name,
        age: playerglobalReducer.age,
        overall: playerglobalReducer.overall,
        countryId: playerglobalReducer.country?.id,
        teamglobalId: playerglobalReducer.teamglobal?.id,
        primaryPositionIds: primaryPositionIds,
        secondaryPositionIds: secondaryPositionIds,
      });

      formPlayerglobal.setFieldsValue({
        name: playerglobalReducer.name,
        age: playerglobalReducer.age,
        overall: playerglobalReducer.overall,
        countryId:
          playerglobalReducer.country?.id !== undefined
            ? `${playerglobalReducer.country.id}`
            : undefined,
        teamglobalId:
          playerglobalReducer.teamglobal?.id !== undefined
            ? `${playerglobalReducer.teamglobal.id}`
            : undefined,
        primaryPositionIds:
          primaryPositionIds.length !== 0
            ? primaryPositionIds.map((primaryPositionId) => `${primaryPositionId}`)
            : undefined,
        secondaryPositionIds:
          secondaryPositionIds.length !== 0
            ? secondaryPositionIds.map((secondaryPositionId) => `${secondaryPositionId}`)
            : undefined,
      });
    } else {
      setPlayerglobal(DEFAULT_PLAYERGLOBAL);
      formPlayerglobal.resetFields();
    }
  }, [playerglobalReducer]);

  useEffect(() => {
    if (
      playerglobal.name.length >= PLAYERGLOBAL_MIN_LENGH_NAME &&
      playerglobal.name.length <= PLAYERGLOBAL_MAX_LENGH_NAME &&
      playerglobal.age >= PLAYERGLOBAL_MIN_AGE &&
      playerglobal.age <= PLAYERGLOBAL_MAX_AGE &&
      playerglobal.overall >= PLAYERGLOBAL_MIN_OVERALL &&
      playerglobal.overall <= PLAYERGLOBAL_MAX_OVERALL &&
      playerglobal.countryId &&
      playerglobal.primaryPositionIds.length >= PLAYERGLOBAL_MIN_PRIMARY_POSITIONS &&
      playerglobal.primaryPositionIds.length <= PLAYERGLOBAL_MAX_PRIMARY_POSITIONS &&
      playerglobal.secondaryPositionIds.length <= PLAYERGLOBAL_MAX_SECONDARY_POSITIONS
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [playerglobal]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setPlayerglobal({
      ...playerglobal,
      [nameObject]: event.target.value,
    });
  };

  const handleOnChangeInputNumber = (value: number | string | null, nameObject: string) => {
    if (typeof value === 'number') {
      setPlayerglobal({
        ...playerglobal,
        [nameObject]: value,
      });
    } else {
      setPlayerglobal({
        ...playerglobal,
        [nameObject]: 0,
      });
    }
  };

  const handleOnChangeCountrySelect = (value: string) => {
    setPlayerglobal({
      ...playerglobal,
      countryId: value ? Number(value) : undefined,
    });
  };

  const handleOnChangeTeamglobalSelect = (value: string) => {
    setPlayerglobal({
      ...playerglobal,
      teamglobalId: value ? Number(value) : undefined,
    });
  };

  const handleOnChangePrimaryPositionSelect = (values: string[]) => {
    const updatedValues = values.map((value) => Number(value));

    setPlayerglobal({
      ...playerglobal,
      primaryPositionIds: updatedValues,
    });
  };

  const handleOnChangeSecondaryPositionSelect = (values: string[]) => {
    const updatedValues = values.map((value) => Number(value));

    setPlayerglobal({
      ...playerglobal,
      secondaryPositionIds: updatedValues,
    });
  };

  const handleOnClickInsert = async () => {
    if (playerglobalId) {
      await newRequest(
        MethodsEnum.PUT,
        URL_PLAYERGLOBAL_ID.replace('{playerglobalId}', playerglobalId),
        {},
        playerglobal,
      ).then(() => {
        setNotification('Jogador editado com sucesso!', 'success');
      });
    } else {
      await newRequest(MethodsEnum.POST, URL_PLAYERGLOBAL, {}, playerglobal).then(() => {
        setNotification('Jogador inserido com sucesso!', 'success');
      });
    }

    await newRequest(MethodsEnum.GET, URL_PLAYERGLOBAL).then((data) => {
      setPlayersglobal(data);
    });

    await newRequest(MethodsEnum.GET, URL_PLAYERGLOBAL, { isWithoutTeamglobal: true }).then(
      (data) => {
        setPlayersglobalWithoutTeamglobal(data);
      },
    );

    // Just by inserting.
    await newRequest(MethodsEnum.GET, URL_TEAMGLOBAL).then((data) => {
      setTeamsglobal(data);
    });

    navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL);
  };

  const handleOnClickReset = () => {
    setPlayerglobal(DEFAULT_PLAYERGLOBAL);
    formPlayerglobal.resetFields();
  };

  const handleOnClickCancel = () => {
    navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL);
  };

  return {
    loading,
    disabledButton,
    isEdit,
    loadingPlayerglobal,
    formPlayerglobal,
    playerglobalReducerTeamglobalId: playerglobalReducer?.teamglobal?.id,
    playerglobal,
    handleOnChangeInput,
    handleOnChangeInputNumber,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeCountrySelect,
    handleOnChangeTeamglobalSelect,
    handleOnChangePrimaryPositionSelect,
    handleOnChangeSecondaryPositionSelect,
  };
};
