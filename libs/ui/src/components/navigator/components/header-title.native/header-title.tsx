import type { HeaderTitleProps } from '@react-navigation/elements';
import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { styles } from './header-title.styles';

export const HeaderTitle: FC<HeaderTitleProps> = ({ children }) => (
  <View>
    <Text style={styles.title}>{children}</Text>
  </View>
);
