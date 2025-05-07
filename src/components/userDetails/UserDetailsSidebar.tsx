import { useNavigate } from "react-router-dom";
import { User } from "src/shared/types/user";
import { FC } from "react";
import { Button } from "src/components";
import "./UserDetailsSidebar.scss";

interface UserDetailsSidebarProps {
  user: User;
  onClose: () => void;
}

export const UserDetailsSidebar: FC<UserDetailsSidebarProps> = ({
  user,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleViewPosts = () => {
    navigate(`/posts?userId=${user.id}`);
  };

  return (
    <div className="user-details-sidebar">
      <div className="user-details-sidebar-header">
        <h2 className="user-name">{user.name}</h2>
        <Button
          className="close-button"
          onClick={onClose}
          variant="text"
          color="secondary"
        >
          ×
        </Button>
      </div>
      <div className="user-info">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Website:</strong> {user.website}
        </p>
        <p>
          <strong>Address:</strong>
        </p>
        <ul>
          {Object.entries(user.address).map(([key, value], index) => (
            <li key={index}>
              <strong>{key}:</strong>{" "}
              {typeof value === "object" ? JSON.stringify(value) : value}
            </li>
          ))}
        </ul>
        <p>
          <strong>Company:</strong>
        </p>
        <ul>
          {Object.entries(user.company).map(([key, value], index) => (
            <li key={index}>
              <strong>{key}:</strong>{" "}
              {typeof value === "object" ? JSON.stringify(value) : value}
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="view-posts-button"
        onClick={handleViewPosts}
        color="secondary"
      >
        View Posts
      </Button>
    </div>
  );
};
