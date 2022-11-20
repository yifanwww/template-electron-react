import { mockLocalStorage } from '@tecra-pkg/utils-test';

import { LocalStorage } from './localStorage';

mockLocalStorage();

describe(`Test \`${LocalStorage.name}\``, () => {
    it('has no method', () => {
        expect(Reflect.ownKeys(LocalStorage).length).toBe(3);
        expect(Reflect.ownKeys(new LocalStorage())).toStrictEqual([]);
    });
});
