import { RouteObject } from 'react-router-dom';

import SavePlayCalendar from './screens/SavePlayCalendar';
import SavePlayCompetition from './screens/SavePlayCompetition';
import SavePlayCompetitionDetail from './screens/SavePlayCompetitionDetail';
import SavePlayHome from './screens/SavePlayHome';
import SavePlayPlayMatch from './screens/SavePlayPlayMatch';
import SavePlaySquad from './screens/SavePlaySquad';

export enum SavePlayRoutesEnum {
  SAVE_PLAY_HOME = '/save/play/home',
  SAVE_PLAY_SQUAD = '/save/play/squad',
  SAVE_PLAY_CALENDAR = '/save/play/calendar',
  SAVE_PLAY_COMPETITION = '/save/play/competition',
  SAVE_PLAY_COMPETITION_DETAIL = '/save/play/competition/:competitionsaveId',
  SAVE_PLAY_PLAY_MATCH = '/save/play/match/play',
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
  {
    path: SavePlayRoutesEnum.SAVE_PLAY_COMPETITION,
    element: <SavePlayCompetition />,
  },
  {
    path: SavePlayRoutesEnum.SAVE_PLAY_COMPETITION_DETAIL,
    element: <SavePlayCompetitionDetail />,
  },
  {
    path: SavePlayRoutesEnum.SAVE_PLAY_PLAY_MATCH,
    element: <SavePlayPlayMatch />,
  },
];
