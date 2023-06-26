import { Suspense } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';

import { FramelessWindow, TitleBar } from 'src/utils/frameless';
import type { ClientAreaSize, ReactChildrenProps } from 'src/utils/react';

import { mainActions, mainStore } from './redux';
import { RoutePath, routes } from './routes';

import css from './index.module.scss';

function ClientArea(): JSX.Element {
    return (
        <div className={css.clientArea}>
            <Suspense fallback={<div />}>
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.exact ? route.path : `${route.path}/*`}
                            element={<route.component />}
                        />
                    ))}
                    <Route key="/*" path="/*" element={<Navigate to={RoutePath.HOME} replace />} />
                </Routes>
            </Suspense>
        </div>
    );
}

function GlobalProviders(props: ReactChildrenProps) {
    return (
        <ReduxProvider store={mainStore}>
            <HashRouter>{props.children}</HashRouter>
        </ReduxProvider>
    );
}

function changeClientAreaSize(size: ClientAreaSize) {
    mainStore.dispatch(mainActions.updateClientAreaSize(size));
}

export function MainWindow(): JSX.Element {
    return (
        <FramelessWindow>
            <TitleBar onClientAreaSizeChange={changeClientAreaSize}>
                <GlobalProviders>
                    <ClientArea />
                </GlobalProviders>
            </TitleBar>
        </FramelessWindow>
    );
}
