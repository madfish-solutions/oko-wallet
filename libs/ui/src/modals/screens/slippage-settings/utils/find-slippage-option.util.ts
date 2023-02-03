import { slippageOptions } from '../constatns';

export const findSlippageOption = (slippageTolerance: string) => {
  const slippageOption = slippageOptions.find(({ value }) => value === slippageTolerance);

  return slippageOption ?? slippageOptions[slippageOptions.length - 1];
};
