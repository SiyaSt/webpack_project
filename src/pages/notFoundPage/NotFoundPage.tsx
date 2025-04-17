import { Button } from "src/components";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button color="secondary" onClick={handleGoHome}>
        Go to Home Page
      </Button>
    </div>
  );
};
