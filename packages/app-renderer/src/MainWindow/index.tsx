import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import { FramelessWindow, TitleBar } from 'src/utils/frameless';

import { mainStore } from './redux';
import { routes } from './router/routes';

const router = createHashRouter(routes);

export function MainWindow(): React.ReactNode {
    return (
        <FramelessWindow>
            <TitleBar>
                <ReduxProvider store={mainStore}>
                    <RouterProvider router={router} />
                </ReduxProvider>
            </TitleBar>
        </FramelessWindow>
    );
}
