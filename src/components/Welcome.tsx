import { useEffect } from 'react';
import '../css/Welcome.css';

const Welcome = ({ component }: any) => {
    useEffect(() => {
        const interval = setInterval(() => {
            component('default');
        }, 5500);
        return () => clearInterval(interval);
    }, [component])

    return (
        <div className='welcome weclomeTypewWriter'>
            <h1>This is Where the Story Begins...</h1>
        </div>
    );
};

export default Welcome;
