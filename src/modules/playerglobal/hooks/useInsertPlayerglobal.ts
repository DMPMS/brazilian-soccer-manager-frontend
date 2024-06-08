import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_PLAYERGLOBAL, URL_PLAYERGLOBAL_ID } from '../../../shared/constants/urls';
import { InsertPlayerglobalDTO } from '../../../shared/dtos/InsertPlayerglobal.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { usePlayerglobalReducer } from '../../../store/reducers/playerglobalReducer/usePlayerglobalReducer';
import { PlayerglobalRoutesEnum } from '../routes';

const DEFAULT_PLAYERGLOBAL = {
  name: '',
  age: 0,
  overall: 0,
  primaryPositionIds: [],
  secondaryPositionIds: [],
  countryId: undefined,
  teamglobalId: undefined,
};

const PRIMARY_POSITIONS_MIN = 1;
const PRIMARY_POSITIONS_MAX = 3;
const SECONDARY_POSITIONS_MAX = 5;

export const useInsertPlayerglobal = (playerglobalId?: string) => {
  const {
    setPlayersglobal,
    playerglobal: playerglobalReducer,
    setPlayerglobal: setPlayerglobalReducer,
  } = usePlayerglobalReducer();

  const { request, loading } = useRequests();
  const navigate = useNavigate();

  const [loadingPlayerglobal, setLoadingPlayerglobal] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [playerglobal, setPlayerglobal] = useState<InsertPlayerglobalDTO>(DEFAULT_PLAYERGLOBAL);

  const [selectedPrimaryPositionIds, setSelectedPrimaryPositionIds] = useState<number[]>([]);
  const [selectedSecondaryPositionIds, setSelectedSecondaryPositionIds] = useState<number[]>([]);

  const [formPlayerglobal] = useForm();

  useEffect(() => {
    if (playerglobalId) {
      const findAndSetPlayerglobalReducer = async (playerglobalId: string) => {
        setLoadingPlayerglobal(true);

        await request(
          URL_PLAYERGLOBAL_ID.replace('{playerglobalId}', playerglobalId),
          MethodsEnum.GET,
          setPlayerglobalReducer,
        );

        setLoadingPlayerglobal(false);
      };

      setIsEdit(true);
      findAndSetPlayerglobalReducer(playerglobalId);
    } else {
      setIsEdit(false);
      setPlayerglobalReducer(undefined);
    }
  }, [playerglobalId]);

  useEffect(() => {
    if (playerglobalReducer) {
      const primaryPositionIds: number[] = [];
      const secondaryPositionIds: number[] = [];

      playerglobalReducer.playersglobalPosition?.forEach((playerglobalPosition) => {
        if (playerglobalPosition.position) {
          if (playerglobalPosition.rating === 1) {
            primaryPositionIds.push(playerglobalPosition.position.id);
          } else if (playerglobalPosition.rating === 0.95) {
            secondaryPositionIds.push(playerglobalPosition.position.id);
          }
        }
      });

      setPlayerglobal({
        name: playerglobalReducer.name,
        age: playerglobalReducer.age,
        overall: playerglobalReducer.overall,
        countryId: playerglobalReducer.country?.id,
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
        primaryPositionIds:
          primaryPositionIds.length !== 0
            ? primaryPositionIds.map((primaryPositionId) => `${primaryPositionId}`)
            : undefined,
        secondaryPositionIds:
          secondaryPositionIds.length !== 0
            ? secondaryPositionIds.map((secondaryPositionId) => `${secondaryPositionId}`)
            : undefined,
      });

      setSelectedPrimaryPositionIds(primaryPositionIds);
      setSelectedSecondaryPositionIds(secondaryPositionIds);
    } else {
      setPlayerglobal(DEFAULT_PLAYERGLOBAL);
      formPlayerglobal.resetFields();
      setSelectedPrimaryPositionIds([]);
      setSelectedSecondaryPositionIds([]);
    }
  }, [playerglobalReducer]);

  useEffect(() => {
    if (
      playerglobal.name.length >= 3 &&
      playerglobal.name.length <= 40 &&
      playerglobal.age >= 14 &&
      playerglobal.age <= 50 &&
      playerglobal.overall >= 1 &&
      playerglobal.overall <= 100 &&
      playerglobal.countryId &&
      playerglobal.primaryPositionIds.length >= PRIMARY_POSITIONS_MIN &&
      playerglobal.primaryPositionIds.length <= PRIMARY_POSITIONS_MAX &&
      playerglobal.secondaryPositionIds.length <= SECONDARY_POSITIONS_MAX
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
      countryId: Number(value),
    });
  };

  const handleOnChangePrimaryPositionSelect = (values: string[]) => {
    const updatedValues = values.map((value) => Number(value));

    setSelectedPrimaryPositionIds(updatedValues);

    setPlayerglobal({
      ...playerglobal,
      primaryPositionIds: updatedValues,
    });
  };

  const handleOnChangeSecondaryPositionSelect = (values: string[]) => {
    const updatedValues = values.map((value) => Number(value));

    setSelectedSecondaryPositionIds(updatedValues);

    setPlayerglobal({
      ...playerglobal,
      secondaryPositionIds: updatedValues,
    });
  };

  const handleOnClickInsert = async () => {
    if (playerglobalId) {
      await request(
        URL_PLAYERGLOBAL_ID.replace('{playerglobalId}', playerglobalId),
        MethodsEnum.PUT,
        undefined,
        playerglobal,
        'Jogador editado com sucesso!',
      );
    } else {
      await request(
        URL_PLAYERGLOBAL,
        MethodsEnum.POST,
        undefined,
        playerglobal,
        'Jogador inserido com sucesso!',
      );
    }

    await request(URL_PLAYERGLOBAL, MethodsEnum.GET, setPlayersglobal);

    navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL);
  };

  return {
    loading,
    disabledButton,
    isEdit,
    loadingPlayerglobal,
    formPlayerglobal,
    selectedPrimaryPositionIds,
    selectedSecondaryPositionIds,
    PRIMARY_POSITIONS_MAX,
    SECONDARY_POSITIONS_MAX,
    handleOnChangeInput,
    handleOnChangeInputNumber,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
    handleOnChangePrimaryPositionSelect,
    handleOnChangeSecondaryPositionSelect,
  };
};
