import { FC, memo } from "react";
import { Comment } from "src/shared/types/comment/comment";
import { Button } from "src/components";

interface CommentItemProps {
  comment: Comment;
  onEdit: (comment: Comment) => void;
  onDelete: (id: number) => void;
}

const areEqual = (prev: CommentItemProps, next: CommentItemProps) => {
  const isCommentSame =
    prev.comment.id === next.comment.id &&
    prev.comment.name === next.comment.name &&
    prev.comment.body === next.comment.body;

  const areCallbacksSame =
    prev.onEdit === next.onEdit && prev.onDelete === next.onDelete;

  return isCommentSame && areCallbacksSame;
};

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
  areEqual,
);
