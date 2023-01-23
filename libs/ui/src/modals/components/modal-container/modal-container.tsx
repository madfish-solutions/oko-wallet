import { OnEventFn } from '@rnw-community/shared';
import React, { FC, PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { TestIDProps } from 'src/interfaces/test-id.props';

import { HeaderTitle } from '../../../components/navigator/components/header-title/header-title';
import { isWeb } from '../../../utils/platform.utils';

import { styles } from './modal-container.styles';

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  screenTitle: string;
  isBackButton?: boolean;
  onHeaderCloseButtonPress?: OnEventFn<void>;
}> &
  TestIDProps;

export const ModalContainer: FC<Props> = ({
  children,
  style,
  screenTitle,
  isBackButton,
  onHeaderCloseButtonPress,
  testID
}) => (
  <View style={[styles.root, style]}>
    {isWeb && (
      <HeaderTitle
        isBackButton={isBackButton}
        name={screenTitle}
        onCloseButtonPress={onHeaderCloseButtonPress}
        testID={testID}
      />
    )}
    <View style={styles.children}>{children}</View>
  </View>
);
