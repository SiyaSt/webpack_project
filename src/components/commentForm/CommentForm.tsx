import { FC, FormEvent, memo, useEffect } from "react";
import { Comment } from "src/shared/types/comment/comment";
import { Input } from "src/components";
import { CreateComment } from "src/shared/types/comment/createComment";
import "./CommentForm.scss";
import { useFormValidation } from "src/hooks/useFormValidation";
import { commentValidationRules } from "src/shared/validationRules";

interface CommentFormProps {
  comment?: Comment;
  onSubmit: (data: CreateComment) => void;
  onValidityChange?: (isValid: boolean) => void;
}

export const CommentForm: FC<CommentFormProps> = memo(
  ({ comment, onSubmit, onValidityChange }) => {
    const validationParams = {
      name: comment?.name || "",
      email: comment?.email || "",
      body: comment?.body || "",
    };
    const { values, errors, touched, isValid, handleChange, handleBlur } =
      useFormValidation(validationParams, commentValidationRules);

    useEffect(() => {
      onValidityChange?.(isValid);
    }, [isValid, onValidityChange]);

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!isValid) return;
      onSubmit({ ...values, postId: comment?.postId || 0 });
    };

    return (
      <form className="comment-form" onSubmit={handleSubmit} id="comment-form">
        <div className="form-group">
          <div className="input-wrapper">
            <label>Name</label>
            <Input
              color="secondary"
              value={values.name}
              onChange={(e) => handleChange("name")(e.target.value)}
              onBlur={handleBlur("name")}
              errorText={touched.name && errors.name}
            />
          </div>

          <div className="input-wrapper">
            <label>Email</label>
            <Input
              color="secondary"
              value={values.email}
              onChange={(e) => handleChange("email")(e.target.value)}
              onBlur={handleBlur("email")}
              errorText={touched.email && errors.email}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <label>Comment</label>
            <textarea
              value={values.body}
              onChange={(e) => handleChange("body")(e.target.value)}
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
  },
);
