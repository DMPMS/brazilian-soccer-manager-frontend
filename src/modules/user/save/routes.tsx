import { RouteObject } from 'react-router-dom';

import Save from './screens/Save';
import SaveInsert from './screens/SaveInsert';

export enum SaveRoutesEnum {
  SAVE = '/save',
  SAVE_INSERT = '/save/insert',
}

export const saveRoutes: RouteObject[] = [
  {
    path: SaveRoutesEnum.SAVE,
    element: <Save />,
  },
  {
    path: SaveRoutesEnum.SAVE_INSERT,
    element: <SaveInsert />,
  },
];
