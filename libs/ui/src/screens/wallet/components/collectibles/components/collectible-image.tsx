import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Image, Animated, Easing, Pressable } from 'react-native';

import { Divider } from '../../../../../components/divider/divider';
import { Icon } from '../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../components/icon/icon-name.enum';
import { Token } from '../../../../../interfaces/token.interface';
import { getCustomSize } from '../../../../../styles/format-size';

import { styles } from './collectible-image.styles';

interface Props {
  collectible: Token;
}

export const CollectibleImages: FC<Props> = ({ collectible }) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
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
    <>
      {!imageIsLoaded && (
        <View style={styles.image}>
          <Animated.View style={animatedStyle}>
            <Icon name={IconNameEnum.Loaders} size={getCustomSize(4)} iconStyle={styles.icon} />
          </Animated.View>
        </View>
      )}
      <Pressable>
        <Image
          source={{ uri: collectible.artifactUri }}
          style={styles.image}
          onLoadEnd={() => setImageIsLoaded(true)}
        />
      </Pressable>
      <Divider />
    </>
  );
};
