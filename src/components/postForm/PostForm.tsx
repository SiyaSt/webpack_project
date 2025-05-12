import { FC, useEffect, FormEvent, memo } from "react";
import { CreatePost, Post } from "src/shared/types/post";
import { InputField } from "src/components";
import { POST_VALIDATION_RULES } from "src/shared/constants/validationRules";
import { useFormValidation } from "src/hooks";
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
      useFormValidation(validationParams, POST_VALIDATION_RULES);

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
          <InputField
            type="input"
            label="Title"
            value={values.title}
            onChange={(value) => handleChange("title")(value)}
            onBlur={handleBlur("title")}
            errorText={touched.title && errors.title}
          />
        </div>

        <div className="form-group">
          <InputField
            type="textarea"
            label="Content"
            value={values.body}
            onChange={(value) => handleChange("body")(value)}
            onBlur={handleBlur("body")}
            errorText={touched.body && errors.body}
            rows={5}
          />
        </div>
      </form>
    );
  },
);
