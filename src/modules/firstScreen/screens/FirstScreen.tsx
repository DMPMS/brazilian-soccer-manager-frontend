import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../../shared/components/loading/Loading';
import { DisplayFlexJustifyCenter } from '../../../shared/components/styles/display.styled';
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
    <DisplayFlexJustifyCenter>
      <Loading size="large" />
    </DisplayFlexJustifyCenter>
  );
};

export default FirstScreen;
