import { RouteObject } from 'react-router-dom';

import Home from './screens/home';

export enum HomeRoutesEnum {
  HOME = '/home',
}

export const homeRoutes: RouteObject[] = [
  {
    path: HomeRoutesEnum.HOME,
    element: <Home />,
  },
];
