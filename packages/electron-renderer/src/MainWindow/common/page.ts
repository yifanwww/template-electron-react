export type PageURL = '/home';

export interface IPageInfo {
    component: React.ComponentType;
    url: PageURL;
}

export type IPages = {
    [URL in PageURL]: IPageInfo;
};
