import { Introduction } from 'src/MainWindow/components/Introduction';
import { useAppDetails } from 'src/MainWindow/redux';

export const HomePage: React.VFC = () => {
    const appDetails = useAppDetails();

    return <Introduction appDetails={appDetails} />;
};
