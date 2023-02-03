import { requiredFieldError } from '../../../constants/form-errors';

export const useValidateAmountField = (
  available: string,
  greaterThanZeroError = 'Should be greater than 0',
  underAvailableBalanceError = 'Should be less or equal than available amount'
) => {
  const isGreaterThanZero = (value: string) => Number(value) > 0 || greaterThanZeroError;
  const isCorrectAmount = (value: string) => Number(value) <= Number(available) || underAvailableBalanceError;

  return {
    required: requiredFieldError,
    validate: { isGreaterThanZero, isCorrectAmount }
  };
};
