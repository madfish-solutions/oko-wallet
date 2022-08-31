import React, { FC } from 'react';

import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './header-close-button.styles';

export const HeaderCloseButton: FC = () => {
  const { goBack } = useNavigation();

  const navigateToWallet = () => goBack();

  return <TouchableIcon style={styles.root} onPress={navigateToWallet} name={IconNameEnum.X} />;
};
