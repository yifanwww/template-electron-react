import type { IpcRendererInvokerAPI, IpcStandardResp } from '../api-types.js';
import type { AppDetails, WindowType } from './contracts.js';

export const AppIpcKey = {
  GET_APP_DETAILS: 'app:get-app-details',
};

// -----------------------------------------------------------------------------

type GetAppDetails = IpcRendererInvokerAPI<() => IpcStandardResp<AppDetails>>;

// -----------------------------------------------------------------------------

export interface AppMainAPI {
  handleGetAppDetails: GetAppDetails['main'];
}

export interface AppRendererAPI {
  /** The type of current window. */
  windowType: WindowType;
  /** Get app details, including app name and app version. */
  getAppDetails: GetAppDetails['renderer'];
}
