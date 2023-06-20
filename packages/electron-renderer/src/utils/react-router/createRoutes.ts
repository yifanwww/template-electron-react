import type { RouteConfig, RouteOptions } from './types';

export function createRoutes(routes: RouteOptions[]): RouteConfig[] {
    return routes.map((route) => ({
        component: route.component,
        exact: route.exact ?? true,
        path: route.path,
    }));
}
