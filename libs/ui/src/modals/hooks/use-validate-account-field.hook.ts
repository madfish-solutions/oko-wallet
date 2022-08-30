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
    validate: { checkIfAccountNameUnique, checkIfOnlySpaces }
  };
};
