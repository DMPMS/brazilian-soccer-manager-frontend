import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FlexProject from '../../../shared/components/flex/FlexProject';
import Loading from '../../../shared/components/loading/Loading';
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

  return (
    <FlexProject justify="center">
      <Loading size="large" />
    </FlexProject>
  );
};

export default FirstScreen;
