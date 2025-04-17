import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "src/components";
import "./ErrorBoundary.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const HomeButton = () => {
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

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <p>{this.state.error?.toString()}</p>
          <HomeButton />
        </div>
      );
    }

    return this.props.children;
  }
}
