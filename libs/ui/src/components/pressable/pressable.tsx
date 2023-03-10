import React, { FC, PropsWithChildren } from 'react';
import { Pressable as PressableBase, PressableProps, PressableStateCallbackType } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { TestIDProps } from '../../interfaces/test-id.props';

type Props = PropsWithChildren<{
  opacity?: boolean;
  style?: ViewStyleProps;
}> &
  TestIDProps &
  Pick<PressableProps, 'onPress' | 'disabled'>;

export const Pressable: FC<Props> = ({ onPress, opacity = true, disabled, style, children, testID }) => (
  <PressableBase
    onPress={onPress}
    disabled={disabled}
    style={({ pressed }: PressableStateCallbackType) => [opacity && { opacity: pressed ? 0.5 : 1.0 }, style]}
    testID={testID}
  >
    {children}
  </PressableBase>
);
