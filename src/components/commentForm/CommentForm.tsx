import { FC, FormEvent, useState, useEffect } from "react";
import { Comment } from "src/shared/types/comment/comment";
import { Input } from "src/components";
import { CreateComment } from "src/shared/types/comment/createComment";
import "./CommentForm.scss";

interface CommentFormProps {
  comment?: Comment;
  onSubmit: (data: CreateComment) => void;
  onValidityChange?: (isValid: boolean) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CommentForm: FC<CommentFormProps> = ({
  comment,
  onSubmit,
  onValidityChange,
}) => {
  const [name, setName] = useState(comment?.name || "");
  const [email, setEmail] = useState(comment?.email || "");
  const [body, setBody] = useState(comment?.body || "");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    body: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    body: false,
  });

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        error =
          value.length >= 5 ? "" : "Name must be at least five characters";
        break;
      case "email":
        error = emailRegex.test(value) ? "" : "Invalid email format";
        break;
      case "body":
        error = value.trim() ? "" : "Comment is required";
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      body: validateField("body", body),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  useEffect(() => {
    const isValid = validateForm();
    onValidityChange?.(isValid);
  }, [name, email, body]);

  const handleBlur = (field: string) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      setTouched({
        name: true,
        email: true,
        body: true,
      });
      return;
    }

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
        <div className="input-wrapper">
          <label>Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur("name")}
            color="secondary"
            errorText={touched.name && errors.name}
          />
        </div>

        <div className="input-wrapper">
          <label>Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleBlur("email")}
            color="secondary"
            errorText={touched.email && errors.email}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="input-wrapper">
          <label>Comment</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onBlur={handleBlur("body")}
            rows={4}
          />
          {touched.body && errors.body && (
            <div className="error-message">{errors.body}</div>
          )}
        </div>
      </div>
    </form>
  );
};
