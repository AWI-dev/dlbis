import { useState } from 'react';

interface FieldErrors {
  [key: string]: string | null;
}
const useFieldValidator = () => {
  const [errors, setErrors] = useState<FieldErrors>({});

  const validateField = (fieldName: string, value: string) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: `This field is required.`,
      }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, [fieldName]: null }));
      return true;
    }
  };

  return { validateField, errors };
};

export default useFieldValidator;
