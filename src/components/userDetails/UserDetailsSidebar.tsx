import { useNavigate } from "react-router-dom";
import { User } from "src/shared/types/user";
import { FC } from "react";
import { Button, InfoItem } from "src/components";
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
        <InfoItem label="Username" value={user.username} />
        <InfoItem label="Email" value={user.email} />
        <InfoItem label="Phone" value={user.phone} />
        <InfoItem label="Website" value={user.website} />

        <div className="nested-block">
          <strong>Address: </strong>
          <InfoItem label="Street" value={user.address.street} />
          <InfoItem label="Suite" value={user.address.suite} />
          <InfoItem label="City" value={user.address.city} />
          <InfoItem label="Zipcode" value={user.address.zipcode} />
          {user.address.geo && (
            <div className="geo-coordinates">
              <strong>Geo: </strong>
              <InfoItem label="Lat" value={user.address.geo.lat} />
              <InfoItem label="Lng" value={user.address.geo.lng} />
            </div>
          )}
        </div>

        <div className="nested-block">
          <strong>Company: </strong>
          <InfoItem label="Name" value={user.company.name} />
          <InfoItem label="Catchphrase" value={user.company.catchPhrase} />
          <InfoItem label="BS" value={user.company.bs} />
        </div>
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
