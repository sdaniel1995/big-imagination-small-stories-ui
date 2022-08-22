import { useState } from "react";
import Login from "./Login";
import AppBar from "./AppBar"
import Welcome from "./Welcome";
import HomePage from "./HomePage";
import Collections from "./Collections";
import "../css/App.css";

const App = () => {
    const [showWelcome, setShowWelcome] = useState<boolean>(true);
    const [showLogin, setShowLogin] = useState<boolean>(true);
    // const [isReader, setIsReader] = useState<boolean>(false);
    const [component, setComponent] = useState<JSX.Element>(<Collections />);
    
    return (
        <div className="app" data-testid="app">
            {showLogin && <Login show={setShowLogin} />}
            {showWelcome && !showLogin && <Welcome show={setShowWelcome}/>}
            {!showWelcome && !showLogin && <AppBar setComponent={setComponent} />}
            {!showWelcome &&  !showLogin && <HomePage component={component}/>}
        </div>
    );
};

export default App;
