import * as UtilsForHook from './hook';
import * as UtilsForStorage from './storage';

export * from './hook';
export * from './storage';

const Test = {
    ...UtilsForHook,
    ...UtilsForStorage,
};

// eslint-disable-next-line import/no-default-export
export default Test;
