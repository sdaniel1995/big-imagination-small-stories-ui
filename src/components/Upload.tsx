import axios from 'axios'
import { useState, useRef } from 'react';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';

import '../css/Upload.css';

const Upload = ({ name }: any) => {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [showUpload, setShowUpload] = useState<boolean>(false);
    const [className, setClassName] = useState<string>('homeSelections');
    const show = useRef(false);
    const [placeHolder, setPlaceHolder] = useState<String>('Choose a file');
    const [fullFileName, setFullFileName] = useState<boolean>(false);

    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
        setPlaceHolder(event.target.files[0].name);
    };

    const toggle = () => {
        show.current = !show.current;
        name('Upload');
        setClassName('selected');
        setShowUpload(!showUpload);
        if (show.current === false) {
            name('default');
            setClassName('');
        }
    };

    const handleSubmission = () => {
        const fileData = new FormData();
        if (selectedFile) {
            fileData.append('file', selectedFile);
            axios.post('http://localhost:8080/api/upload', fileData);
            // axios.post('http://18.220.242.141:8081/api/upload', fileData);
        }
        setSelectedFile(undefined);
        setPlaceHolder('Choose a file');
        name('default');
        setClassName('');
        setShowUpload(!showUpload);
    };

    return (
        <div className='homeSelections'>
            <h1 onClick={toggle} className={className}>Upload</h1>
            {showUpload &&
                <div>
                    <input type="file" name="file" id="file" onChange={changeHandler} className='inputFile' />
                    <span id='input'>
                        <label htmlFor='file' id='inputLabel'>{fullFileName ? placeHolder : placeHolder.substring(0, 20) + '...'}</label>
                        {selectedFile &&
                            <>
                                {fullFileName === false
                                    ?
                                    <ArrowForwardIos id='moreArrow' onClick={() => setFullFileName(!fullFileName)} />
                                    :
                                    <ArrowBackIos id='moreArrow' onClick={() => setFullFileName(!fullFileName)} />
                                }
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
