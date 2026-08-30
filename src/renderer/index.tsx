import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { assertIsDefined } from './utils/assert';

import './index.css';

function main(): void {
  const appElement = document.getElementById('app');
  assertIsDefined(appElement);

  const root = createRoot(appElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

main();
