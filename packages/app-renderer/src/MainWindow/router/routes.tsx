import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export const routes: RouteObject[] = [
    {
        path: '/',
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
        element: <Navigate to="/" replace />,
    },
];
