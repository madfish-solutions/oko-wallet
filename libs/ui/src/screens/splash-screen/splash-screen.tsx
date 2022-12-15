import React, { FC } from 'react';
import { View } from 'react-native';

import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { getCustomSize } from '../../styles/format-size';

import { styles } from './splash-screen.styles';

export const SplashScreen: FC = () => (
  <View style={styles.root}>
    <Icon name={IconNameEnum.WalletLogoPlaceholder} size={getCustomSize(11)} />
  </View>
);
