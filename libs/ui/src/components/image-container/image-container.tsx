import React, { FC } from 'react';
import { Image, ImagePropsBase, ImageURISource, StyleProp, TextStyle, View } from 'react-native';

import { ImageContainerStyles } from './image-container.styles';

const themeClasses = {
  primary: ImageContainerStyles.primary,
  secondary: ImageContainerStyles.secondary
};

export type ImageContainerType = keyof typeof themeClasses;

interface Props extends ImagePropsBase, ImageURISource {
  type?: ImageContainerType;
  style?: StyleProp<TextStyle>;
}

export const ImageContainer: FC<Props> = ({ uri, type = 'primary', style }) => (
  <View style={[ImageContainerStyles.root, themeClasses[type], style]}>
    <Image source={{ uri }} style={ImageContainerStyles.image} />
  </View>
);
