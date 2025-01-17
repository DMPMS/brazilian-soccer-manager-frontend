import { RouteObject } from 'react-router-dom';

import Managerglobal from './screens/Managerglobal';
import ManagerglobalInsert from './screens/ManagerglobalInsert';

export enum ManagerglobalRoutesEnum {
  MANAGERGLOBAL = '/managerglobal',
  MANAGERGLOBAL_INSERT = '/managerglobal/insert',
  MANAGERGLOBAL_EDIT = '/managerglobal/:managerglobalId',
}

export const managerglobalRoutes: RouteObject[] = [
  {
    path: ManagerglobalRoutesEnum.MANAGERGLOBAL,
    element: <Managerglobal />,
  },
  {
    path: ManagerglobalRoutesEnum.MANAGERGLOBAL_INSERT,
    element: <ManagerglobalInsert />,
  },
  {
    path: ManagerglobalRoutesEnum.MANAGERGLOBAL_EDIT,
    element: <ManagerglobalInsert />,
  },
];
