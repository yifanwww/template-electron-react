import { WindowType } from '@shared/app/contracts';
import { WINDOW_TYPE } from './apis/app';
import { MainWindow } from './MainWindow';

export function App(): React.ReactNode {
  // put cross-window configurations here

  return renderWindow();
}

function renderWindow() {
  switch (WINDOW_TYPE) {
    case WindowType.MAIN:
      return <MainWindow />;
    default: {
      const never: never = WINDOW_TYPE;
      return never;
    }
  }
}
