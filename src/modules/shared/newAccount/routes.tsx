import { RouteObject } from 'react-router-dom';

import NewAccount from './screens/NewAccount';

export enum NewAccountRoutesEnum {
  NEW_ACCOUNT = '/new-account',
}

export const newAccountRoutes: RouteObject[] = [
  {
    path: NewAccountRoutesEnum.NEW_ACCOUNT,
    element: <NewAccount />,
  },
];
