import { FC, useState, useEffect, FormEvent } from "react";
import { Post } from "src/shared/types/post/post";
import { Input } from "src/components";
import "./PostForm.scss";
import { CreatePost } from "src/shared/types/post/createPost";

interface PostFormProps {
  post?: Post;
  onSubmit: (data: CreatePost) => Promise<void>;
}

export const PostForm: FC<PostFormProps> = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");
  const [userId, setUserId] = useState(post?.userId || 1);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setUserId(post.userId);
    }
  }, [post]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    await onSubmit({ title, body, userId });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit} id="post-form">
      <div className="form-group">
        <label>Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          color="secondary"
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
        />
      </div>
    </form>
  );
};
