import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { HeaderTitle } from '../../../components/navigator/components/header-title/header-title';
import { isWeb } from '../../../utils/platform.utils';

import { styles } from './modal-container.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  screenTitle: string;
  isBackButton?: boolean;
}

export const ModalContainer: FC<Props> = ({ children, style, screenTitle, isBackButton }) => (
  <View style={[styles.root, style]}>
    {isWeb && <HeaderTitle isBackButton={isBackButton} name={screenTitle} />}
    <View style={styles.children}>{children}</View>
  </View>
);
