import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

import '../css/Collections.css';

const Collections = ({ name }: any) => {
    const [files, setFiles] = useState<Array<any>>();
    const [showCollections, setShowCollections]= useState<boolean>(false);
    const show = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            // const files = await axios('http://localhost:8080/api/files');
            const files = await axios('http://18.220.242.141:8081/api/files');
            setFiles(files.data);
        };
        if (showCollections) {
            fetchData();
        }
    }, [showCollections]);

    const toggle = () => {
        let element = document.querySelector('.app');
        show.current = !show.current;
        name('Collections');
        element?.setAttribute('class', 'collections');
        setShowCollections(!showCollections);
        if (show.current === false) {
            element = document.querySelector('.collections');
            name('default');
            element?.setAttribute('class', 'app');
        }
    };

    return (
        <div className='homeSelections'>
            <h1 onClick={toggle}>Collections</h1>
            {showCollections && files !== undefined
                ?
                <div className="audioList">
                    {files.map((file) => (
                        <ReactAudioPlayer
                            className='audio'
                            key={file.name}
                            src={file.url}
                            controls
                        />))}
                </div>
                : null
            }
        </div>
    );
};

export default Collections;
