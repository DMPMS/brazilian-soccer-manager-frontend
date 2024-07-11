import { RouteObject } from 'react-router-dom';

import NewAccountScreen from './screens/NewAccountScreen';

export enum NewAccountRoutesEnum {
  NEW_ACCOUNT = '/new-account',
}

export const newAccountRoutes: RouteObject[] = [
  {
    path: NewAccountRoutesEnum.NEW_ACCOUNT,
    element: <NewAccountScreen />,
  },
];
