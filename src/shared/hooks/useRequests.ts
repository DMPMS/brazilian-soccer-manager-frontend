import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthType } from '../../modules/login/types/AuthType';
import { ManagerglobalRoutesEnum } from '../../modules/managerglobal/routes';
import { ERROR_INVALID_PASSWORD } from '../constants/errorsStatus';
import { URL_AUTH } from '../constants/urls';
import { setAuthorizationToken } from '../functions/connection/auth';
import { connectionAPIPost } from '../functions/connection/connectionAPI';
import { useGlobalContext } from './useGlobalContext';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setNotification, setUser } = useGlobalContext();

  const getRequest = async (url: string) => {
    setLoading(true);
    return await axios({
      method: 'get',
      url: url,
    })
      .then((result) => {
        return result.data;
      })
      .catch(() => {
        alert('Erro');
      });
  };

  const postRequest = async <Type>(url: string, body: unknown): Promise<Type | undefined> => {
    setLoading(true);
    const returnData = await connectionAPIPost<Type>(url, body)
      .then((result) => {
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
      });

    setLoading(false);
    return returnData;
  };

  const authRequest = async (body: unknown): Promise<void> => {
    setLoading(true);

    await connectionAPIPost<AuthType>(URL_AUTH, body)
      .then((result) => {
        setUser(result.user);
        setAuthorizationToken(result.accessToken);
        navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
        return result;
      })
      .catch(() => {
        setNotification(ERROR_INVALID_PASSWORD, 'error');
        return undefined;
      });

    setLoading(false);
  };

  return {
    loading,
    authRequest,
    getRequest,
    postRequest,
  };
};
