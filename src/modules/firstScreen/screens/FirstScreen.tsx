import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { ManagerglobalRoutesEnum } from '../../managerglobal/routes';

const FirstScreen = () => {
  const { user } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
    }
  }, [user]);

  return <Spin />;
};

export default FirstScreen;
