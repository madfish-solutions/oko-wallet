import React, { FC } from 'react';
import { Pressable, PressableProps, PressableStateCallbackType } from 'react-native';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { Row } from '../../../row/row';

import { styles } from './action-container.styles';

interface Props extends Pick<PressableProps, 'onPress'> {
  style?: ViewStyleProps;
}

const onPressStyle = ({ pressed }: PressableStateCallbackType) => ({ opacity: pressed ? 0.5 : 1.0 });

export const ActionContainer: FC<Props> = ({ children, onPress, style }) => (
  <Pressable onPress={onPress} style={onPressStyle}>
    <Row style={[styles.root, style]}>{children}</Row>
  </Pressable>
);
