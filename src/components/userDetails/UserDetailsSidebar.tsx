import { useNavigate } from "react-router-dom";
import { User } from "src/shared/types/user";
import { FC } from "react";
import { useTheme } from "src/hooks/useTheme";
import { classNames } from "src/shared/utils/ClassName";
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
    <div className={classNames("user-details-sidebar")}>
      <Button
        className="close-button"
        onClick={onClose}
        variant="text"
        color="secondary"
      >
        ×
      </Button>
      <h2>{user.name}</h2>
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
          <li>{user.address.street}</li>
          <li>{user.address.suite}</li>
          <li>{user.address.city}</li>
          <li>{user.address.zipcode}</li>
        </ul>
        <p>
          <strong>Company:</strong>
        </p>
        <ul>
          <li>{user.company.name}</li>
          <li>{user.company.catchPhrase}</li>
          <li>{user.company.bs}</li>
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
