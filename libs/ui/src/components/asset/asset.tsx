import React, { FC } from 'react';
import { StyleProp, ViewStyle, View, Text } from 'react-native';

import { colors } from '../../styles/colors';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';

import { styles } from './asset.styles';

type Props = {
  leftIconName: IconNameEnum;
  text: string;
  style?: StyleProp<ViewStyle>;
};

export const AssetContainer: FC<Props> = ({ children, style, leftIconName, text }) => (
  <View style={[styles.root, style]}>
    <View style={styles.header}>
      <Icon name={leftIconName} color={colors.border} />
      <Text style={styles.text}>{text}</Text>
    </View>
    {children}
  </View>
);
