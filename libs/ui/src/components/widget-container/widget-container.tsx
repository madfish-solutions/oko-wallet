import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { TestIDProps } from '../../interfaces/test-id.props';
import { colors } from '../../styles/colors';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './widget-container.styles';

type Props = PropsWithChildren<{
  iconName: IconNameEnum;
  title: string;
  style?: ViewStyleProps;
}> &
  TestIDProps;

export const WidgetContainer: FC<Props> = ({ children, style, iconName, title, testID }) => (
  <View style={[styles.root, style]} testID={testID}>
    <Row style={styles.header}>
      <Icon name={iconName} color={colors.border1} />
      <Text style={styles.text}>{title}</Text>
    </Row>
    <View style={styles.children}>{children}</View>
  </View>
);
