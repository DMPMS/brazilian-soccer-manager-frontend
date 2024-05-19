import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  URL_MANAGERGLOBAL,
  URL_MANAGERGLOBAL_ID,
  URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
} from '../../../shared/constants/urls';
import { InsertManagerglobalDTO } from '../../../shared/dtos/InsertManagerglobal.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useManagerglobalReducer } from '../../../store/reducers/managerglobalReducer/useManagerglobalReducer';
import { ManagerglobalRoutesEnum } from '../routes';

const DEFAULT_MANAGERGLOBAL = {
  name: '',
  age: 0,
};

export const useInsertManagerglobal = (managerglobalId?: string) => {
  const navigate = useNavigate();

  const [loadingManagerglobal, setLoadingManagerglobal] = useState(false);
  const { request, loading } = useRequests();
  const {
    setManagersglobal,
    setManagersglobalWithoutTeamglobal,
    managerglobal: managerglobalReducer,
    setManagerglobal: setManagerglobalReducer,
  } = useManagerglobalReducer();

  const [disabledButton, setDisabledButton] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [managerglobal, setManagerglobal] = useState<InsertManagerglobalDTO>(DEFAULT_MANAGERGLOBAL);

  useEffect(() => {
    if (managerglobalReducer) {
      setManagerglobal({
        name: managerglobalReducer.name,
        age: managerglobalReducer.age,
        countryId: managerglobalReducer.country?.id,
      });
    } else {
      setManagerglobal(DEFAULT_MANAGERGLOBAL);
    }
  }, [managerglobalReducer]);

  useEffect(() => {
    const findManagerglobalById = async (managerglobalId: string) => {
      setLoadingManagerglobal(true);
      await request(
        URL_MANAGERGLOBAL_ID.replace('{managerglobalId}', managerglobalId),
        MethodsEnum.GET,
        setManagerglobalReducer,
      );
      setLoadingManagerglobal(false);
    };

    if (managerglobalId) {
      setIsEdit(true);
      findManagerglobalById(managerglobalId);
    } else {
      setIsEdit(false);
      setManagerglobalReducer(undefined);
      setManagerglobal(DEFAULT_MANAGERGLOBAL);
    }
  }, [managerglobalId]);

  useEffect(() => {
    if (managerglobal.name && managerglobal.countryId && managerglobal.age > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [managerglobal]);

  const handleOnChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setManagerglobal({
      ...managerglobal,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    });
  };

  const handleOnChangeCountrySelect = (value: string) => {
    setManagerglobal({
      ...managerglobal,
      countryId: Number(value),
    });
  };

  const handleOnClickInsert = async () => {
    if (managerglobalId) {
      await request(
        URL_MANAGERGLOBAL_ID.replace('{managerglobalId}', managerglobalId),
        MethodsEnum.PUT,
        undefined,
        managerglobal,
        'Treinador editado com sucesso!',
      );
    } else {
      await request(
        URL_MANAGERGLOBAL,
        MethodsEnum.POST,
        undefined,
        managerglobal,
        'Treinador inserido com sucesso!',
      );

      await request(
        URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
        MethodsEnum.GET,
        setManagersglobalWithoutTeamglobal,
      );
    }

    await request(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);

    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
  };

  return {
    managerglobal,
    loading,
    disabledButton,
    isEdit,
    loadingManagerglobal,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
  };
};
