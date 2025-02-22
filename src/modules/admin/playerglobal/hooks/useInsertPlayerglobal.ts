import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_PLAYERGLOBAL } from '../../../../shared/constants/dtos';
import {
  CURRENT_DATE_UTC,
  DEFAULT_DATE_FORMAT,
  PLAYERGLOBAL_MAX_AGE,
  PLAYERGLOBAL_MAX_LENGH_NAME,
  PLAYERGLOBAL_MAX_OVERALL,
  PLAYERGLOBAL_MAX_PRIMARY_POSITIONS,
  PLAYERGLOBAL_MAX_SECONDARY_POSITIONS,
  PLAYERGLOBAL_MIN_AGE,
  PLAYERGLOBAL_MIN_LENGH_NAME,
  PLAYERGLOBAL_MIN_OVERALL,
  PLAYERGLOBAL_MIN_PRIMARY_POSITIONS,
} from '../../../../shared/constants/others';
import {
  URL_PLAYERGLOBAL,
  URL_PLAYERGLOBAL_ID,
  URL_TEAMGLOBAL,
} from '../../../../shared/constants/urls';
import { InsertPlayerglobalDTO } from '../../../../shared/dtos/insertPlayerglobal.dto';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { PositionEnum } from '../../../../shared/enums/Position.enum';
import { PositionRatingEnum } from '../../../../shared/enums/PositionRating.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { PlayerglobalType } from '../../../../shared/types/Playerglobal.type';
import { TeamglobalType } from '../../../../shared/types/Teamglobal.type';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { usePlayerglobalReducer } from '../../../../store/reducers/playerglobalReducer/usePlayerglobalReducer';
import { useTeamglobalReducer } from '../../../../store/reducers/teamglobalReducer/useTeamglobalReducer';
import { PlayerglobalRoutesEnum } from '../routes';

export const useInsertPlayerglobal = (playerglobalId?: string) => {
  const {
    setPlayersglobal,
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
        ).then((data: PlayerglobalType) => {
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
      const primaryPositionIds: PositionEnum[] = [];
      const secondaryPositionIds: PositionEnum[] = [];

      playerglobalReducer.playersglobalPosition?.forEach((playerglobalPosition) => {
        if (playerglobalPosition.position) {
          if (playerglobalPosition.rating === PositionRatingEnum.Primary) {
            primaryPositionIds.push(playerglobalPosition.position.id);
          } else if (playerglobalPosition.rating === PositionRatingEnum.Secondary) {
            secondaryPositionIds.push(playerglobalPosition.position.id);
          }
        }
      });

      setPlayerglobal({
        name: playerglobalReducer.name,
        birthdate: playerglobalReducer.birthdate,
        overall: playerglobalReducer.overall,
        countryId: playerglobalReducer.country?.id,
        teamglobalId: playerglobalReducer.teamglobal?.id,
        primaryPositionIds: primaryPositionIds,
        secondaryPositionIds: secondaryPositionIds,
      });

      formPlayerglobal.setFieldsValue({
        name: playerglobalReducer.name,
        birthdate: dayjs(playerglobalReducer.birthdate),
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
      playerglobal.birthdate &&
      playerglobal.overall >= PLAYERGLOBAL_MIN_OVERALL &&
      playerglobal.overall <= PLAYERGLOBAL_MAX_OVERALL &&
      playerglobal.countryId &&
      playerglobal.primaryPositionIds.length >= PLAYERGLOBAL_MIN_PRIMARY_POSITIONS &&
      playerglobal.primaryPositionIds.length <= PLAYERGLOBAL_MAX_PRIMARY_POSITIONS &&
      playerglobal.secondaryPositionIds.length <= PLAYERGLOBAL_MAX_SECONDARY_POSITIONS
    ) {
      const birthdate = dayjs(playerglobal.birthdate).startOf('day');
      const minDate = CURRENT_DATE_UTC.subtract(PLAYERGLOBAL_MIN_AGE, 'year').startOf('day');
      const maxDate = CURRENT_DATE_UTC.subtract(PLAYERGLOBAL_MAX_AGE, 'year').startOf('day');

      if (!(birthdate.isAfter(minDate) || birthdate.isBefore(maxDate))) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    } else {
      setDisabledButton(true);
    }
  }, [playerglobal]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    const inputValue = event.target.value;

    setPlayerglobal({
      ...playerglobal,
      [nameObject]: inputValue,
    });
  };

  const handleOnChangeInputNumber = (value: number | string | null, nameObject: string) => {
    const inputValue = value ? value : 0;

    setPlayerglobal({
      ...playerglobal,
      [nameObject]: inputValue,
    });
  };

  const handleOnChangeDatePicker = (date: dayjs.Dayjs | null, nameObject: string) => {
    const datePickerValue = date ? date.format(DEFAULT_DATE_FORMAT) : '';

    setPlayerglobal({
      ...playerglobal,
      [nameObject]: datePickerValue,
    });
  };

  const handleOnChangeCountrySelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setPlayerglobal({
      ...playerglobal,
      countryId: selectValue,
    });
  };

  const handleOnChangeTeamglobalSelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setPlayerglobal({
      ...playerglobal,
      teamglobalId: selectValue,
    });
  };

  const handleOnChangePrimaryPositionSelect = (values: string[]) => {
    const selectValues = values.map((value) => Number(value));

    setPlayerglobal({
      ...playerglobal,
      primaryPositionIds: selectValues,
    });
  };

  const handleOnChangeSecondaryPositionSelect = (values: string[]) => {
    const selectValues = values.map((value) => Number(value));

    setPlayerglobal({
      ...playerglobal,
      secondaryPositionIds: selectValues,
    });
  };

  const handleOnInsert = async () => {
    if (playerglobalId) {
      await newRequest(
        MethodsEnum.PUT,
        URL_PLAYERGLOBAL_ID.replace('{playerglobalId}', playerglobalId),
        false,
        {},
        playerglobal,
      );
    } else {
      await newRequest(MethodsEnum.POST, URL_PLAYERGLOBAL, false, {}, playerglobal);
    }

    await newRequest(MethodsEnum.GET, URL_PLAYERGLOBAL).then((data: PlayerglobalType[]) => {
      setPlayersglobal(data);
    });

    // Just by inserting.
    await newRequest(MethodsEnum.GET, URL_TEAMGLOBAL).then((data: TeamglobalType[]) => {
      setTeamsglobal(data);
    });

    if (playerglobalId) {
      setNotification('Jogador editado.', 'success');
    } else {
      setNotification('Jogador inserido.', 'success');
    }

    navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL);
  };

  const handleOnReset = () => {
    setPlayerglobal(DEFAULT_PLAYERGLOBAL);
    formPlayerglobal.resetFields();
  };

  const handleOnCancel = () => {
    navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL);
  };

  return {
    loading,
    disabledButton,
    isEdit,
    loadingPlayerglobal,
    formPlayerglobal,
    playersglobalInTeamglobalOfPlayerglobalReducerCount:
      playerglobalReducer?.teamglobal?.playersglobalCount,
    playerglobalReducerTeamglobalId: playerglobalReducer?.teamglobal?.id,
    playerglobal,
    handleOnChangeInput,
    handleOnChangeInputNumber,
    handleOnChangeDatePicker,
    handleOnInsert,
    handleOnReset,
    handleOnCancel,
    handleOnChangeCountrySelect,
    handleOnChangeTeamglobalSelect,
    handleOnChangePrimaryPositionSelect,
    handleOnChangeSecondaryPositionSelect,
  };
};
