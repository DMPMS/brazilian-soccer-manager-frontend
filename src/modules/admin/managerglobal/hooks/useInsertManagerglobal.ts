import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_MANAGERGLOBAL } from '../../../../shared/constants/dtos';
import {
  MANAGERGLOBAL_MAX_AGE,
  MANAGERGLOBAL_MAX_LENGH_NAME,
  MANAGERGLOBAL_MIN_AGE,
  MANAGERGLOBAL_MIN_LENGH_NAME,
} from '../../../../shared/constants/others';
import {
  URL_MANAGERGLOBAL,
  URL_MANAGERGLOBAL_ID,
  URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
} from '../../../../shared/constants/urls';
import { InsertManagerglobalDTO } from '../../../../shared/dtos/InsertManagerglobal.dto';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { useManagerglobalReducer } from '../../../../store/reducers/managerglobalReducer/useManagerglobalReducer';
import { ManagerglobalRoutesEnum } from '../routes';

export const useInsertManagerglobal = (managerglobalId?: string) => {
  const {
    setManagersglobal,
    setManagersglobalWithoutTeamglobal,
    managerglobal: managerglobalReducer,
    setManagerglobal: setManagerglobalReducer,
  } = useManagerglobalReducer();

  const { request, loading } = useRequests();
  const navigate = useNavigate();

  const [loadingManagerglobal, setLoadingManagerglobal] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [managerglobal, setManagerglobal] = useState<InsertManagerglobalDTO>(DEFAULT_MANAGERGLOBAL);

  const [formManagerglobal] = useForm();

  useEffect(() => {
    if (managerglobalId) {
      const findAndSetManagerglobalReducer = async (managerglobalId: string) => {
        await request(
          URL_MANAGERGLOBAL_ID.replace('{managerglobalId}', managerglobalId),
          MethodsEnum.GET,
          setManagerglobalReducer,
        );

        setLoadingManagerglobal(false);
      };

      setIsEdit(true);
      findAndSetManagerglobalReducer(managerglobalId);
    } else {
      setIsEdit(false);
      setManagerglobalReducer(undefined);
      setLoadingManagerglobal(false);
    }
  }, [managerglobalId]);

  useEffect(() => {
    if (managerglobalReducer) {
      setManagerglobal({
        name: managerglobalReducer.name,
        age: managerglobalReducer.age,
        countryId: managerglobalReducer.country?.id,
      });

      formManagerglobal.setFieldsValue({
        name: managerglobalReducer.name,
        age: managerglobalReducer.age,
        countryId:
          managerglobalReducer.country?.id !== undefined
            ? `${managerglobalReducer.country.id}`
            : undefined,
      });
    } else {
      setManagerglobal(DEFAULT_MANAGERGLOBAL);
      formManagerglobal.resetFields();
    }
  }, [managerglobalReducer]);

  useEffect(() => {
    if (
      managerglobal.name.length >= MANAGERGLOBAL_MIN_LENGH_NAME &&
      managerglobal.name.length <= MANAGERGLOBAL_MAX_LENGH_NAME &&
      managerglobal.age >= MANAGERGLOBAL_MIN_AGE &&
      managerglobal.age <= MANAGERGLOBAL_MAX_AGE &&
      managerglobal.countryId
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [managerglobal]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setManagerglobal({
      ...managerglobal,
      [nameObject]: event.target.value,
    });
  };

  const handleOnChangeInputNumber = (value: number | string | null, nameObject: string) => {
    if (typeof value === 'number') {
      setManagerglobal({
        ...managerglobal,
        [nameObject]: value,
      });
    } else {
      setManagerglobal({
        ...managerglobal,
        [nameObject]: 0,
      });
    }
  };

  const handleOnChangeCountrySelect = (value: string) => {
    setManagerglobal({
      ...managerglobal,
      countryId: value ? Number(value) : undefined,
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
    }

    await request(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);
    await request(
      URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
      MethodsEnum.GET,
      setManagersglobalWithoutTeamglobal,
    );

    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
  };

  return {
    loading,
    disabledButton,
    isEdit,
    loadingManagerglobal,
    formManagerglobal,
    handleOnChangeInput,
    handleOnChangeInputNumber,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
  };
};