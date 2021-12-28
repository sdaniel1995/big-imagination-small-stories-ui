import Collections from './Collections';
import Upload from './Upload';
import AboutMe from './AboutMe';
import '../css/HomePage.css';

const HomePage = () => {
    return (
        <div className='home' data-testid='homePage'>
            <Collections />
            <Upload />
            <AboutMe />
        </div>
    )
}

export default HomePage
