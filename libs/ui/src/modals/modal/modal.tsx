import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { HeaderTitle } from '../../components/navigator/components/header-title/header-title';
import { isWeb } from '../../utils/platform.utils';

import { styles } from './modal.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const Modal: FC<Props> = ({ children, style }) => (
  <View style={[styles.root, style]}>
    {isWeb && <HeaderTitle />}
    <View style={styles.children}>{children}</View>
  </View>
);
