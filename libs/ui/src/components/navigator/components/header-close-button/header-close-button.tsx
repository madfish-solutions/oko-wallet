import React, { FC } from 'react';

import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './header-close-button.styles';

export const HeaderCloseButton: FC = () => {
  const { navigate } = useNavigation();

  const navigateToWallet = () => navigate(ScreensEnum.Wallet);

  return <TouchableIcon style={styles.root} onPress={navigateToWallet} name={IconNameEnum.X} />;
};
