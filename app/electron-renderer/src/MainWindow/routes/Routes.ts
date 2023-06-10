import { lazy } from 'react';

import { RoutePath } from './RoutePath';

interface RouteConfig {
    component: React.ComponentType;
    /** Default is `false`. */
    exact?: boolean;
    path: string;
}

export interface RouteInfo {
    readonly component: React.ComponentType;
    readonly exact: boolean;
    readonly path: string;
}

function createRoutes(routes: RouteConfig[]): RouteInfo[] {
    return routes.map((route) => ({
        component: route.component,
        exact: route.exact ?? false,
        path: route.path,
    }));
}

export const routes: RouteInfo[] = createRoutes([
    {
        path: RoutePath.HOME,
        component: lazy(() => import(/* webpackChunkName: 'mainwindow-home' */ 'src/MainWindow/containers/HomePage')),
        exact: true,
    },
]);
