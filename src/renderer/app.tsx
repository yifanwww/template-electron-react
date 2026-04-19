import { WindowType } from '@shared/apis/app';
import { WINDOW_TYPE } from './apis/app';
import { MainWindow } from './MainWindow';
import { assertIsNever } from './utils/assert';

export function App(): React.ReactNode {
    // put cross-window configurations here

    return renderWindow();
}

function renderWindow() {
    switch (WINDOW_TYPE) {
        case WindowType.MAIN:
            return <MainWindow />;
        default:
            assertIsNever(WINDOW_TYPE);
    }
}
