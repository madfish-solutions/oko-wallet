import { isDefined, isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Image, Animated, Easing, Pressable, GestureResponderEvent, ImageStyle } from 'react-native';

import { Icon } from '../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../components/icon/icon-name.enum';
import { ViewStyleProps } from '../../../../../interfaces/style.interface';
import { Token } from '../../../../../interfaces/token.interface';
import { getCustomSize } from '../../../../../styles/format-size';

import { styles } from './collectible-image.styles';

interface Props {
  collectible: Token;
  size?: number;
  height?: number;
  onPress?: OnEventFn<GestureResponderEvent>;
  style?: ViewStyleProps;
  imageStyle?: ImageStyle;
}

export const CollectibleImages: FC<Props> = ({
  collectible,
  size = getCustomSize(12.25),
  height,
  onPress,
  style,
  imageStyle
}) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(true);
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
    <View style={[styles.root, { width: size, height: height ?? size }, style]}>
      {!imageIsLoaded && (
        <View style={[styles.image, imageStyle]}>
          <Animated.View style={animatedStyle}>
            <Icon name={IconNameEnum.Loaders} size={getCustomSize(4)} iconStyle={styles.icon} />
          </Animated.View>
        </View>
      )}
      <Pressable onPress={onPress}>
        {isDefined(collectible.artifactUri) && isNotEmptyString(collectible.artifactUri) ? (
          <Image
            source={{ uri: collectible.artifactUri }}
            style={[styles.image, { width: size, height: height ?? size }, imageStyle]}
            onLoadEnd={() => setImageIsLoaded(true)}
          />
        ) : (
          <Icon name={IconNameEnum.PixelShit} size={getCustomSize(5)} />
        )}
      </Pressable>
    </View>
  );
};
