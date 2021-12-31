import { useState } from 'react';

import Collections from './Collections';
import Upload from './Upload';
import AboutMe from './AboutMe';
import '../css/HomePage.css';

const HomePage = () => {
    const [componentName, setComponentName] = useState<string>('default');
    const backgrounds: Array<string> = [
        'mock_ups/Screen Shot 2021-12-26 at 3.54.08 AM.png',
    ];

    return (
        <div className='home' data-testid='homePage'>
            {componentName === 'default' || componentName === 'Collections'
                ? <Collections name={setComponentName} />
                : null
            }
            {componentName === 'default' || componentName === 'Upload'
                ? <Upload name={setComponentName} />
                : null
            }
            {componentName === 'default' || componentName === 'AboutMe'
                ? <AboutMe name={setComponentName} />
                : null
            }
        </div>
    );
};

export default HomePage;
