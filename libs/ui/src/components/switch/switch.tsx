import React, { FC, useCallback, useRef } from 'react';
import { Animated, Easing, Pressable } from 'react-native';

import { useLocalStorage } from '../../hooks/use-local-storage.hook';
import { ViewStyleProps } from '../../interfaces/style.interface';
import { getCustomSize } from '../../styles/format-size';
import { hapticFeedback } from '../../utils/taptic-engine/taptic-engine.utils';

import { styles } from './switch.styles';

const themesStyles = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary
};

interface Props {
  name: string;
  theme?: keyof typeof themesStyles;
  style?: ViewStyleProps;
}

const TURN_ON = getCustomSize(2.5);
const TURN_OFF = 0;

export const Switch: FC<Props> = ({ name = '', theme = 'primary', style }) => {
  const { localStorageValue: isTheSwitcherTurtnedOn, setLocalStorageValue } = useLocalStorage(name, false);

  const initialPosition = isTheSwitcherTurtnedOn ? TURN_ON : TURN_OFF;

  const knobPosition = useRef(new Animated.Value(initialPosition)).current;

  const switchKnob = useCallback(() => {
    if (isTheSwitcherTurtnedOn) {
      animation();
      setLocalStorageValue(false);
    } else {
      animation(TURN_ON);
      setLocalStorageValue(true);
    }
  }, [isTheSwitcherTurtnedOn]);

  const animation = (toValue = TURN_OFF, duration = 200) =>
    Animated.timing(knobPosition, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.linear
    }).start();

  const onPressOut = () => hapticFeedback();

  return (
    <Pressable onPress={switchKnob} onPressOut={onPressOut} style={[styles.root, themesStyles[theme], style]}>
      <Animated.View style={[styles.knob, { transform: [{ translateX: knobPosition }] }]} />
    </Pressable>
  );
};
