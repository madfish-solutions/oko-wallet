import { parseUnits } from 'ethers/lib/utils';

import { speedOptions } from '../constants';
import { SpeedEnum } from '../enums';

export const getProgressStatus = (initialTransactionFee: number, currentTransactionFee: string) => {
  if (!currentTransactionFee || !initialTransactionFee) {
    return SpeedEnum.Own;
  }
  const currentTransactionFeeBigNum = parseUnits(currentTransactionFee.toString());

  const currentSpeedOptions = speedOptions
    .slice(0, -1)
    .map(({ title, value }) => ({ title, value: parseUnits((+value * initialTransactionFee).toFixed(18)) }));

  return currentSpeedOptions.reduce((previousValue, currentValue) =>
    currentValue.value
      .sub(currentTransactionFeeBigNum)
      .abs()
      .lt(previousValue.value.sub(currentTransactionFeeBigNum).abs())
      ? currentValue
      : previousValue
  ).title;
};
