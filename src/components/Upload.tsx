import axios from 'axios'
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import '../css/Upload.css';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [showUpload, setShowUpload] = useState<boolean>(false);
    const [placeHolder, setPlaceHolder] = useState<String>('Choose a file');
    const [fullFileName, setFullFileName] = useState<boolean>(false);

    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
        setPlaceHolder(event.target.files[0].name);
    };

    const handleSubmission = () => {
        const fileData = new FormData();
        if (selectedFile) {
            fileData.append('file', selectedFile);
            axios.post('http://18.220.242.141:8081/api/upload', fileData);
        }
        setSelectedFile(undefined);
    };

    return (
        <div className='upload homeSelections'>
            <h1 onClick={() => setShowUpload(!showUpload)}>Upload</h1>
            {showUpload &&
                <div className='home'>
                    <input type="file" name="file" id="file" onChange={changeHandler} className='inputFile' />
                    <span id='input'>
                        <label htmlFor='file' id='inputLabel'>{fullFileName ? placeHolder : placeHolder.substring(0, 20) + '...'}</label>
                        {selectedFile &&
                            <>
                                <ArrowForwardIosIcon id='moreArrow' onClick={() => setFullFileName(!fullFileName)} />
                                <button type="submit" id='submitBtn' onClick={handleSubmission}>Submit</button>
                            </>
                        }
                    </span>
                </div>
            }
        </div>
    );
};

export default Upload;
