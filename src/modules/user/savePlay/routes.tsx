import { RouteObject } from 'react-router-dom';

import SavePlayHome from './screens/SavePlayHome';
import SavePlaySquad from './screens/SavePlaySquad';

export enum SavePlayRoutesEnum {
  SAVE_PLAY_HOME = '/save/play/home',
  SAVE_PLAY_SQUAD = '/save/play/squad',
}

export const savePlayRoutes: RouteObject[] = [
  {
    path: SavePlayRoutesEnum.SAVE_PLAY_HOME,
    element: <SavePlayHome />,
  },
  {
    path: SavePlayRoutesEnum.SAVE_PLAY_SQUAD,
    element: <SavePlaySquad />,
  },
];
