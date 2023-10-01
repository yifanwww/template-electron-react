import { Provider as ReduxProvider } from 'react-redux';
import { Navigate, Outlet, RouterProvider, createHashRouter } from 'react-router-dom';

import { FramelessWindow, TitleBar } from 'src/utils/frameless';

import { mainStore } from './redux';

import css from './index.module.scss';

function ClientArea(): React.ReactNode {
    return (
        <div className={css.clientArea}>
            <Outlet />
        </div>
    );
}

const router = createHashRouter([
    {
        path: '/',
        element: <ClientArea />,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { HomePage } = await import('./pages/HomePage');
                    return { element: <HomePage /> };
                },
            },
        ],
    },
    {
        path: '/*',
        element: <Navigate to="/" replace />,
    },
]);

function GlobalProviders(): React.ReactNode {
    return (
        <ReduxProvider store={mainStore}>
            <RouterProvider router={router} />
        </ReduxProvider>
    );
}

export function MainWindow(): React.ReactNode {
    return (
        <FramelessWindow>
            <TitleBar>
                <GlobalProviders />
            </TitleBar>
        </FramelessWindow>
    );
}
