import HomePageProps from "../interfaces/HomePageProps";
import "../css/HomePage.css"

const HomePage = ({ component }: HomePageProps) => {
  return (
    <div className="homepage fadeIn">
      {component}
    </div >
  );
};

export default HomePage;