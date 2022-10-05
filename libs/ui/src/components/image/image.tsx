import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Image as NativeImage, ImageStyle, View } from 'react-native';

import { styles } from './image.styles';

interface Props {
  uri: string | undefined;
  isLoadingError?: boolean;
  onError?: () => void;
  style?: ImageStyle;
}

export const Image: FC<Props> = ({ uri, onError, isLoadingError = false, style }) => (
  <>
    {isDefined(uri) && isNotEmptyString(uri) && !isLoadingError ? (
      <NativeImage source={{ uri }} onError={onError} style={[styles.image, style]} />
    ) : (
      <View style={[styles.fallback, style]} />
    )}
  </>
);
