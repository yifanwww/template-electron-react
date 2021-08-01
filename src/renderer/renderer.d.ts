/// <reference types="react-scripts" />

import React from 'react';

declare function expectElementSnapshot(element: React.ReactElement): void;

declare global {
    namespace NodeJS {
        interface Global {
            expectElementSnapshot: typeof expectElementSnapshot;
        }
    }
}
