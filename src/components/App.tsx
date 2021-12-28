import HomePage from './HomePage';
import '../css/App.css';

const App = () => {
    return (
        <div className='app' data-testid='app'>
            <HomePage />
        </div>
    );
};

export default App;
