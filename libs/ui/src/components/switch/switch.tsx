import { OnEventFn } from '@rnw-community/shared';
import React, { FC, useRef } from 'react';
import { Animated, Easing, Pressable } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { getCustomSize } from '../../styles/format-size';
import { hapticFeedback } from '../../utils/taptic-engine/taptic-engine.util';

import { SwitchThemesEnum } from './enum';
import { styles } from './switch.styles';

const themesStyles = {
  [SwitchThemesEnum.Primary]: styles.primary,
  [SwitchThemesEnum.Secondary]: styles.secondary
};

const activeStyles: Partial<{ [key in SwitchThemesEnum]: any }> = {
  [SwitchThemesEnum.Primary]: styles.activePrimary
};

interface Props {
  isActive: boolean;
  onPress?: OnEventFn<void>;
  theme?: SwitchThemesEnum;
  disabled?: boolean;
  style?: ViewStyleProps;
}

const TURN_ON = getCustomSize(2.5);
const TURN_OFF = 0;

export const Switch: FC<Props> = ({ isActive, onPress, theme = SwitchThemesEnum.Primary, disabled = false, style }) => {
  const initialPosition = isActive ? TURN_ON : TURN_OFF;

  const knobPosition = useRef(new Animated.Value(initialPosition)).current;

  const switchKnob = () => {
    if (isActive) {
      animation();
      onPress?.();
    } else {
      animation(TURN_ON);
      onPress?.();
    }
  };

  const animation = (toValue = TURN_OFF, duration = 200) =>
    Animated.timing(knobPosition, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.linear
    }).start();

  const onPressOut = () => hapticFeedback();

  return (
    <Pressable
      onPress={switchKnob}
      onPressOut={onPressOut}
      disabled={disabled}
      style={[styles.root, themesStyles[theme], isActive && activeStyles[theme], disabled && styles.disabled, style]}
    >
      <Animated.View
        style={[styles.knob, { transform: [{ translateX: knobPosition }] }, disabled && styles.disabledKnob]}
      />
    </Pressable>
  );
};
