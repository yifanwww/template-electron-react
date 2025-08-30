/*
 * https://www.electronjs.org/docs/latest/api/context-bridge#api-functions
 * Exposed functions have some limitations.
 * Here we can convert them to meet our requirements, such as converting data structures:
 * ```ts
 * const { _getUser } = window;
 *
 * export async function getUser() {
 *     return User.deserialize(await _getUser());
 * }
 * ```
 *
 * We can also create new functions that combine some of the exposed functions:
 * ```ts
 * const { apiA, apiB } = window;
 *
 * export async function apiX() {
 *     const resA = await apiA();
 *     const resB = await apiB();
 *     return resA || resB;
 * }
 * ```
 */

import { AppAPI } from './exposes';

export { Logger } from './exposes';

export const WINDOW_TYPE = AppAPI.windowType;
export const { getAppDetails } = AppAPI;
