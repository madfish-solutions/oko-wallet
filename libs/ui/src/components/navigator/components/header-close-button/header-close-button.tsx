import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';

import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';

import { styles } from './header-close-button.styles';
import { HeaderCloseButtonTestIDs } from './header-close-button.test-ids';

const goBackRoutes = [
  ScreensEnum.SendAccountsSelector,
  ScreensEnum.SendTokensSelector,
  ScreensEnum.SendCollectiblesSelector,
  ScreensEnum.WordsAmountSelector,
  ScreensEnum.Collectible,
  ScreensEnum.RevealPrivateKey,
  ScreensEnum.RevealSeedPhrase,
  ScreensEnum.SettingsCurrencySelector,
  ScreensEnum.SettingsAppearanceSelector,
  ScreensEnum.SettingsResetWalletConfirm,
  ScreensEnum.SettingsLockTimeSelector,
  ScreensEnum.EditAccount
];

interface Props {
  onCloseButtonPress?: OnEventFn<void>;
}

export const HeaderCloseButton: FC<Props> = ({ onCloseButtonPress }) => {
  const { navigate, goBack } = useNavigation();
  const { name } = useRoute<RouteProp<ScreensParamList>>();

  const onClosePress = () => {
    if (isDefined(onCloseButtonPress)) {
      return onCloseButtonPress();
    }

    if (goBackRoutes.includes(name)) {
      goBack();
    } else {
      navigate(ScreensEnum.Wallet);
    }
  };

  return (
    <TouchableIcon
      style={styles.root}
      onPress={onClosePress}
      name={IconNameEnum.X}
      testID={HeaderCloseButtonTestIDs.CloseButton}
    />
  );
};
