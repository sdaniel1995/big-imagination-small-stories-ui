import { useRef } from 'react';

import '../css/AboutMe.css';

const AboutMe = ({ name }: any) => {
    const showAboutMe= useRef(false);

    const toggle = () => {
        let element = document.querySelector('.app');
        showAboutMe.current = !showAboutMe.current;
        name('AboutMe');
        element?.setAttribute('class', 'aboutMe');
        if (showAboutMe.current === false) {
            element = document.querySelector('.aboutMe');
            name('default');
            element?.setAttribute('class', 'app');
        }
    };
    
    return (
        <div className='homeSelections'>
            <h1 onClick={toggle}>About Me</h1>
        </div>
    );
};

export default AboutMe;
