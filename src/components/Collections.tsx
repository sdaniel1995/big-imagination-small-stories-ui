import ReactAudioPlayer from "react-audio-player";
import axios from "axios";
import { useState, useEffect } from "react";
import "../css/Collections.css";

const Collections = () => {
    const [files, setFiles] = useState<Array<any>>();

    useEffect(() => {
        const fetchData = async () => {
            const files = await axios("http://localhost:8080/api/files");
            // const files = await axios("http://18.220.242.141:8081/api/files");
            setFiles(files.data);
        };
        fetchData();
    }, []);

    return (
        <div className="collections">
            <h1>Collections</h1>
            {files &&
                <div className="audioList">
                    {files.map((file) => (
                        <ReactAudioPlayer
                            className="audio"
                            key={file.name}
                            src={file.url}
                            controls
                        />))}
                </div>
            }
        </div>
    );
};

export default Collections;
