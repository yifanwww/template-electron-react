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

import type { AppRendererAPI } from '@ter/app-common/apis/app';
import type { LoggerRendererAPI } from '@ter/app-common/apis/logger';

import { APP_API, LOGGER_API } from './exposes';

export const AppAPI = {
    createWindow: APP_API.createWindow,
    getAppDetails: APP_API.getAppDetails,
    windowType: APP_API.windowType,
} satisfies Record<keyof AppRendererAPI, unknown>;

export const LoggerAPI = {
    debug: LOGGER_API.debug,
    error: LOGGER_API.error,
    info: LOGGER_API.info,
    log: LOGGER_API.log,
    verbose: LOGGER_API.verbose,
    warn: LOGGER_API.warn,
} satisfies Record<keyof LoggerRendererAPI, unknown>;
