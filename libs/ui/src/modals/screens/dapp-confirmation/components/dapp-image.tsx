import React, { FC, useState } from 'react';
import { View, Image } from 'react-native';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { getCustomSize } from '../../../../styles/format-size';

import { styles } from './dapp-image.styles';

interface Props {
  imageUri?: string;
}

export const DappImage: FC<Props> = ({ imageUri = '' }) => {
  const [isShowPlaceholder, setIsShowPlaceholder] = useState(false);

  const handleError = () => setIsShowPlaceholder(true);

  return (
    <View style={styles.root}>
      {isShowPlaceholder ? (
        <Image source={{ uri: imageUri }} onError={handleError} />
      ) : (
        <Icon name={IconNameEnum.IconPlaceholder} size={getCustomSize(2.5)} />
      )}
    </View>
  );
};
