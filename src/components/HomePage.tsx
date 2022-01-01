import { useState } from 'react';

import Welcome from './Welcome';
import Collections from './Collections';
import Upload from './Upload';
import AboutMe from './AboutMe';
import '../css/HomePage.css';

const HomePage = () => {
    const [componentName, setComponentName] = useState<string>('');

    return (
        <div className='home' data-testid='homePage'>
            {componentName === ''
                ? <Welcome name={setComponentName} />
                : null
            }
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
