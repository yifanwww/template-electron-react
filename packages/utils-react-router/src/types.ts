export interface RouteOptions {
    component: React.ComponentType;
    /** Default is `true`. */
    exact?: boolean;
    path: string;
}

export interface RouteConfig {
    readonly component: React.ComponentType;
    readonly exact: boolean;
    readonly path: string;
}
