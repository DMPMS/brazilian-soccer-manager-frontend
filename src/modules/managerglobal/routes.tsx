import { RouteObject } from 'react-router-dom';

import Managerglobal from './screens/Managerglobal';

export enum ManagerglobalRoutesEnum {
  MANAGERGLOBAL = '/managerglobal',
}

export const managerglobalRoutes: RouteObject[] = [
  {
    path: ManagerglobalRoutesEnum.MANAGERGLOBAL,
    element: <Managerglobal />,
  },
];
