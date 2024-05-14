import { RouteObject } from 'react-router-dom';

import Competitionglobal from './screens/Competitionglobal';
import CompetitionglobalInsert from './screens/CompetitionglobalInsert';

export enum CompetitionglobalRoutesEnum {
  COMPETITIONGLOBAL = '/competitionglobal',
  COMPETITIONGLOBAL_INSERT = '/competitionglobal/insert',
}

export const competitionglobalRoutes: RouteObject[] = [
  {
    path: CompetitionglobalRoutesEnum.COMPETITIONGLOBAL,
    element: <Competitionglobal />,
  },
  {
    path: CompetitionglobalRoutesEnum.COMPETITIONGLOBAL_INSERT,
    element: <CompetitionglobalInsert />,
  },
];
