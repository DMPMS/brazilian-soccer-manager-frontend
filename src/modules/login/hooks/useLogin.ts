import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginDTO } from '../../../shared/dtos/login.dto.';
import { isValidEmail } from '../../../shared/functions/isValideEmail';
import { useRequests } from '../../../shared/hooks/useRequests';

const DEFAULT_LOGIN = {
  email: '',
  password: '',
};

export const useLogin = () => {
  const { authRequest, loading } = useRequests();
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
    authRequest(navigate, {
      email: login.email,
      password: login.password,
    });
  };

  return {
    loading,
    disabledButton,
    handleOnChangeInput,
    handleOnClickLogin,
  };
};
