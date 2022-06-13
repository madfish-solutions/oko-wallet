import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { StylePropsType } from '../../interfaces/style.interface';
import { ImageContainer, ImageContainerType } from '../image-container/image-container';

import { TouchableElementStyles } from './touchable-element.styles';

interface Props {
  text?: string;
  uri?: string;
  type?: ImageContainerType;
  onPress: () => void;
  style?: StylePropsType;
}

export const TouchableElement: FC<Props> = ({ text, type, uri, onPress, style }) => {
  const paddingRight = isDefined(text) || isDefined(uri) ? TouchableElementStyles.paddingRight : undefined;

  return (
    <TouchableOpacity onPress={onPress} style={[TouchableElementStyles.root, paddingRight, style]}>
      <ImageContainer source={{ uri }} type={type} />
      {isDefined(text) && <Text style={TouchableElementStyles.text}>{text}</Text>}
      {/* TODO: ADD icon component */}
    </TouchableOpacity>
  );
};
