import { useRef } from 'react';

const AboutMe = ({ name }: any) => {
    const showAboutMe= useRef(false);

    const toggle = () => {
        showAboutMe.current = !showAboutMe.current;
        name('AboutMe');
        if (showAboutMe.current === false) {
            name('default');
        }
    };
    
    return (
        <div className='homeSelections'>
            <h1 onClick={toggle}>About Me</h1>
        </div>
    );
};

export default AboutMe;
