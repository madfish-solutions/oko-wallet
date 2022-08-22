import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Image as NativeImage, View } from 'react-native';

import { styles } from './image.styles';

interface Props {
  uri: string | undefined;
  isLoadingError?: boolean;
  onError?: () => void;
}

export const Image: FC<Props> = ({ uri, onError, isLoadingError = false }) => (
  <>
    {isDefined(uri) && isNotEmptyString(uri) && !isLoadingError ? (
      <NativeImage source={{ uri }} onError={onError} style={styles.image} />
    ) : (
      <View style={styles.fallback} />
    )}
  </>
);
