import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';

import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './header-close-button.styles';

const goBackRoutes = [
  ScreensEnum.SendAccountsSelector,
  ScreensEnum.SendTokensSelector,
  ScreensEnum.WordsAmountSelector,
  ScreensEnum.Collectible,
  ScreensEnum.SettingsCurrencySelector,
  ScreensEnum.SettingsAppearanceSelector,
  ScreensEnum.SettingsResetWalletConfirm,
  ScreensEnum.SettingsLockTimeSelector
];

export const HeaderCloseButton: FC = () => {
  const { navigate, goBack } = useNavigation();
  const { name } = useRoute<RouteProp<ScreensParamList>>();

  const onClosePress = () => {
    if (goBackRoutes.includes(name)) {
      goBack();
    } else {
      navigate(ScreensEnum.Wallet);
    }
  };

  return <TouchableIcon style={styles.root} onPress={onClosePress} name={IconNameEnum.X} />;
};
