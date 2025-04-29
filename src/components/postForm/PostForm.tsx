import { FC, useEffect, FormEvent, memo } from "react";
import { Post } from "src/shared/types/post/post";
import { Input } from "src/components";
import { CreatePost } from "src/shared/types/post/createPost";
import { postValidationRules } from "src/shared/validationRules";
import { useFormValidation } from "src/hooks/useFormValidation";
import "./PostForm.scss";

interface PostFormProps {
  post?: Post;
  onSubmit: (data: CreatePost) => Promise<void>;
  onValidityChange?: (isValid: boolean) => void;
}

export const PostForm: FC<PostFormProps> = memo(
  ({ post, onSubmit, onValidityChange }) => {
    const validationParams = {
      title: post?.title || "",
      body: post?.body || "",
    };
    const { values, errors, touched, isValid, handleChange, handleBlur } =
      useFormValidation(validationParams, postValidationRules);

    useEffect(() => {
      onValidityChange?.(isValid);
    }, [isValid, onValidityChange]);

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!isValid) return;
      await onSubmit({ ...values, userId: post?.userId || 1 });
    };

    return (
      <form className="post-form" onSubmit={handleSubmit} id="post-form">
        <div className="form-group">
          <div className="input-wrapper">
            <label>Title</label>
            <Input
              color="secondary"
              value={values.title}
              onChange={(e) => handleChange("title")(e.target.value)}
              onBlur={handleBlur("title")}
              errorText={touched.title && errors.title}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <label>Content</label>
            <textarea
              value={values.body}
              onChange={(e) => handleChange("body")(e.target.value)}
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
  },
);
