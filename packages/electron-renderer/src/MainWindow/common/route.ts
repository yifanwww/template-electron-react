export enum RoutePath {
    HomePage = '/home',
}

export interface RouteInfo {
    component: React.ComponentType;
    deepMatch?: boolean;
    path: RoutePath;
}

export type RouteInfos = {
    [Path in RoutePath]?: RouteInfo;
};

export function genRouteInfos(routes: RouteInfo[]): RouteInfos {
    const infos: RouteInfos = {};
    for (const route of routes) {
        infos[route.path] = route;
    }
    return infos;
}
