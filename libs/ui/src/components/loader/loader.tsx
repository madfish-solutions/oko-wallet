import React, { FC, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';

import { sizes } from './constants';
import { LoaderSizeEnum } from './enums';

interface Props {
  color?: string;
  size?: LoaderSizeEnum;
}

export const Loader: FC<Props> = ({ color, size = LoaderSizeEnum.Medium }) => {
  const spinAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
        easing: Easing.linear
      })
    ).start();
  }, [spinAnimation]);

  const interpolated = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolated
      }
    ]
  };

  return (
    <Animated.View style={animatedStyle}>
      <Icon name={IconNameEnum.Loaders} size={sizes[size]} color={color} />
    </Animated.View>
  );
};
