import { onlySpacesError, requiredFieldError } from '../../../../../constants/form-errors';

export const useValidateForm = (password: string) => {
  const checkName = (currentValue: string) => {
    const trimValue = currentValue.trim();
    if (trimValue.length < 4 || trimValue.length > 18) {
      return '4-18 characters';
    }
  };

  const checkIfOnlySpaces = (currentValue: string) => {
    if (!currentValue.trim()) {
      return onlySpacesError;
    }
  };

  const matchPassword = (currentValue: string) => {
    if (currentValue.trim() !== password.trim()) {
      return 'Must be equal to password above';
    }
  };

  const commonRules = {
    required: requiredFieldError,
    validate: { checkIfOnlySpaces }
  };

  const nameRules = {
    required: commonRules.required,
    validate: { ...commonRules.validate, checkName }
  };

  const confirmPasswordRules = {
    required: commonRules.required,
    validate: { ...commonRules.validate, matchPassword }
  };

  return {
    commonRules,
    nameRules,
    confirmPasswordRules
  };
};
