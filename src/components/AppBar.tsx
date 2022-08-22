import { Button } from "@mui/material";
import Collections from "./Collections";
import Upload from "./Upload";
import AboutMe from "./AboutMe";
import "../css/AppBar.css"

interface AppBarProps {
  setComponent: Function
};


const AppBar = ({ setComponent }: AppBarProps) => {
  const handleOnClick = (event: any) => {
    const { name } = event.target;
    if (name === "Collections") { setComponent(<Collections />); }
    if (name === "Upload") { setComponent(<Upload />); }
    if (name === "AboutMe") { setComponent(<AboutMe />) }
  };

  return (
    <div className="appBar fadeIn" data-testid="appBar">
      <div className="leftContent">
        <h1>Big Imagination Small Stories.</h1>
      </div>
      <div className="rightContent">
        <Button variant="text" name="Collections" onClick={handleOnClick}>Collections</Button>
        <Button variant="text" name="Upload" onClick={handleOnClick}>Upload</Button>
        <Button variant="text" name="AboutMe" onClick={handleOnClick}>About Me</Button>
      </div>
    </div>
  )
}

export default AppBar