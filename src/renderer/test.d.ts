import React from 'react';

declare global {
    function expectElementSnapshot(element: React.ReactElement): void;

    namespace NodeJS {
        interface Global {
            expectElementSnapshot: typeof expectElementSnapshot;
        }
    }
}
