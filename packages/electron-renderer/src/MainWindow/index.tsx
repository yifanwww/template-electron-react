import { FluentuiProvider } from '@tecra/utils-fluentui';
import { Suspense, useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';

import { FramelessWindow, TitleBar } from 'src/utils/frameless';

import { mainActions, mainStore, useMainDispatchingThunks, usePrepared } from './redux';
import { RoutePath, routes } from './router';

import scss from './index.module.scss';

const ClientArea: React.FC = () => {
    const prepared = usePrepared();

    const { prepare } = useMainDispatchingThunks();

    useEffect(() => {
        prepare();
    }, [prepare]);

    return (
        <div className={scss.clientArea}>
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
                        <Route key="/*" path="/*" element={<Navigate to={RoutePath.Home} replace />} />
                    </Routes>
                </Suspense>
            )}
        </div>
    );
};

const changeClientAreaSize = (size: ClientAreaSize) => mainStore.dispatch(mainActions.updateClientAreaSize(size));

export const MainWindow: React.FC = () => {
    return (
        <FramelessWindow>
            <TitleBar onClientAreaSizeChange={changeClientAreaSize}>
                <FluentuiProvider>
                    <ReduxProvider store={mainStore}>
                        <HashRouter>
                            <ClientArea />
                        </HashRouter>
                    </ReduxProvider>
                </FluentuiProvider>
            </TitleBar>
        </FramelessWindow>
    );
};
