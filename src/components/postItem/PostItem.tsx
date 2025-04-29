import { Link } from "react-router-dom";
import { Post } from "src/shared/types/post";
import { Button } from "src/components";
import { FC, memo } from "react";

interface PostItemProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export const PostItem: FC<PostItemProps> = memo(
  ({ post, onEdit, onDelete }) => {
    return (
      <div className="post-item">
        <h3>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h3>
        <p className="post-body">{post.body}</p>
        <div className="post-actions">
          <Button
            onClick={() => onEdit(post)}
            className="edit-button"
            color="secondary"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(post.id)}
            className="delete-button"
            color="danger"
          >
            Delete
          </Button>
        </div>
      </div>
    );
  },
);
