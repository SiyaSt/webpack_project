import { Button } from "src/components";
import { Link } from "react-router-dom";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="home-page-title">Welcome to Home page</h1>

      <div className="home-page-content">
        <p className="home-page-description">
          Explore our community of users and discover interesting content. Get
          started by browsing through user profiles or check out latest posts.
        </p>
        <div className="home-page-actions">
          <Button color="secondary">
            <Link to="/users">View Users</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
