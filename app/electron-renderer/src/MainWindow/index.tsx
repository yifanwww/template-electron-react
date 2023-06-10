import { Suspense, useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';

import { FramelessWindow, TitleBar } from 'src/utils/frameless';

import { mainActions, mainStore, useMainDispatchingThunks, usePrepared } from './redux';
import { RoutePath, routes } from './routes';

import css from './index.module.scss';

const ClientArea: React.FC = () => {
    const prepared = usePrepared();

    const { prepare } = useMainDispatchingThunks();

    useEffect(() => {
        void prepare();
    }, [prepare]);

    return (
        <div className={css.clientArea}>
            {prepared && (
                <Suspense fallback={<div>Loading...</div>}>
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
            )}
        </div>
    );
};

export const GlobalProviders: React.FC = (props) => {
    return (
        <ReduxProvider store={mainStore}>
            <HashRouter>{props.children}</HashRouter>
        </ReduxProvider>
    );
};

const changeClientAreaSize = (size: ClientAreaSize) => mainStore.dispatch(mainActions.updateClientAreaSize(size));

export const MainWindow: React.FC = () => {
    return (
        <FramelessWindow>
            <TitleBar onClientAreaSizeChange={changeClientAreaSize}>
                <GlobalProviders>
                    <ClientArea />
                </GlobalProviders>
            </TitleBar>
        </FramelessWindow>
    );
};
