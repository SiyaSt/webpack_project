import { ValidationRules } from "src/shared/types/types";
import { EMAIL_REGEX } from "./regex";

export const POST_VALIDATION_RULES: ValidationRules = {
  title: { required: true },
  body: { required: true },
};

export const COMMENT_VALIDATION_RULES: ValidationRules = {
  name: { required: true, minLength: 5 },
  email: { required: true, pattern: EMAIL_REGEX },
  body: { required: true },
};
