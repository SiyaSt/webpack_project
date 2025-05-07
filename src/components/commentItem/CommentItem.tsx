import { FC, memo } from "react";
import { Comment } from "src/shared/types/comment";
import { Button } from "src/components";
import "./CommentItem.scss";

interface CommentItemProps {
  comment: Comment;
  onEdit: (comment: Comment) => void;
  onDelete: (id: number) => void;
}

export const CommentItem: FC<CommentItemProps> = memo(
  ({ comment, onEdit, onDelete }) => {
    return (
      <div className="comment-item">
        <div className="comment-content">
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
          <p className="comment-email">{comment.email}</p>
        </div>
        <div className="comment-actions">
          <Button
            size="small"
            onClick={() => onEdit(comment)}
            color="secondary"
          >
            Edit
          </Button>
          <Button
            size="small"
            onClick={() => onDelete(comment.id)}
            color="danger"
          >
            Delete
          </Button>
        </div>
      </div>
    );
  },
);
