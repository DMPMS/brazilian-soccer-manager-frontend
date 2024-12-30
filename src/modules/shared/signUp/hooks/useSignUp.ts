import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_SIGN_UP } from '../../../../shared/constants/dtos';
import {
  ERROR_BACKEND_EMAIL_ALREADY_REGISTERED,
  ERROR_BACKEND_INVALID_PASSWORD,
  ERROR_EMAIL_ALREADY_REGISTERED,
  ERROR_INVALID_PASSWORD,
} from '../../../../shared/constants/errorsStatus';
import {
  CURRENT_DATE_UTC,
  DEFAULT_DATE_FORMAT,
  USER_MAX_AGE,
  USER_MAX_LENGH_NAME,
  USER_MAX_LENGH_PASSWORD,
  USER_MIN_AGE,
  USER_MIN_LENGH_NAME,
  USER_MIN_LENGH_PASSWORD,
} from '../../../../shared/constants/others';
import { URL_AUTH, URL_USER } from '../../../../shared/constants/urls';
import { signUpDTO } from '../../../../shared/dtos/signUp.dto';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { setAuthorizationToken } from '../../../../shared/functions/connection/auth';
import { isValidEmail } from '../../../../shared/functions/isValideEmail';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { SaveRoutesEnum } from '../../../user/save/routes';
import { SignInRoutesEnum } from '../../signIn/routes';

export const useSignUp = () => {
  const { setNotification, setUser: setUserReducer } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [disabledButton, setDisabledButton] = useState(true);
  const [user, setUser] = useState<signUpDTO>(DEFAULT_SIGN_UP);

  const [formUser] = useForm();

  useEffect(() => {
    if (
      user.name.length >= USER_MIN_LENGH_NAME &&
      user.name.length <= USER_MAX_LENGH_NAME &&
      user.birthdate &&
      user.email &&
      isValidEmail(user.email) &&
      user.password.length >= USER_MIN_LENGH_PASSWORD &&
      user.password.length <= USER_MAX_LENGH_PASSWORD &&
      user.confirmPassword === user.password &&
      user.countryId
    ) {
      const birthdate = dayjs(user.birthdate).startOf('day');
      const minDate = CURRENT_DATE_UTC.subtract(USER_MIN_AGE, 'year').startOf('day');
      const maxDate = CURRENT_DATE_UTC.subtract(USER_MAX_AGE, 'year').startOf('day');

      if (!(birthdate.isAfter(minDate) || birthdate.isBefore(maxDate))) {
        setDisabledButton(false);
      } else {
        setDisabledButton(true);
      }
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    const inputValue = event.target.value;

    setUser({
      ...user,
      [nameObject]: nameObject === 'email' ? inputValue.toLowerCase() : inputValue,
    });
  };

  const handleOnChangeDatePicker = (date: dayjs.Dayjs | null, nameObject: string) => {
    const datePickerValue = date ? date.format(DEFAULT_DATE_FORMAT) : '';

    setUser({
      ...user,
      [nameObject]: datePickerValue,
    });
  };

  const handleOnChangeCountrySelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setUser({
      ...user,
      countryId: selectValue,
    });
  };

  const handleOnClickInsert = async () => {
    try {
      await newRequest(MethodsEnum.POST, URL_USER, true, {}, user);
      setNotification('Conta criada.', 'success');

      try {
        const data = await newRequest(
          MethodsEnum.POST,
          URL_AUTH,
          true,
          {},
          {
            email: user.email,
            password: user.password,
          },
        );

        setUserReducer(data.user);
        setAuthorizationToken(data.accessToken);
        navigate(SaveRoutesEnum.SAVE);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const responseErrorMessage = (error.response?.data as { message: string }).message;

        if (responseErrorMessage === ERROR_BACKEND_INVALID_PASSWORD) {
          setNotification(ERROR_INVALID_PASSWORD, 'error');
        } else {
          setNotification(error.message, 'error');
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const responseErrorMessage = (error.response?.data as { message: string }).message;

      if (responseErrorMessage === ERROR_BACKEND_EMAIL_ALREADY_REGISTERED) {
        setNotification(ERROR_EMAIL_ALREADY_REGISTERED, 'error');
      } else {
        setNotification(error.message, 'error');
      }
    }
  };

  const handleOnClickReset = () => {
    setUser(DEFAULT_SIGN_UP);
    formUser.resetFields();
  };

  const handleOnClickCancel = () => {
    navigate(SignInRoutesEnum.SIGN_IN);
  };

  return {
    loading,
    disabledButton,
    formUser,
    handleOnChangeInput,
    handleOnChangeDatePicker,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeCountrySelect,
  };
};
