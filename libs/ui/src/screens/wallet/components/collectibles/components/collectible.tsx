import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Image, Animated, Easing } from 'react-native';

import { Icon } from '../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../components/icon/icon-name.enum';
import { Token } from '../../../../../interfaces/token.interface';
import { getCustomSize } from '../../../../../styles/format-size';
import { styles } from '../collectibles.styles';

interface Props {
  collectibles: Token[];
}

export const CollectibleImages: FC<Props> = ({ collectibles }) => {
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
      {collectibles.map(collectible => (
        <>
          {!imageIsLoaded && (
            <View style={styles.image}>
              <Animated.View style={animatedStyle}>
                <Icon name={IconNameEnum.Loaders} size={getCustomSize(4)} iconStyle={styles.icon} />
              </Animated.View>
            </View>
          )}
          <Image
            source={{ uri: collectible.artifactUri }}
            style={styles.image}
            onLoadEnd={() => setImageIsLoaded(true)}
          />
        </>
      ))}
    </>
  );
};
