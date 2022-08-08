import React, { lazy } from 'react';

import { RoutePath } from './RoutePath';

export interface RouteInfo {
    component: React.ComponentType;
    exact?: boolean;
    path: RoutePath;
}

export const routes: RouteInfo[] = [
    {
        path: RoutePath.Home,
        component: lazy(() => import(/* webpackChunkName: 'mainwindow-home' */ 'src/MainWindow/containers/HomePage')),
        exact: true,
    },
];
