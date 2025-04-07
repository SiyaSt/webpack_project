import { FC, FormEvent, useState } from "react";
import { Comment } from "src/shared/types/comment/comment";
import { Input } from "src/components";
import { CreateComment } from "src/shared/types/comment/createComment";
import "./CommentForm.scss";

interface CommentFormProps {
  comment?: Comment;
  onSubmit: (data: CreateComment) => void;
}

export const CommentForm: FC<CommentFormProps> = ({ comment, onSubmit }) => {
  const [name, setName] = useState(comment?.name || "");
  const [email, setEmail] = useState(comment?.email || "");
  const [body, setBody] = useState(comment?.body || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      body,
      postId: comment?.postId || 0,
    });
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit} id="comment-form">
      <div className="form-group">
        <label>Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          color="secondary"
        />
        <label>Email</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          color="secondary"
        />
      </div>
      <div className="form-group">
        <label>Comment</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          required
        />
      </div>
    </form>
  );
};
