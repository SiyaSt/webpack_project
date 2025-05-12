import { useNavigate } from "react-router-dom";
import { Button } from "src/components";

export const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      color="secondary"
      onClick={() => navigate("/")}
      className="error-boundary-link"
    >
      Return to Home
    </Button>
  );
};
