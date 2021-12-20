import * as UtilsForConsole from './console';
import * as UtilsForHook from './hook';
import * as UtilsForStorage from './storage';
import * as Utils from './utils';

const Test = {
    ...UtilsForConsole,
    ...UtilsForHook,
    ...UtilsForStorage,
    ...Utils,
};

// eslint-disable-next-line import/no-default-export
export default Test;

export * from './console';
export * from './hook';
export * from './storage';
export * from './utils';
