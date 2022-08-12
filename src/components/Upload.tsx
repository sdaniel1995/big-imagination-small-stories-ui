import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import '../css/Upload.css';

const Upload = ({ name }: any) => {
    const { register, handleSubmit, getValues } = useForm();
    const [selectedFile, setSelectedFile] = useState<File>();
    const [showUpload, setShowUpload] = useState<boolean>(false);
    const [show, setShow] = useState(false);
    const [fileName, setFileName] = useState<string>('');

    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    };

    const toggle = () => {
        setShow(!show);
        name('Upload');
        setShowUpload(!showUpload);
        if (show) {
            name('default');
        }
    };

    const onSubmit = () => {
        const newName = getValues('title');
        const fileData = new FormData();
        if (selectedFile) {
            const file = newName ? new File([selectedFile], newName, { type: "audio/x-m4a"}) : selectedFile
            fileData.append('file', file);
            axios.post('http://localhost:8080/api/upload', fileData);
            // axios.post('http://18.220.242.141:8081/api/upload', fileData);
        }
        setSelectedFile(undefined);
        name('default');
        setShowUpload(!showUpload);
        setFileName('');
    };

    return (
        <div className='homeSelections'>
            <h1 onClick={toggle}>Upload</h1>
            {showUpload &&
            <form className='upload' onSubmit={handleSubmit(onSubmit)}>
                   <label htmlFor="name">Name</label>
                   <input type='text' {...register('title')} id='title' defaultValue={fileName} onChange={(e) => e.target.value} />
                   <input type='file' name='file' className='inputFile' id="input" onChange={changeHandler}/>
                   <button type='submit'>Submit</button>
            </form>
            }
        </div>
    );
};

export default Upload;
