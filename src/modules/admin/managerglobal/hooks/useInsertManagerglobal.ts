import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_MANAGERGLOBAL } from '../../../../shared/constants/dtos';
import {
  CURRENT_DATE_UTC,
  DEFAULT_DATE_FORMAT,
  MANAGERGLOBAL_MAX_AGE,
  MANAGERGLOBAL_MAX_LENGH_NAME,
  MANAGERGLOBAL_MIN_AGE,
  MANAGERGLOBAL_MIN_LENGH_NAME,
} from '../../../../shared/constants/others';
import { URL_MANAGERGLOBAL, URL_MANAGERGLOBAL_ID } from '../../../../shared/constants/urls';
import { InsertManagerglobalDTO } from '../../../../shared/dtos/InsertManagerglobal.dto';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { useManagerglobalReducer } from '../../../../store/reducers/managerglobalReducer/useManagerglobalReducer';
import { ManagerglobalRoutesEnum } from '../routes';

export const useInsertManagerglobal = (managerglobalId?: string) => {
  const {
    setManagersglobal,
    managerglobal: managerglobalReducer,
    setManagerglobal: setManagerglobalReducer,
  } = useManagerglobalReducer();
  const { setNotification } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [loadingManagerglobal, setLoadingManagerglobal] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [managerglobal, setManagerglobal] = useState<InsertManagerglobalDTO>(DEFAULT_MANAGERGLOBAL);

  const [formManagerglobal] = useForm();

  useEffect(() => {
    if (managerglobalId) {
      const findAndSetManagerglobalReducer = async (managerglobalId: string) => {
        await newRequest(
          MethodsEnum.GET,
          URL_MANAGERGLOBAL_ID.replace('{managerglobalId}', managerglobalId),
        ).then((data) => {
          setManagerglobalReducer(data);
        });

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
        birthdate: managerglobalReducer.birthdate,
        countryId: managerglobalReducer.country?.id,
      });

      formManagerglobal.setFieldsValue({
        name: managerglobalReducer.name,
        birthdate: dayjs(managerglobalReducer.birthdate),
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
      managerglobal.birthdate &&
      managerglobal.countryId
    ) {
      const birthdate = dayjs(managerglobal.birthdate).startOf('day');
      const minDate = CURRENT_DATE_UTC.subtract(MANAGERGLOBAL_MIN_AGE, 'year').startOf('day');
      const maxDate = CURRENT_DATE_UTC.subtract(MANAGERGLOBAL_MAX_AGE, 'year').startOf('day');

      if (!(birthdate.isAfter(minDate) || birthdate.isBefore(maxDate))) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    } else {
      setDisabledButton(true);
    }
  }, [managerglobal]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    const inputValue = event.target.value;

    setManagerglobal({
      ...managerglobal,
      [nameObject]: inputValue,
    });
  };

  const handleOnChangeDatePicker = (date: dayjs.Dayjs | null, nameObject: string) => {
    setManagerglobal({
      ...managerglobal,
      [nameObject]: date ? date.format(DEFAULT_DATE_FORMAT) : '',
    });
  };

  const handleOnChangeCountrySelect = (value: string) => {
    setManagerglobal({
      ...managerglobal,
      countryId: value ? Number(value) : undefined,
    });
  };

  const handleOnClickInsert = async () => {
    if (managerglobalId) {
      await newRequest(
        MethodsEnum.PUT,
        URL_MANAGERGLOBAL_ID.replace('{managerglobalId}', managerglobalId),
        false,
        {},
        managerglobal,
      );
    } else {
      await newRequest(MethodsEnum.POST, URL_MANAGERGLOBAL, false, {}, managerglobal);
    }

    await newRequest(MethodsEnum.GET, URL_MANAGERGLOBAL).then((data) => {
      setManagersglobal(data);
    });

    if (managerglobalId) {
      setNotification('Treinador editado.', 'success');
    } else {
      setNotification('Treinador inserido.', 'success');
    }

    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
  };

  const handleOnClickReset = () => {
    setManagerglobal(DEFAULT_MANAGERGLOBAL);
    formManagerglobal.resetFields();
  };

  const handleOnClickCancel = () => {
    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
  };

  return {
    loading,
    disabledButton,
    isEdit,
    loadingManagerglobal,
    formManagerglobal,
    handleOnChangeInput,
    handleOnChangeDatePicker,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeCountrySelect,
  };
};
