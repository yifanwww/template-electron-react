import { genRouteInfos, RoutePath } from 'src/MainWindow/common/route';

import { HomePage } from './HomePage';

export const pages = genRouteInfos({
    [RoutePath.HomePage]: {
        component: HomePage,
        exact: true,
    },
});

export const pageRoutePaths = Object.keys(pages) as RoutePath[];

export const getPageInfo = (path: RoutePath) => pages[path];
