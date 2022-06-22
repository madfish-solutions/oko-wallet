import React, { FC } from 'react';
import { StyleProp, ViewStyle, View, Text } from 'react-native';

import { colors } from '../../styles/colors';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';

import { styles } from './widget-container.styles';

interface Props {
  iconName: IconNameEnum;
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const WidgetContainer: FC<Props> = ({ children, style, iconName, title }) => (
  <View style={[styles.root, style]}>
    <Row style={styles.header}>
      <Icon name={iconName} color={colors.border} />
      <Text style={styles.text}>{title}</Text>
    </Row>
    <View style={styles.children}>{children}</View>
  </View>
);
