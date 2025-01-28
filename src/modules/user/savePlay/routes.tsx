import { RouteObject } from 'react-router-dom';

import SavePlayCalendar from './screens/SavePlayCalendar';
import SavePlayHome from './screens/SavePlayHome';
import SavePlaySquad from './screens/SavePlaySquad';

export enum SavePlayRoutesEnum {
  SAVE_PLAY_HOME = '/save/play/home',
  SAVE_PLAY_SQUAD = '/save/play/squad',
  SAVE_PLAY_CALENDAR = '/save/play/calendar',
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
  {
    path: SavePlayRoutesEnum.SAVE_PLAY_CALENDAR,
    element: <SavePlayCalendar />,
  },
];
