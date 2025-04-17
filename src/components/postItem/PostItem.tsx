import { Link } from "react-router-dom";
import { Post } from "src/shared/types/post/post";
import { Button } from "src/components";
import { FC } from "react";
import { classNames } from "src/shared/utils/ClassName";

interface PostItemProps {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

export const PostItem: FC<PostItemProps> = ({ post, onEdit, onDelete }) => {
  return (
    <div className={classNames("post-item")}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-body">{post.body}</p>
      <div className="post-actions">
        <Button onClick={onEdit} className="edit-button" color="secondary">
          Edit
        </Button>
        <Button onClick={onDelete} className="delete-button" color="danger">
          Delete
        </Button>
      </div>
    </div>
  );
};
