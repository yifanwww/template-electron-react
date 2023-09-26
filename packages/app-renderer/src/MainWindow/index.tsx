import { Suspense } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { FramelessWindow, TitleBar } from 'src/utils/frameless';
import type { ReactChildrenProps } from 'src/utils/react';

import { mainStore } from './redux';
import { routes } from './routes/configs';
import { RoutePath } from './routes/path';

import css from './index.module.scss';

function ClientArea(): React.ReactNode {
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
        <HashRouter>
            <ReduxProvider store={mainStore}>{props.children}</ReduxProvider>
        </HashRouter>
    );
}

export function MainWindow(): React.ReactNode {
    return (
        <FramelessWindow>
            <TitleBar>
                <GlobalProviders>
                    <ClientArea />
                </GlobalProviders>
            </TitleBar>
        </FramelessWindow>
    );
}
