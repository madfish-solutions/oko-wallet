import React, { FC, PropsWithChildren } from 'react';
import { Pressable as PressableBase, PressableProps, PressableStateCallbackType } from 'react-native';
import { TestIDProps } from 'src/interfaces/test-id.props';

import { ViewStyleProps } from '../../interfaces/style.interface';

type Props = PropsWithChildren<{
  opacity?: boolean;
  style?: ViewStyleProps;
}> &
  TestIDProps &
  Pick<PressableProps, 'onPress'>;

export const Pressable: FC<Props> = ({ onPress, opacity = true, style, children, testID }) => (
  <PressableBase
    onPress={onPress}
    style={({ pressed }: PressableStateCallbackType) => [opacity && { opacity: pressed ? 0.5 : 1.0 }, style]}
    testID={testID}
  >
    {children}
  </PressableBase>
);
