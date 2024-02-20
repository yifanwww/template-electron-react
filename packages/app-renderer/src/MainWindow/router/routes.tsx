import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

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
