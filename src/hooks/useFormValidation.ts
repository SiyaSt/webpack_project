import { useState, useEffect } from "react";
import { ValidationRules } from "src/shared/types/types";
import { validateForm } from "src/shared/utils/Validation";

export const useFormValidation = <T extends Record<string, string>>(
  initialValues: T,
  validationRules: ValidationRules,
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { errors: newErrors, isValid } = validateForm(
      values,
      validationRules,
    );
    setErrors(newErrors);
    setIsValid(isValid);
  }, [validationRules, values]);

  const handleChange = (field: keyof T) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof T) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    setValues,
  };
};
