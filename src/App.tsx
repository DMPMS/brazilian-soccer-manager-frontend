import type { Router as RemixRouter } from '@remix-run/router';
import { useEffect } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { competitionglobalRoutes } from './modules/admin/competitionglobal/routes';
import { homeRoutes } from './modules/admin/home/routes';
import { managerglobalRoutes } from './modules/admin/managerglobal/routes';
import { playerglobalRoutes } from './modules/admin/playerglobal/routes';
import { teamglobalRoutes } from './modules/admin/teamglobal/routes';
import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loginRoutes } from './modules/shared/login/routes';
import { newAccountRoutes } from './modules/shared/newAccount/routes';
import { saveRoutes } from './modules/user/save/routes';
import { URL_USER_LOGGED_IN } from './shared/constants/urls';
import { MethodsEnum } from './shared/enums/methods.enum';
import { getAuthorizationToken, verifyLoggedIn } from './shared/functions/connection/auth';
import { useNewRequests } from './shared/hooks/useNewRequests';
import { useNotification } from './shared/hooks/useNotification';
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer';

const routes: RouteObject[] = [...loginRoutes, ...newAccountRoutes];
const routesLoggedIn: RouteObject[] = [
  ...homeRoutes,
  ...managerglobalRoutes,
  ...competitionglobalRoutes,
  ...teamglobalRoutes,
  ...playerglobalRoutes,
  ...saveRoutes,
  ...firstScreenRoutes,
].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalReducer();
  const { newRequest } = useNewRequests();

  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      newRequest(MethodsEnum.GET, URL_USER_LOGGED_IN).then((data) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
