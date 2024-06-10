import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FlexProject from '../../../shared/components/flex/FlexProject';
import LoadingProject from '../../../shared/components/loading/LoadingProject';
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
      <LoadingProject size="large" />
    </FlexProject>
  );
};

export default FirstScreen;
