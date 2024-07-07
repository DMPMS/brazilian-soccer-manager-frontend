import axios from 'axios';
import { useState } from 'react';

import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer';
import { getAuthorizationToken } from '../functions/connection/auth';
import { MethodType } from '../functions/connection/connectionAPI';

export const useNewRequests = () => {
  const { setNotification } = useGlobalReducer();

  const [loading, setLoading] = useState(false);

  const newRequest = async (methodType: MethodType, url: string, params = {}, body = {}) => {
    setLoading(true);

    const headers = {
      Authorization: getAuthorizationToken(),
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios({
        method: methodType,
        url: url,
        params: params,
        data: body,
        headers: headers,
      });
      return response.data;
    } catch (error) {
      setNotification(String(error), 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    newRequest,
  };
};
