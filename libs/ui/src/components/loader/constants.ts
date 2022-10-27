import { getCustomSize } from '../../styles/format-size';

import { LoaderSizeEnum } from './enums';

export const sizes = {
  [LoaderSizeEnum.Large]: getCustomSize(4),
  [LoaderSizeEnum.Medium]: getCustomSize(3),
  [LoaderSizeEnum.Small]: getCustomSize(2)
};
