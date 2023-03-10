import { OnEventFn } from '@rnw-community/shared';
import React, { FC, useRef, useEffect } from 'react';
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

const activeStyles = {
  [SwitchThemesEnum.Primary]: styles.activePrimary
};

interface Props {
  isActive: boolean;
  onPress?: OnEventFn<void>;
  theme?: SwitchThemesEnum;
  disabled?: boolean;
  style?: ViewStyleProps;
  triggerAnimation?: boolean;
}

const TURN_ON = getCustomSize(2.5);
const TURN_OFF = 0;

export const Switch: FC<Props> = ({
  isActive = true,
  onPress,
  theme = SwitchThemesEnum.Primary,
  disabled = false,
  triggerAnimation = false,
  style
}) => {
  const initialPosition = isActive ? TURN_ON : TURN_OFF;

  const knobPosition = useRef(new Animated.Value(initialPosition)).current;

  const switchKnob = () => {
    animation(isActive ? TURN_OFF : TURN_ON);
    onPress?.();

    hapticFeedback();
  };

  const animation = (toValue = TURN_OFF, duration = 200) =>
    Animated.timing(knobPosition, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.linear
    }).start();

  useEffect(() => {
    if (!triggerAnimation) {
      return;
    }

    animation(isActive ? TURN_ON : TURN_OFF);

    hapticFeedback();
  }, [isActive, triggerAnimation]);

  return (
    <Pressable
      onPress={switchKnob}
      disabled={disabled}
      style={[
        styles.root,
        themesStyles[theme],
        isActive && activeStyles[theme as SwitchThemesEnum.Primary],
        disabled && styles.disabled,
        style
      ]}
    >
      <Animated.View
        style={[styles.knob, { transform: [{ translateX: knobPosition }] }, disabled && styles.disabledKnob]}
      />
    </Pressable>
  );
};
