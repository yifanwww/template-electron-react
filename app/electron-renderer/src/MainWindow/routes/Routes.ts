import { createRoutes } from '@tecra-pkg/utils-react-router';
import type { RouteConfig } from '@tecra-pkg/utils-react-router';
import { lazy } from 'react';

import { RoutePath } from './RoutePath';

export const routes: RouteConfig[] = createRoutes([
    {
        path: RoutePath.HOME,
        component: lazy(() => import(/* webpackChunkName: 'mainwindow-home' */ 'src/MainWindow/containers/HomePage')),
        exact: true,
    },
]);
