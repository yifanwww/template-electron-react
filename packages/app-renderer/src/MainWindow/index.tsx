import { RouterProvider, createHashRouter } from 'react-router';

import { FramelessWindow, TitleBar } from 'src/utils/frameless';

import { routes } from './router/routes';

const router = createHashRouter(routes);

export function MainWindow() {
    return (
        <FramelessWindow>
            <TitleBar>
                <RouterProvider router={router} />
            </TitleBar>
        </FramelessWindow>
    );
}
