import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ScreensEnum } from '../../../../../enums/sreens.enum';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../../store/wallet/wallet.selectors';
import { CopyText } from '../../../../copy-text/copy-text';
import { IconWithBorder } from '../../../../icon-with-border/icon-with-border';
import { Icon } from '../../../../icon/icon';
import { IconNameEnum } from '../../../../icon/icon-name.enum';
import { RobotIcon } from '../../../../robot-icon/robot-icon';
import { Row } from '../../../../row/row';

import { styles } from './selectors.styles';

export const Selectors: FC = () => {
  const { iconName } = useSelectedNetworkSelector();
  const address = useSelectedAccountPublicKeyHashSelector();
  const { navigate } = useNavigation();

  const selectAccount = () => navigate(ScreensEnum.AccountsSelector);
  const selectNetwork = () => navigate(ScreensEnum.NetworksSelector);

  return (
    <Row style={styles.root}>
      <TouchableOpacity onPress={selectAccount} style={styles.button}>
        <IconWithBorder>
          <RobotIcon seed={address} />
        </IconWithBorder>
      </TouchableOpacity>

      <View style={styles.addressWrapper}>
        <CopyText text={address} />
      </View>

      <TouchableOpacity onPress={selectNetwork} style={styles.button}>
        <IconWithBorder>
          <Icon name={iconName ?? IconNameEnum.NetworkFallback} />
        </IconWithBorder>
      </TouchableOpacity>
    </Row>
  );
};
