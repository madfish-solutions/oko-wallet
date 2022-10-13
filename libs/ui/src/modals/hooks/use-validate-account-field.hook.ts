import { onlySpacesError, requiredFieldError } from '../../constants/form-errors';

export const useAccountFieldRules = () => {
  const checkIfOnlySpaces = (currentValue: string) => {
    if (!currentValue.trim()) {
      return onlySpacesError;
    }
  };

  return {
    maxLength: {
      value: 21,
      message: 'Maximum 21 symbol'
    },
    required: requiredFieldError,
    validate: { checkIfOnlySpaces }
  };
};
