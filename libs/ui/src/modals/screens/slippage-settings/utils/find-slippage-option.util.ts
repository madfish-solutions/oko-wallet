import { isDefined } from '@rnw-community/shared';

import { slippageOptions } from '../constatns';

export const findSlippageOption = (slippageTolerance: string) => {
  const slippageOption = slippageOptions.find(({ value }) => value === slippageTolerance);

  return isDefined(slippageOption) ? slippageOption : slippageOptions[slippageOptions.length - 1];
};
