import { requiredFieldError } from '../../../constants/form-errors';

export const useValidateAmountField = (available: string) => {
  const isGreaterThanZero = (value: string) => Number(value) > 0 || 'Should be greater than 0';
  const isCorrectAmount = (value: string) =>
    Number(value) <= Number(available) || 'Should be less or equal than available amount';

  return {
    required: requiredFieldError,
    validate: { isGreaterThanZero, isCorrectAmount }
  };
};
