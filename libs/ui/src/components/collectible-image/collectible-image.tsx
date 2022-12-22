import { isDefined, isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import React, { FC, useState, useEffect } from 'react';
import { GestureResponderEvent, Image, ImageStyle, Pressable, View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { getCustomSize } from '../../styles/format-size';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { LoaderSizeEnum } from '../loader/enums';
import { Loader } from '../loader/loader';

import { styles } from './collectible-image.styles';

interface Props {
  artifactUri?: string;
  size?: number | string;
  width?: number;
  height?: number;
  onPress?: OnEventFn<GestureResponderEvent>;
  pixelShitSize?: number;
  style?: ViewStyleProps;
  containerStyle?: ImageStyle;
  shitIconStyle?: ViewStyleProps;
}

export const CollectibleImage: FC<Props> = ({
  artifactUri,
  size = getCustomSize(12.25),
  width = size,
  height = size,
  onPress,
  pixelShitSize = getCustomSize(5),
  style,
  containerStyle,
  shitIconStyle
}) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(!isNotEmptyString(artifactUri));

  useEffect(() => {
    setImageIsLoaded(!isNotEmptyString(artifactUri));
  }, [artifactUri]);

  return (
    <View style={[styles.root, { width, height }, style]}>
      <Pressable onPress={onPress} style={[styles.imageContainer, containerStyle]}>
        {isNotEmptyString(artifactUri) && (
          <Image source={{ uri: artifactUri }} style={styles.image} onLoadEnd={() => setImageIsLoaded(true)} />
        )}
        {(!isDefined(artifactUri) || (isDefined(artifactUri) && !isNotEmptyString(artifactUri))) && imageIsLoaded && (
          <Icon
            name={IconNameEnum.PixelShit}
            size={pixelShitSize ?? getCustomSize(5)}
            iconStyle={[styles.pixelShitIcon, shitIconStyle]}
          />
        )}
      </Pressable>
      {!imageIsLoaded && (
        <View style={[styles.layout, containerStyle]}>
          <Loader size={LoaderSizeEnum.Large} />
        </View>
      )}
    </View>
  );
};
