import { Introduction } from 'src/MainWindow/components/Introduction';
import { useAppDetails } from 'src/MainWindow/redux';

const HomePage: React.FC = () => {
    const appDetails = useAppDetails();

    return <Introduction appDetails={appDetails} />;
};

export default HomePage;
