import React, { FC } from 'react';
import { Linking, View } from 'react-native';

import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';

import { madFishUrl } from './constants';
import { styles } from './mad-fish-logo.styles';

interface Props {
  style?: ViewStyleProps;
  color?: string;
}

export const MadFishLogo: FC<Props> = ({ style, color = colors.textGrey6 }) => {
  const goToMadFishSite = () => Linking.openURL(madFishUrl);

  return (
    <View style={[styles.root, style]}>
      <TouchableIcon
        width={getCustomSize(13.75)}
        height={getCustomSize(5)}
        name={IconNameEnum.MadWithLove}
        onPress={goToMadFishSite}
        color={color}
      />
    </View>
  );
};
