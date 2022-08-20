import axios from "axios"
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
    Select,
    MenuItem,
    InputLabel,
    Input,
    FormControl,
    TextField,
} from "@mui/material";
import "../../css/Upload.css";

const Upload = ({ component }: any) => {
    const { register, handleSubmit, getValues } = useForm();
    const [selectedFile, setSelectedFile] = useState<File>();
    const [showUpload, setShowUpload] = useState<boolean>(false);
    const [show, setShow] = useState(false);
    const [series, setSeries] = useState<string>('');
    const [chapter, setChapter] = useState<string>('');
    const [seriesOptions, setSeriesOptions] = useState<Array<Object>>();

    useEffect(() => {
        axios.get("http://localhost:8080/api/series").then(resp => {
            setSeriesOptions(resp.data)
        });
    }, [])

    const handleChange = (event: any) => {
        const { name, value, files } = event.target;
        if (name === "series") { setSeries(value); }

        if (name === "chapter") { setChapter(value); }

        if (name === "file") { setSelectedFile(files[0]); }
    };

    const toggle = () => {
        setShow(!show);
        component("Upload");
        setShowUpload(!showUpload);
        if (show) {
            component("default");
        }
    };

    const onSubmit = () => {
        const { series, chapter } = getValues();
        const fileData = new FormData();
        if (selectedFile) {
            fileData.append("file", selectedFile);
            fileData.append("series", series);
            fileData.append("chapter", chapter);
            axios.post("http://localhost:8080/api/upload", fileData);
            // axios.post("http://18.220.242.141:8081/api/upload", fileData);
        }
        setShow(!show);
        setSelectedFile(undefined);
        component("default");
        setShowUpload(!showUpload);
    };

    return (
        <div className="homeSelections">
            <h1 onClick={toggle}>Upload</h1>
            {showUpload &&
                <form className="upload" onSubmit={handleSubmit(onSubmit)}>
                    <FormControl variant="filled">
                        <InputLabel id="series">Series</InputLabel>
                        <Select {...register("series")} labelId="series" value={series} label="Series" onChange={handleChange}>
                            {seriesOptions && seriesOptions.map(({ id, name }: any) => (
                                <MenuItem key={id} value={name}>{name}</MenuItem>
                            ))}
                        </Select>

                        <FormControl variant="filled">
                            <InputLabel id="chapter">Chapter</InputLabel>
                            <Select {...register("chapter")} labelId="chapter" value={chapter} label="Chapter" onChange={handleChange}>
                                <MenuItem value="Chapter 1">Chapter 1</MenuItem>
                                <MenuItem value="Chapter 2">Chapter 2</MenuItem>
                                <MenuItem value="Chapter 3">Chapter 3</MenuItem>
                                <MenuItem value="Chapter 4">Chapter 4</MenuItem>
                                <MenuItem value="Chapter 5">Chapter 5</MenuItem>
                                <MenuItem value="Chapter 6">Chapter 6</MenuItem>
                                <MenuItem value="Chapter 7">Chapter 7</MenuItem>
                                <MenuItem value="Chapter 8">Chapter 8</MenuItem>
                                <MenuItem value="Chapter 9">Chapter 9</MenuItem>
                                <MenuItem value="Chapter 10">Chapter 10</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField {...register("description")} label="Description" multiline minRows={5} maxRows={10} />

                        <FormControl>
                            <Input className="inputFile" type="file" name="file" id="input" onChange={handleChange} />
                        </FormControl>

                        <button type="submit">Submit</button>
                    </FormControl>
                </form>
            }
        </div>
    );
};

export default Upload;
