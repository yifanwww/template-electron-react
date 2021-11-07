import { FluentuiProvider } from '@tecra/utils-fluentui';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';

import { FramelessWindow, TitleBar } from 'src/utils/frameless';

import { RoutePath } from './common/route';
import { getPageInfo, pageRoutePaths } from './containers/configs';
import { mainActions, mainStore, useMainDispatchingThunks, usePrepared } from './redux';

import scss from './index.module.scss';

function ClientArea(): React.ReactElement {
    const prepared = usePrepared();

    const { prepare } = useMainDispatchingThunks();

    useEffect(() => {
        prepare();
    }, [prepare]);

    const pageRoutes = pageRoutePaths.map((path) => {
        const pageInfo = getPageInfo(path)!;
        return <Route key={path} path={pageInfo.deepMatch ? `${path}/*` : path} element={<pageInfo.component />} />;
    });

    return (
        <div className={scss.clientArea}>
            {prepared && (
                <Routes>
                    {pageRoutes}
                    <Route key="/*" path="/*" element={<Navigate to={RoutePath.HomePage} replace />} />
                </Routes>
            )}
        </div>
    );
}

const changeClientAreaSize = (size: IClientAreaSize) => mainStore.dispatch(mainActions.updateClientAreaSize(size));

export function MainWindow(): React.ReactElement {
    return (
        <FramelessWindow>
            <TitleBar onClientAreaSizeChange={changeClientAreaSize}>
                <FluentuiProvider>
                    <HashRouter>
                        <ReduxProvider store={mainStore}>
                            <ClientArea />
                        </ReduxProvider>
                    </HashRouter>
                </FluentuiProvider>
            </TitleBar>
        </FramelessWindow>
    );
}
