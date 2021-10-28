import { IPages, IPageInfo, PageURL } from 'src/MainWindow/common';

import { HomePage } from './HomePage';

export const pages: IPages = {
    '/home': {
        component: HomePage,
        url: '/home',
    },
};

export const pageURLs = Object.keys(pages) as PageURL[];

export const homePageURL: PageURL = '/home';

export const getPageInfo = (url: PageURL): IPageInfo => pages[url];
