import React, { FC, useState } from 'react';
import { View, Image } from 'react-native';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { getCustomSize } from '../../../../styles/format-size';

import { styles } from './dapp-image.styles';

interface DappImageProps {
  image: string;
}

export const DappImage: FC<DappImageProps> = ({ image }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  return (
    <View style={styles.imageContainer}>
      {showPlaceholder ? (
        <Image source={{ uri: image }} onError={() => setShowPlaceholder(true)} />
      ) : (
        <Icon name={IconNameEnum.IconPlaceholder} size={getCustomSize(2.5)} />
      )}
    </View>
  );
};
