import React, { FC } from 'react';
import { PressableProps } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { Icon } from '../../../icon/icon';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Pressable } from '../../../pressable/pressable';
import { Row } from '../../../row/row';
import { Text } from '../../../text/text';

import { styles } from './dropdown-selected-item.styles';

interface Props extends Pick<PressableProps, 'onPress'> {
  title: string;
  testID?: string;
}

export const DropdownSelectedItem: FC<Props> = ({ title, onPress, testID }) => (
  <Pressable onPress={onPress} style={styles.root} testID={testID}>
    <Row>
      <Text style={styles.title}>{title}</Text>
      <Icon name={IconNameEnum.DropdownSelector} size={getCustomSize(2)} />
    </Row>
  </Pressable>
);
