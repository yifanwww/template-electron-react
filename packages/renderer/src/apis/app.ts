import { AppAPI } from './exposes';

export const WINDOW_TYPE = AppAPI.windowType;

export async function getAppDetails() {
    const resp = await AppAPI.getAppDetails();
    return resp.status === 'success' ? resp.data : undefined;
}
