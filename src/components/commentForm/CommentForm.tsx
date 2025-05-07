import { FC, FormEvent, memo, useEffect } from "react";
import { Comment, CreateComment } from "src/shared/types/comment";
import { InputField } from "src/components";
import { useFormValidation } from "src/hooks";
import { COMMENT_VALIDATION_RULES } from "src/shared/constants";
import "./CommentForm.scss";

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
      useFormValidation(validationParams, COMMENT_VALIDATION_RULES);

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
          <InputField
            type="input"
            label="Name"
            value={values.name}
            onChange={(value) => handleChange("name")(value)}
            onBlur={handleBlur("name")}
            errorText={touched.name && errors.name}
          />

          <InputField
            type="input"
            label="Email"
            value={values.email}
            onChange={(value) => handleChange("email")(value)}
            onBlur={handleBlur("email")}
            errorText={touched.email && errors.email}
          />
        </div>

        <div className="form-group">
          <InputField
            type="textarea"
            label="Comment"
            value={values.body}
            onChange={(value) => handleChange("body")(value)}
            onBlur={handleBlur("body")}
            errorText={touched.body && errors.body}
            rows={4}
          />
        </div>
      </form>
    );
  },
);
