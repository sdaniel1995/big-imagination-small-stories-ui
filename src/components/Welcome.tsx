import { Button } from '@mui/material';

import '../css/Welcome.css';

const Welcome = ({ name }: any) => {
    return (
        <div className='welcome weclomeTypewWriter'>
           <h1>This is Where the Story Begins...</h1> 
           <Button id='button' variant="contained" onClick={() => name('default')}>Enter</Button>
        </div>
    );
};

export default Welcome;
