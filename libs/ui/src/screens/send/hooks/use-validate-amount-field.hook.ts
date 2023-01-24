import { requiredFieldError } from '../../../constants/form-errors';

export const useValidateAmountField = (available: string, isSwapScreen = false) => {
  const isGreaterThanZero = (value: string) => {
    if (Number(value) > 0) {
      return true;
    }

    return isSwapScreen ? 'Nothing-to-nothing exchanges are forbidden.' : 'Should be greater than 0';
  };
  const isCorrectAmount = (value: string) => {
    if (Number(value) <= Number(available)) {
      return true;
    }

    return isSwapScreen ? 'Hold on, bro, top-up your account first.' : 'Should be less or equal than available amount';
  };

  return {
    required: requiredFieldError,
    validate: { isGreaterThanZero, isCorrectAmount }
  };
};
