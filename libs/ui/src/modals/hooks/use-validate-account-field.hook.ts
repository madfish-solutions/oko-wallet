import { isNotEmptyString } from '@rnw-community/shared';

import { onlySpacesError, requiredFieldError } from '../../constants/form-errors';
import { useAllAccountsNameSelector } from '../../store/wallet/wallet.selectors';

export const useAccountFieldRules = (accountName = '') => {
  const allAccountsName = useAllAccountsNameSelector();

  const checkIfAccountNameUnique = (currentValue: string) => {
    const correctedCurrentValue = currentValue.trim().toLowerCase();

    if (accountName.toLowerCase() === correctedCurrentValue || !allAccountsName.includes(correctedCurrentValue)) {
      return true;
    }

    return 'Should be unique';
  };

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
      })
    ) {
      return 'Invalid path';
    }

    return true;
  };

  const checkIfOnlySpaces = (currentValue?: string) => {
    if (isNotEmptyString(currentValue) && !currentValue.trim()) {
      return onlySpacesError;
    }
  };

  const nameRules = {
    maxLength: {
      value: 21,
      message: 'Maximum 21 symbol'
    },
    required: false,
    validate: { checkIfAccountNameUnique }
  };

  const derivationPathRules = {
    required: false,
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
