import Collections from './Collections';
import Upload from './Upload';
import Contact from './Contact';
import '../css/HomePage.css';

const HomePage = () => {
    return (
        <div className='home'>
            <Collections />
            <Upload />
            <Contact />
        </div>
    )
}

export default HomePage
