import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { StylePropsType } from '../../../interfaces/style.interface';
import { getCustomSize } from '../../../styles/format-size';
import { IconContainerType, IconWithBorder } from '../../icon-with-border/icon-with-border';
import { Icon } from '../../icon/icon';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { Row } from '../../row/row';

import { styles } from './header-touchable-element.styles';

interface Props {
  text?: string;
  type?: IconContainerType;
  onPress: () => void;
  isShowDropdownArrow?: boolean;
  style?: StylePropsType;
}

export const HeaderTouchableElement: FC<Props> = ({
  text,
  type,
  isShowDropdownArrow = false,
  onPress,
  style,
  children
}) => {
  const paddingRight = isDefined(text) && !isShowDropdownArrow ? styles.paddingRight : undefined;
  const arrowMarginLeft = isDefined(text) ? undefined : styles.arrow;

  return (
    <TouchableOpacity onPress={onPress} style={[paddingRight, style]}>
      <Row style={styles.root}>
        <IconWithBorder type={type}>{children}</IconWithBorder>
        {isDefined(text) && <Text style={styles.text}>{text}</Text>}
        {isShowDropdownArrow && (
          <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} iconStyle={arrowMarginLeft} />
        )}
      </Row>
    </TouchableOpacity>
  );
};
