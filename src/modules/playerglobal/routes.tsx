import { RouteObject } from 'react-router-dom';

import Playerglobal from './screens/Playerglobal';
import PlayerglobalInsert from './screens/PlayerglobalInsert';

export enum PlayerglobalRoutesEnum {
  PLAYERGLOBAL = '/playerglobal',
  PLAYERGLOBAL_INSERT = '/playerglobal/insert',
  PLAYERGLOBAL_EDIT = '/playerglobal/:playerglobalId',
}

export const playerglobalRoutes: RouteObject[] = [
  {
    path: PlayerglobalRoutesEnum.PLAYERGLOBAL,
    element: <Playerglobal />,
  },
  {
    path: PlayerglobalRoutesEnum.PLAYERGLOBAL_INSERT,
    element: <PlayerglobalInsert />,
  },
  {
    path: PlayerglobalRoutesEnum.PLAYERGLOBAL_EDIT,
    element: <PlayerglobalInsert />,
  },
];
