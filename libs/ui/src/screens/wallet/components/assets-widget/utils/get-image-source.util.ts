import { isString } from '@rnw-community/shared';

export const getImageSource = (thumbnailUri: string | undefined) =>
  isString(thumbnailUri) && thumbnailUri.length ? { uri: thumbnailUri } : require('../assets/symbol.png');
