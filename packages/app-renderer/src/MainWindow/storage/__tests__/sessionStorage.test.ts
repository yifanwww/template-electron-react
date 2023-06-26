import { mockSessionStorage } from 'src/__tests__/storage';

import { SessionStorage } from '../sessionStorage';

mockSessionStorage();

describe(`Test \`${SessionStorage.name}\``, () => {
    it('has no method', () => {
        expect(Reflect.ownKeys(SessionStorage).length).toBe(3);
        expect(Reflect.ownKeys(new SessionStorage())).toStrictEqual([]);
    });
});
