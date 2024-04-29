import { RouteObject } from 'react-router-dom';

import Teamglobal from './screens/Teamglobal';

export enum TeamglobalRoutesEnum {
  TEAMGLOBAL = '/teamglobal',
  TEAMGLOBAL_INSERT = '/teamglobal/insert',
}

export const teamglobalRoutes: RouteObject[] = [
  {
    path: TeamglobalRoutesEnum.TEAMGLOBAL,
    element: <Teamglobal />,
  },
];
