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
    <View style={[styles.root, { width: size, height: height ?? size }, style]}>
      <Pressable onPress={onPress} style={styles.imageContainer}>
        <Image
          source={{ uri: collectible.artifactUri }}
          style={[{ width: size, height: height ?? size, borderRadius: getCustomSize(0.5) }, imageStyle]}
          onLoadEnd={() => setImageIsLoaded(true)}
        />
        {(!isDefined(collectible.artifactUri) && imageIsLoaded) ||
          (isDefined(collectible.artifactUri) && !isNotEmptyString(collectible.artifactUri) && imageIsLoaded && (
            <Icon name={IconNameEnum.PixelShit} size={getCustomSize(5)} iconStyle={styles.pixelShitIcon} />
          ))}
      </Pressable>
      {!imageIsLoaded && (
        <View style={[styles.layout, { width: size, height: size }, imageStyle]}>
          <Animated.View style={animatedStyle}>
            <Icon name={IconNameEnum.Loaders} size={getCustomSize(4)} iconStyle={styles.icon} />
          </Animated.View>
        </View>
      )}
    </View>
  );
};
