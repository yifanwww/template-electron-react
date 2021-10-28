import { Introduction } from 'src/MainWindow/components/Introduction';
import { useAppDetails } from 'src/MainWindow/redux';

export function HomePage(): React.ReactElement {
    const appDetails = useAppDetails();

    return <Introduction appDetails={appDetails} />;
}
