import React, { FC, useRef, useState } from 'react';
import { View, Image, Animated, Easing } from 'react-native';

import { Token } from '../../interfaces/token.interface';
import { getCustomSize } from '../../styles/format-size';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';

import { styles } from './collectibles.styles';

interface Props {
  collectibles: Token[];
}

export const CollectibleImages: FC<Props> = ({ collectibles }) => {
  const [firstImageIsLoaded, setFirstImageIsLoaded] = useState(false);
  const [secondImageIsLoaded, setSecondImageIsLoaded] = useState(false);
  const spinAnimation = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.timing(spinAnimation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
      easing: Easing.linear
    })
  ).start();

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
    <>
      {!firstImageIsLoaded && (
        <View style={styles.image}>
          <Animated.View style={animatedStyle}>
            <Icon name={IconNameEnum.Loaders} size={getCustomSize(4)} iconStyle={styles.icon} />
          </Animated.View>
        </View>
      )}
      <Image
        source={{ uri: collectibles[0].artifactUri }}
        style={[styles.image, styles.imageFirst]}
        onLoadEnd={() => setFirstImageIsLoaded(true)}
      />
      {collectibles[1] !== undefined && !secondImageIsLoaded && (
        <View style={styles.image}>
          <Animated.View style={animatedStyle}>
            <Icon name={IconNameEnum.Loaders} size={getCustomSize(4)} iconStyle={styles.icon} />
          </Animated.View>
        </View>
      )}
      {collectibles[1] !== undefined && (
        <Image
          source={{ uri: collectibles[1].artifactUri }}
          style={styles.image}
          onLoadEnd={() => setSecondImageIsLoaded(true)}
        />
      )}
    </>
  );
};
