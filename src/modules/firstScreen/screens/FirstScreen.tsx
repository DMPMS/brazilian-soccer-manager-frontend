import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { ManagerglobalRoutesEnum } from '../../managerglobal/routes';

const FirstScreen = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
    }
  }, [user]);

  return <Spin />;
};

export default FirstScreen;
