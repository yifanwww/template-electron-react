import { lazy } from 'react';

import type { RouteConfig } from 'src/utils/react-router';
import { createRoutes } from 'src/utils/react-router';

import { RoutePath } from './RoutePath';

export const routes: RouteConfig[] = createRoutes([
    {
        path: RoutePath.HOME,
        component: lazy(() => import(/* webpackChunkName: 'mainwindow-home' */ 'src/MainWindow/containers/HomePage')),
        exact: true,
    },
]);
