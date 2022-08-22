import axios from "axios";
import { useEffect } from "react";
import "../css/Collections.css";

const Collections = () => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const files = await axios("http://localhost:8080/api/files");
                // const files = await axios("http://18.220.242.141:8081/api/files");
            } catch (error) {
                
            }
        };
        fetchData();
    }, []);

    return (
        <div className="collections" data-testid="collections">
            <h1>Collections</h1>
        </div>
    );
};

export default Collections;
