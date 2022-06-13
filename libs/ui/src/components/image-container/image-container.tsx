import React, { FC } from 'react';
import { Image, ImagePropsBase, ImageURISource, View } from 'react-native';

import { StylePropsType } from '../../interfaces/style.interface';

import { ImageContainerStyles } from './image-container.styles';

const themeClasses = {
  primary: ImageContainerStyles.primary,
  secondary: ImageContainerStyles.secondary
};

export type ImageContainerType = keyof typeof themeClasses;

interface Props extends ImagePropsBase, ImageURISource {
  type?: ImageContainerType;
  style?: StylePropsType;
}

export const ImageContainer: FC<Props> = ({ uri, type = 'primary', style }) => (
  <View style={[ImageContainerStyles.root, themeClasses[type], style]}>
    {/* TODO: Use later `Svg` component */}
    <Image source={{ uri }} style={ImageContainerStyles.image} />
  </View>
);
