import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_LOGIN } from '../../../../shared/constants/dtos';
import { ERROR_INVALID_PASSWORD } from '../../../../shared/constants/errorsStatus';
import { URL_AUTH } from '../../../../shared/constants/urls';
import { LoginDTO } from '../../../../shared/dtos/login.dto.';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { setAuthorizationToken } from '../../../../shared/functions/connection/auth';
import { isValidEmail } from '../../../../shared/functions/isValideEmail';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { FirstScreenRoutesEnum } from '../../../firstScreen/routes';
import { AuthType } from '../types/AuthType';

export const useLogin = () => {
  const { setNotification, setUser } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [disabledButton, setDisabledButton] = useState(true);
  const [login, setLogin] = useState<LoginDTO>(DEFAULT_LOGIN);

  useEffect(() => {
    if (login.email && login.password && isValidEmail(login.email)) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [login]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setLogin({
      ...login,
      [nameObject]: event.target.value,
    });
  };

  const handleOnClickLogin = () => {
    newRequest(
      MethodsEnum.POST,
      URL_AUTH,
      {},
      {
        email: login.email,
        password: login.password,
      },
    )
      .then((data: AuthType) => {
        setUser(data.user);
        setAuthorizationToken(data.accessToken);
        navigate(FirstScreenRoutesEnum.FIRST_SCREEN);
      })
      .catch(() => {
        setNotification(ERROR_INVALID_PASSWORD, 'error');
      });
  };

  return {
    loading,
    disabledButton,
    handleOnChangeInput,
    handleOnClickLogin,
  };
};
