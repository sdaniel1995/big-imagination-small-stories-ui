import { useEffect } from "react";
import "../css/Welcome.css";

interface WelcomeProps {
    show: Function
};

const Welcome = ({ show }: WelcomeProps) => {
    useEffect(() => {
        const interval = setInterval(() => {
            show(false);
        }, 5500);
        return () => clearInterval(interval);
    }, [show])

    return (
        <div className="welcome weclomeTypewWriter" data-testid="welcome">
            <h1>This is Where the Story Begins...</h1>
        </div>
    );
};

export default Welcome;
