import { LoaderFunction, NavigateFunction, redirect } from 'react-router-dom';

import { LoginRoutesEnum } from '../../../modules/shared/login/routes';
import { AUTHORIZATION_KEY } from '../../constants/authorizationConstants';
import { URL_USER_LOGGED_IN } from '../../constants/urls';
import { UserTypeEnum } from '../../enums/userType.enum';
import { UserTokenType } from '../../types/UserTokenType';
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

export const getUserInfoByToken = (): UserTokenType | undefined => {
  const token = getAuthorizationToken();
  const tokenSplited = token?.split('.');

  if (tokenSplited && tokenSplited.length > 1) {
    return JSON.parse(window.atob(tokenSplited[1]));
  }

  return undefined;
};

export const verifyUserTypeLoggedIn = (userType: UserTypeEnum): LoaderFunction => {
  return async () => {
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

    const tokenSplited = token.split('.');

    if (tokenSplited.length > 1) {
      const decodedToken = JSON.parse(window.atob(tokenSplited[1])) as UserTokenType;

      if (decodedToken.userType !== userType) {
        return redirect(LoginRoutesEnum.LOGIN);
      }
    } else {
      return redirect(LoginRoutesEnum.LOGIN);
    }

    return null;
  };
};

export const verifyLoggedIn = (): LoaderFunction => {
  return async () => {
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
};

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken();
  navigate(LoginRoutesEnum.LOGIN);
};
