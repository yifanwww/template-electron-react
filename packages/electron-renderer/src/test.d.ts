import React from 'react';

declare global {
    function expectElementSnapshot(element: React.ReactElement): void;
}
