import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuthorizationToken } from '../../../shared/functions/connection/auth';
import { LogintRoutesEnum } from '../../login/routes';
import { ManagerglobalRoutesEnum } from '../../managerglobal/routes';

const FirstScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
    } else {
      navigate(LogintRoutesEnum.LOGIN);
    }
  }, []);

  return <Spin />;
};

export default FirstScreen;
