import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { TestIDProps } from 'src/interfaces/test-id.props';

import { HeaderTitle } from '../../../components/navigator/components/header-title/header-title';
import { isWeb } from '../../../utils/platform.utils';

import { styles } from './modal-container.styles';

interface Props extends TestIDProps {
  style?: StyleProp<ViewStyle>;
  screenTitle: string;
  isBackButton?: boolean;
}

export const ModalContainer: FC<Props> = ({ children, style, screenTitle, isBackButton, testID }) => (
  <View style={[styles.root, style]}>
    {isWeb && <HeaderTitle isBackButton={isBackButton} name={screenTitle} testID={testID} />}
    <View style={styles.children}>{children}</View>
  </View>
);
