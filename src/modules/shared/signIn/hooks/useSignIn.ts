import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_SIGN_IN } from '../../../../shared/constants/dtos';
import {
  ERROR_BACKEND_INVALID_PASSWORD,
  ERROR_INVALID_PASSWORD,
} from '../../../../shared/constants/errorsStatus';
import { URL_AUTH } from '../../../../shared/constants/urls';
import { SignInDTO } from '../../../../shared/dtos/signIn.dto';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { setAuthorizationToken } from '../../../../shared/functions/connection/auth';
import { isValidEmail } from '../../../../shared/functions/isValideEmail';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { AuthType } from '../../../../shared/types/Auth.type';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { FirstScreenRoutesEnum } from '../../../firstScreen/routes';
import { SignUpRoutesEnum } from '../../signUp/routes';

export const useSignIn = () => {
  const { setNotification, setUser } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [disabledButton, setDisabledButton] = useState(true);
  const [signIn, setSignIn] = useState<SignInDTO>(DEFAULT_SIGN_IN);

  useEffect(() => {
    if (signIn.email && signIn.password && isValidEmail(signIn.email)) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [signIn]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    const inputValue = event.target.value;

    setSignIn({
      ...signIn,
      [nameObject]: nameObject === 'email' ? inputValue.toLowerCase() : inputValue,
    });
  };

  const handleOnClickSignIn = () => {
    newRequest(
      MethodsEnum.POST,
      URL_AUTH,
      true,
      {},
      {
        email: signIn.email,
        password: signIn.password,
      },
    )
      .then((data: AuthType) => {
        setUser(data.user);
        setAuthorizationToken(data.accessToken);
        navigate(FirstScreenRoutesEnum.FIRST_SCREEN);
      })
      .catch((error: AxiosError) => {
        const responseErrorMessage = (error.response?.data as { message: string }).message;

        if (responseErrorMessage === ERROR_BACKEND_INVALID_PASSWORD) {
          setNotification(ERROR_INVALID_PASSWORD, 'error');
        } else {
          setNotification(error.message, 'error');
        }
      });
  };

  const handleOnClickSignUp = () => {
    navigate(SignUpRoutesEnum.SIGN_UP);
  };

  return {
    loading,
    disabledButton,
    handleOnChangeInput,
    handleOnClickSignIn,
    handleOnClickSignUp,
  };
};
