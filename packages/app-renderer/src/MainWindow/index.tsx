import { Provider as ReduxProvider } from 'react-redux';
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';

import { FramelessWindow, TitleBar } from 'src/utils/frameless';

import { mainStore } from './redux';

const router = createHashRouter([
    {
        path: '/',
        lazy: async () => {
            const module = await import('./containers/ClientArea');
            return { element: <module.ClientArea /> };
        },
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
