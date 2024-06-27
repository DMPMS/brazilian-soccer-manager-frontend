import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FlexProject from '../../../shared/components/flex/FlexProject';
import LoadingProject from '../../../shared/components/loading/LoadingProject';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { HomeRoutesEnum } from '../../admin/home/routes';

const FirstScreen = () => {
  const { user } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(HomeRoutesEnum.HOME);
    }
  }, [user]);

  return (
    <FlexProject justify="center" align="center" style={{ minHeight: '100vh' }}>
      <LoadingProject width={50} height={50} />
    </FlexProject>
  );
};

export default FirstScreen;
