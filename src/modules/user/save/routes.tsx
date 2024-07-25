import { RouteObject } from 'react-router-dom';

import Save from './screens/Save';

export enum SaveRoutesEnum {
  SAVE = '/save',
}

export const saveRoutes: RouteObject[] = [
  {
    path: SaveRoutesEnum.SAVE,
    element: <Save />,
  },
];
