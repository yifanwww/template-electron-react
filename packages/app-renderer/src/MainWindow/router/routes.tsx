import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';

import { RoutePath } from './path';

export const routes: RouteObject[] = [
    {
        path: RoutePath.HOME,
        children: [
            {
                index: true,
                lazy: async () => {
                    const module = await import('../containers/Home');
                    return { element: <module.Home /> };
                },
            },
        ],
    },
    {
        path: '/*',
        element: <Navigate to={RoutePath.HOME} replace />,
    },
];
