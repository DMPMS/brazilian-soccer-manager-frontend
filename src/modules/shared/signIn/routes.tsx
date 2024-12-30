import { RouteObject } from 'react-router-dom';

import SignIn from './screens/SignIn';

export enum SignInRoutesEnum {
  SIGN_IN = '/sign-in',
}

export const signInRoutes: RouteObject[] = [
  {
    path: SignInRoutesEnum.SIGN_IN,
    element: <SignIn />,
  },
];
