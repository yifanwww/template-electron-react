export interface RouteOptions {
    component: React.ComponentType;
    /**
     * Specify whether to match deeply to match multiple descendant routes.
     *
     * Default is `true`.
     */
    exact?: boolean;
    path: string;
}

export interface RouteConfig {
    readonly component: React.ComponentType;
    readonly exact: boolean;
    readonly path: string;
}
