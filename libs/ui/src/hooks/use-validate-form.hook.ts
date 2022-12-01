import { onlySpacesError, requiredFieldError } from '../constants/form-errors';

export const useValidateForm = () => {
  const checkIfOnlySpaces = (currentValue: string) => {
    if (!currentValue.trim()) {
      return onlySpacesError;
    }
  };

  const commonRules = {
    required: requiredFieldError,
    validate: { checkIfOnlySpaces }
  };

  return {
    commonRules
  };
};
