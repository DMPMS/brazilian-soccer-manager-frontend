import { RouteObject } from 'react-router-dom';

import SignUp from './screens/SignUp';

export enum SignUpRoutesEnum {
  SIGN_UP = '/sign-up',
}

export const signUpRoutes: RouteObject[] = [
  {
    path: SignUpRoutesEnum.SIGN_UP,
    element: <SignUp />,
  },
];
