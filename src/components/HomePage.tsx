import HomePageProps from "../interfaces/HomePageProps";
import "../css/HomePage.css"

const HomePage = ({ component }: HomePageProps) => {
  return (
    <div className="homepage fadeIn" data-testid="homepage">
      {component}
    </div >
  );
};

export default HomePage;