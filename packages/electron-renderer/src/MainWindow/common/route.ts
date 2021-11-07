export enum RoutePath {
    HomePage = '/home',
}

export interface IRouteInfo {
    component: React.ComponentType;
    deepMatch?: boolean;
    path: RoutePath;
}

export type IPartialRouteInfos = {
    [Path in RoutePath]?: Omit<IRouteInfo, 'path'>;
};

export type IRouteInfos = {
    [Path in RoutePath]?: IRouteInfo;
};

export function genRouteInfos(routes: IPartialRouteInfos): IRouteInfos {
    for (const path of Object.keys(routes) as RoutePath[]) {
        (routes as IRouteInfos)[path]!.path = path;
    }
    return routes as IRouteInfos;
}
