import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_USER } from '../../../../shared/constants/dtos';
import {
  ERROR_BACKEND_EMAIL_ALREADY_REGISTERED,
  ERROR_BACKEND_INVALID_PASSWORD,
  ERROR_EMAIL_ALREADY_REGISTERED,
  ERROR_INVALID_PASSWORD,
} from '../../../../shared/constants/errorsStatus';
import {
  USER_MAX_AGE,
  USER_MAX_LENGH_NAME,
  USER_MAX_LENGH_PASSWORD,
  USER_MIN_AGE,
  USER_MIN_LENGH_NAME,
  USER_MIN_LENGH_PASSWORD,
} from '../../../../shared/constants/others';
import { URL_AUTH, URL_USER } from '../../../../shared/constants/urls';
import { createUserDTO } from '../../../../shared/dtos/createUser.dto';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { setAuthorizationToken } from '../../../../shared/functions/connection/auth';
import { isValidEmail } from '../../../../shared/functions/isValideEmail';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { SaveRoutesEnum } from '../../../user/save/routes';
import { LoginRoutesEnum } from '../../login/routes';

export const useNewAccount = () => {
  const { setNotification, setUser: setUserReducer } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [disabledButton, setDisabledButton] = useState(true);
  const [user, setUser] = useState<createUserDTO>(DEFAULT_USER);

  const [formUser] = useForm();

  useEffect(() => {
    if (
      user.name.length >= USER_MIN_LENGH_NAME &&
      user.name.length <= USER_MAX_LENGH_NAME &&
      user.age >= USER_MIN_AGE &&
      user.age <= USER_MAX_AGE &&
      user.email &&
      isValidEmail(user.email) &&
      user.password.length >= USER_MIN_LENGH_PASSWORD &&
      user.password.length <= USER_MAX_LENGH_PASSWORD &&
      user.confirmPassword === user.password &&
      user.countryId
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setUser({
      ...user,
      [nameObject]: nameObject === 'email' ? event.target.value.toLowerCase() : event.target.value,
    });
  };

  const handleOnChangeInputNumber = (value: number | string | null, nameObject: string) => {
    if (typeof value === 'number') {
      setUser({
        ...user,
        [nameObject]: value,
      });
    } else {
      setUser({
        ...user,
        [nameObject]: 0,
      });
    }
  };

  const handleOnChangeCountrySelect = (value: string) => {
    setUser({
      ...user,
      countryId: value ? Number(value) : undefined,
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
    setUser(DEFAULT_USER);
    formUser.resetFields();
  };

  const handleOnClickCancel = () => {
    navigate(LoginRoutesEnum.LOGIN);
  };

  return {
    loading,
    disabledButton,
    formUser,
    handleOnChangeInput,
    handleOnChangeInputNumber,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeCountrySelect,
  };
};
