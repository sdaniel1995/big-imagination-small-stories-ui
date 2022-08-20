import { useState } from 'react';

import Welcome from './Welcome';
import Collections from './Collections/Collections';
import Upload from './Upload/Upload';
import AboutMe from './AboutMe';
import '../css/HomePage.css';

const HomePage = () => {
    const [componentName, setComponentName] = useState<string>('');

    return (
        <div className='home' data-testid='homePage'>
            {componentName === ''
                ? <Welcome component={setComponentName} />
                : null
            }
            {componentName === 'default' || componentName === 'Collections'
                ? <Collections component={setComponentName} />
                : null
            }
            {componentName === 'default' || componentName === 'Upload'
                ? <Upload component={setComponentName} />
                : null
            }
            {componentName === 'default' || componentName === 'AboutMe'
                ? <AboutMe component={setComponentName} />
                : null
            }
        </div>
    );
};

export default HomePage;
