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
    Button
} from "@mui/material";
import getChapterOptions from "../utils/getChapterOptons";
import "../css/Upload.css";

const Upload = () => {
    const { register, handleSubmit, getValues } = useForm();
    const [selectedFile, setSelectedFile] = useState<File>();
    const [series, setSeries] = useState<string>("");
    const [chapter, setChapter] = useState<string>("");
    const [desciption, setDescription] = useState<string>("");
    const [seriesOptions, setSeriesOptions] = useState<Array<Object>>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("http://localhost:8080/api/series");
                setSeriesOptions(result.data);
            } catch (error) {
                // console.log(error);
            }
        };
        fetchData();
    }, [])

    const handleChange = (event: any) => {
        const { name, value, files } = event.target;
        if (name === "series") { setSeries(value); }
        if (name === "chapter") { setChapter(value); }
        if (name === "file") { setSelectedFile(files[0]); }
        if (name === "description") { setDescription(value); }
    };

    const onSubmit = (data: object) => {
        console.log(data);
        const { series, chapter } = getValues();
        const fileData = new FormData();
        if (selectedFile) {
            fileData.append("file", selectedFile);
            fileData.append("series", series);
            fileData.append("chapter", chapter);
            axios.post("http://localhost:8080/api/upload", fileData);
            // axios.post("http://18.220.242.141:8081/api/upload", fileData);
        }
        setSelectedFile(undefined);
        setSeries("");
        setChapter("");
        setDescription("");
    };

    return (
        <div className="upload" data-testid="upload">
            <form onSubmit={handleSubmit(onSubmit)} data-testid="uploadForm">
                <FormControl variant="filled">
                    {/* Series selection and label */}
                    <InputLabel id="series">Series</InputLabel>
                    <Select {...register("series")} data-testid="seriesInput" labelId="series" value={series} label="Series" onChange={handleChange}>
                        {seriesOptions && seriesOptions.map(({ id, name }: any) => (
                            <MenuItem key={id} value={name}>{name}</MenuItem>
                        ))}
                    </Select>

                    {/* Chapter selection and label */}
                    <FormControl variant="filled">
                        <InputLabel id="chapter">Chapter</InputLabel>
                        <Select {...register("chapter")} data-testid="chapterInput" labelId="chapter" value={chapter} label="Chapter" onChange={handleChange}>
                            <MenuItem value="" selected>None</MenuItem>
                            {getChapterOptions(10).map(({ id, text, value }: any) => (
                                <MenuItem key={id} value={value}>{text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Description text field */}
                    <TextField {...register("description")} data-testid="descriptionInput" label="Description" multiline minRows={5} maxRows={10} value={desciption} onChange={handleChange} />

                    {/* File selection */}
                    <FormControl>
                        <Input className="inputFile" type="file" name="file" id="input" onChange={handleChange} />
                    </FormControl>

                    <Button data-testid="submitBtn" variant="contained" type="submit">Submit</Button>
                </FormControl>
            </form>
        </div>
    );
};

export default Upload;
