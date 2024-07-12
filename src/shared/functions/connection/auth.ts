import { NavigateFunction, redirect } from 'react-router-dom';

import { LoginRoutesEnum } from '../../../modules/shared/login/routes';
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { URL_USER_LOGGED_IN } from '../../constants/urls';
import { UserType } from '../../types/UserType';
import { connectionAPIGet } from './connectionAPI';
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy';

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();
  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN);
  }

  const user = await connectionAPIGet<UserType>(URL_USER_LOGGED_IN).catch(() => {
    unsetAuthorizationToken();
  });

  if (!user) {
    return redirect(LoginRoutesEnum.LOGIN);
  }

  return null;
};

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken();
  navigate(LoginRoutesEnum.LOGIN);
};
