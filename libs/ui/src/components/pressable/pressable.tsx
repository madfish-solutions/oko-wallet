import React, { FC } from 'react';
import { Pressable as PressableBase, PressableProps, PressableStateCallbackType } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';

interface Props extends Pick<PressableProps, 'onPress'> {
  opacity?: boolean;
  style?: ViewStyleProps;
  testID?: string;
}

export const Pressable: FC<Props> = ({ onPress, opacity = true, style, children, testID }) => (
  <PressableBase
    testID={testID}
    onPress={onPress}
    style={({ pressed }: PressableStateCallbackType) => [opacity && { opacity: pressed ? 0.5 : 1.0 }, style]}
  >
    {children}
  </PressableBase>
);
