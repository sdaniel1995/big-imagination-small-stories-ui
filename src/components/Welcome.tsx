import { useEffect } from 'react';
import '../css/Welcome.css';

const Welcome = ({ name }: any) => {
    useEffect(() => {
        const interval = setInterval(() => {
            name('default');
        }, 5500);
        return () => clearInterval(interval);
    }, [name])

    return (
        <div className='welcome weclomeTypewWriter'>
            <h1>This is Where the Story Begins...</h1>
        </div>
    );
};

export default Welcome;
