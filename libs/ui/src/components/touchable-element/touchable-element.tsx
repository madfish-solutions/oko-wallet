import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { StylePropsType } from '../../interfaces/style.interface';
import { getCustomSize } from '../../styles/format-size';
import { IconContainer, IconContainerType } from '../icon-container/icon-container';
import { Icon, IconProps } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';

import { styles } from './touchable-element.styles';

interface Props extends IconProps {
  text?: string;
  type?: IconContainerType;
  onPress: () => void;
  arrow?: boolean;
  style?: StylePropsType;
}

export const TouchableElement: FC<Props> = ({ text, type, arrow = false, onPress, style, ...iconProps }) => {
  const paddingRight = isDefined(text) && !arrow ? styles.paddingRight : undefined;
  const arrowMarginLeft = isDefined(text) ? undefined : styles.arrow;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.root, paddingRight, style]}>
      <IconContainer name={iconProps.name} type={type} />
      {isDefined(text) && <Text style={styles.text}>{text}</Text>}
      {arrow && <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} iconStyle={arrowMarginLeft} />}
    </TouchableOpacity>
  );
};
