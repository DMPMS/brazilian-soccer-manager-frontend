import { RouteObject } from 'react-router-dom';

import Teamglobal from './screens/Teamglobal';
import TeamglobalInsert from './screens/TeamglobalInsert';

export enum TeamglobalRoutesEnum {
  TEAMGLOBAL = '/teamglobal',
  TEAMGLOBAL_INSERT = '/teamglobal/insert',
  TEAMGLOBAL_EDIT = '/teamglobal/:teamglobalId',
}

export const teamglobalRoutes: RouteObject[] = [
  {
    path: TeamglobalRoutesEnum.TEAMGLOBAL,
    element: <Teamglobal />,
  },
  {
    path: TeamglobalRoutesEnum.TEAMGLOBAL_INSERT,
    element: <TeamglobalInsert />,
  },
  {
    path: TeamglobalRoutesEnum.TEAMGLOBAL_EDIT,
    element: <TeamglobalInsert />,
  },
];
