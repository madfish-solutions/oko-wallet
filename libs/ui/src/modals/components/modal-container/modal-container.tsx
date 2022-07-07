import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { HeaderTitle } from '../../../components/navigator/components/header-title/header-title';
import { isWeb } from '../../../utils/platform.utils';

import { styles } from './modal-container.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  screenTitle: string;
}

export const ModalContainer: FC<Props> = ({ children, style, screenTitle }) => (
  <View style={[styles.root, style]}>
    {isWeb && <HeaderTitle name={screenTitle} />}
    <View style={styles.children}>{children}</View>
  </View>
);
