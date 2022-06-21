import React, { FC, useRef, useState } from 'react';
import { View, Image, Pressable, Animated, Easing } from 'react-native';

import { Token } from '../../interfaces/token.interface';
import { getCustomSize } from '../../styles/format-size';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { WidgetContainer } from '../widget-container/widget-container';

import { styles } from './collectibles.styles';

interface Props {
  collectibles: Token[];
}

const EMPTY_NFT = 'Receive your first NFT';
const COLLECTIBLES = 'Collectibles';
const RECEIVE = 'RECEIVE';
const VIEW_ALL = 'VIEW ALL';

export const Collectibles: FC<Props> = ({ collectibles }) => {
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

  const [firstImageIsLoaded, setFirstImageIsLoaded] = useState(false);
  const [secondImageIsLoaded, setSecondImageIsLoaded] = useState(false);

  if (collectibles.length === 0) {
    return (
      <WidgetContainer title={COLLECTIBLES} iconName={IconNameEnum.Nft} style={styles.emptyNFT}>
        <Button title={EMPTY_NFT} leftIcon={IconNameEnum.Receive} style={styles.emptyNFT} />
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer title={COLLECTIBLES} iconName={IconNameEnum.Nft} style={styles.emptyNFT}>
      <View style={styles.wrapper}>
        <Pressable style={styles.pressable}>
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
        </Pressable>
        <View style={styles.buttons}>
          <Button title={RECEIVE} rightIcon={IconNameEnum.Receive} style={[styles.button, styles.buttonTop]} />
          <Button title={VIEW_ALL} rightIcon={IconNameEnum.ArrowRight} style={[styles.button, styles.buttonBottom]} />
        </View>
      </View>
    </WidgetContainer>
  );
};
