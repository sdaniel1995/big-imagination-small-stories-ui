import "../css/HomePage.css"

interface HomePageProps {
  component: JSX.Element
};

const HomePage = ({ component }: HomePageProps) => {
  return (
    <div className="homepage fadeIn" data-testid="homepage">
      {component}
    </div >
  );
};

export default HomePage;