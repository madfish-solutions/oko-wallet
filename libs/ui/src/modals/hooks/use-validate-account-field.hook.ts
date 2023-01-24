import { isNotEmptyString } from '@rnw-community/shared';

import { onlySpacesError, requiredFieldError } from '../../constants/form-errors';

export const useAccountFieldRules = () => {
  const validateDerivationPath = (currentValue: string) => {
    if (currentValue.length === 0) {
      return true;
    }
    if (!currentValue.startsWith('m')) {
      return "Must start with 'm'";
    }
    if (currentValue.length > 1 && currentValue[1] !== '/') {
      return "Separator must be '/'";
    }

    const parts = currentValue.replace('m', '').split('/').filter(Boolean);

    if (
      !parts.every(itemPart => {
        const pNum = +(itemPart.includes("'") ? itemPart.replace("'", '') : itemPart);

        return Number.isSafeInteger(pNum) && pNum >= 0;
      }) ||
      currentValue.slice(-1) === '/'
    ) {
      return 'Invalid path';
    }

    return true;
  };

  const checkIfOnlySpaces = (currentValue?: string) => {
    if (isNotEmptyString(currentValue) && !currentValue.trim()) {
      return onlySpacesError;
    }

    return true;
  };

  const checkNameLength = (currentValue = '') => currentValue.trim().length <= 14 || 'Maximum 14 symbols';

  const nameRules = {
    validate: { checkNameLength }
  };

  const derivationPathRules = {
    required: requiredFieldError,
    validate: { validateDerivationPath }
  };

  const privateKeyRules = {
    required: requiredFieldError,
    validate: { checkIfOnlySpaces }
  };

  return {
    nameRules,
    derivationPathRules,
    privateKeyRules
  };
};
