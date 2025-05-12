import { ValidationRules } from "src/shared/types/types";

export const validateForm = (
  values: { [key: string]: string },
  rules: ValidationRules,
) => {
  const errors: { [key: string]: string } = {};

  for (const [fieldName, value] of Object.entries(values)) {
    const fieldRules = rules[fieldName];
    if (!fieldRules) continue;

    if (fieldRules.required && !value.trim()) {
      errors[fieldName] = "This field is required";
      continue;
    }

    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[fieldName] = `Minimum ${fieldRules.minLength} characters required`;
    }

    if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
      errors[fieldName] = "Invalid format";
    }

    if (fieldRules.custom) {
      const customError = fieldRules.custom(value);
      if (customError) errors[fieldName] = customError;
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
