import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FlexProject from '../../../shared/components/flex/FlexProject';
import LoadingProject from '../../../shared/components/loading/LoadingProject';
import { UserTypeEnum } from '../../../shared/enums/userType.enum';
import { getUserInfoByToken } from '../../../shared/functions/connection/auth';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { HomeRoutesEnum } from '../../admin/home/routes';
import { SaveRoutesEnum } from '../../user/save/routes';

const FirstScreen = () => {
  const { user } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getUserInfoByToken();
    if (userToken?.userType === UserTypeEnum.User) {
      navigate(SaveRoutesEnum.SAVE);
    } else if (userToken?.userType === UserTypeEnum.Admin) {
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
