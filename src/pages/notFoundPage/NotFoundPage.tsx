import { Link } from "react-router-dom";
import { Button } from "src/components";
import "./NotFoundPage.scss";

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button color="secondary">
        <Link to="/" className="not-found-page-link">
          Go to Home Page
        </Link>
      </Button>
    </div>
  );
};
