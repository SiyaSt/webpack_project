import { ValidationRules } from "src/shared/types/types";
import { emailRegex } from "src/shared/types/regex";

export const postValidationRules: ValidationRules = {
  title: { required: true, minLength: 5 },
  body: { required: true },
};

export const commentValidationRules: ValidationRules = {
  name: { required: true, minLength: 5 },
  email: { required: true, pattern: emailRegex },
  body: { required: true },
};
