import React, { FC, useState } from 'react';
import { View, Image } from 'react-native';

import { ButtonSizeEnum } from '../../../../components/button/enums';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { getCustomSize } from '../../../../styles/format-size';

import { styles } from './dapp-image.styles';

type DappImageSizeEnum = Exclude<ButtonSizeEnum, ButtonSizeEnum.Fluid | ButtonSizeEnum.Medium | ButtonSizeEnum.Auto>;
interface Props {
  imageUri?: string;
  size?: DappImageSizeEnum;
}

export const DappImage: FC<Props> = ({ imageUri = '', size = ButtonSizeEnum.Large }) => {
  const [isShowPlaceholder, setIsShowPlaceholder] = useState(false);

  const handleError = () => setIsShowPlaceholder(true);

  return (
    <View style={[styles[size], styles.root]}>
      {isShowPlaceholder ? (
        <Image source={{ uri: imageUri }} onError={handleError} />
      ) : (
        <Icon name={IconNameEnum.IconPlaceholder} size={getCustomSize(2.5)} />
      )}
    </View>
  );
};
