import { isNotEmptyString } from '@rnw-community/shared';

export const useAddTokenFieldsRules = () => {
  const checkIfOnlySpaces = (currentValue?: string) => {
    if (isNotEmptyString(currentValue) && !currentValue.trim()) {
      return '1-21 characters, no special';
    }
  };

  const commonRules = {
    required: 'This field is required',
    validate: { checkIfOnlySpaces }
  };

  const addressUrlRules = {
    required: commonRules.required,
    validate: { ...commonRules.validate }
  };

  return {
    commonRules,
    addressUrlRules
  };
};
