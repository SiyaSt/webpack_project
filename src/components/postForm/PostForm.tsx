import { FC, useState, useEffect, FormEvent } from "react";
import { Post } from "src/shared/types/post/post";
import { Input } from "src/components";
import "./PostForm.scss";
import { CreatePost } from "src/shared/types/post/createPost";

interface PostFormProps {
  post?: Post;
  onSubmit: (data: CreatePost) => Promise<void>;
  onValidityChange?: (isValid: boolean) => void;
}

export const PostForm: FC<PostFormProps> = ({
  post,
  onSubmit,
  onValidityChange,
}) => {
  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");
  const [userId] = useState(post?.userId || 1);
  const [errors, setErrors] = useState({
    title: "",
    body: "",
  });
  const [touched, setTouched] = useState({
    title: false,
    body: false,
  });

  const validateForm = () => {
    const newErrors = {
      title: title.trim() ? "" : "Title is required",
      body: body.trim() ? "" : "Content is required",
    };

    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((error) => !error);
    onValidityChange?.(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [title, body]);

  const handleBlur = (field: string) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      setTouched({
        title: true,
        body: true,
      });
      return;
    }

    await onSubmit({ title, body, userId });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit} id="post-form">
      <div className="form-group">
        <div className="input-wrapper">
          <label>Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur("title")}
            color="secondary"
            errorText={touched.title && errors.title}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="input-wrapper">
          <label>Content</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onBlur={handleBlur("body")}
            rows={5}
          />
          {touched.body && errors.body && (
            <div className="error-message">{errors.body}</div>
          )}
        </div>
      </div>
    </form>
  );
};
