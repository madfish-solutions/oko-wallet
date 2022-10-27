import { speedOptions } from '../constants';

export const getProgressStatus = (initialTransactionFee: number, currentTransactionFee: number) => {
  if (!currentTransactionFee || !initialTransactionFee) {
    return 'unknown';
  }

  const currentSpeedOptions = speedOptions
    .slice(0, -1)
    .map(option => ({ ...option, value: +option.value * initialTransactionFee }));

  return currentSpeedOptions.reduce((previousValue, currentValue) =>
    Math.abs(currentValue.value - currentTransactionFee) < Math.abs(previousValue.value - currentTransactionFee)
      ? currentValue
      : previousValue
  ).title;
};
