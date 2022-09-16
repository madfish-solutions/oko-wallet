import { isDefined, isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Image, Animated, Easing, Pressable, GestureResponderEvent, ImageStyle } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { getCustomSize } from '../../styles/format-size';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';

import { styles } from './collectible-image.styles';

interface Props {
  artifactUri: string | undefined;
  size?: number;
  height?: number;
  onPress?: OnEventFn<GestureResponderEvent>;
  pixelShitSize?: number;
  style?: ViewStyleProps;
  containerStyle?: ImageStyle;
}

export const CollectibleImage: FC<Props> = ({
  artifactUri,
  size = getCustomSize(12.25),
  height,
  onPress,
  pixelShitSize,
  style,
  containerStyle
}) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(isNotEmptyString(artifactUri) ? false : true);
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
      <Pressable
        onPress={onPress}
        style={[styles.imageContainer, { width: size, height: height ?? size }, containerStyle]}
      >
        {isNotEmptyString(artifactUri) && (
          <Image source={{ uri: artifactUri }} style={[styles.image]} onLoadEnd={() => setImageIsLoaded(true)} />
        )}
        {(!isDefined(artifactUri) && imageIsLoaded) ||
          (isDefined(artifactUri) && !isNotEmptyString(artifactUri) && imageIsLoaded && (
            <Icon
              name={IconNameEnum.PixelShit}
              size={pixelShitSize ?? getCustomSize(5)}
              iconStyle={styles.pixelShitIcon}
            />
          ))}
      </Pressable>
      {!imageIsLoaded && (
        <View style={[styles.layout, { width: size, height: size }, containerStyle]}>
          <Animated.View style={animatedStyle}>
            <Icon name={IconNameEnum.Loaders} size={getCustomSize(4)} />
          </Animated.View>
        </View>
      )}
    </View>
  );
};
