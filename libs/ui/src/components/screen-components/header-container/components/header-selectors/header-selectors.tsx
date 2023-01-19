import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ScreensEnum } from '../../../../../enums/sreens.enum';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector,
  useSelectedNetworkSelector
} from '../../../../../store/wallet/wallet.selectors';
import { CopyText } from '../../../../copy-text/copy-text';
import { IconWithBorder } from '../../../../icon-with-border/icon-with-border';
import { Icon } from '../../../../icon/icon';
import { IconNameEnum } from '../../../../icon/icon-name.enum';
import { RobotIcon } from '../../../../robot-icon/robot-icon';
import { Row } from '../../../../row/row';
import { Text } from '../../../../text/text';

import { styles } from './header-selectors.styles';
import { HeaderSelectorsTestIDs } from './header-selectors.test-ids';

export const HeaderSelectors: FC = () => {
  const { iconName } = useSelectedNetworkSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { name } = useSelectedAccountSelector();
  const { navigate } = useNavigation();

  const selectAccount = () => navigate(ScreensEnum.AccountsSelector);
  const selectNetwork = () => navigate(ScreensEnum.NetworksSelector);

  return (
    <Row style={styles.root}>
      <TouchableOpacity
        onPress={selectAccount}
        style={styles.accountContainer}
        testID={HeaderSelectorsTestIDs.AccountSelectorButton}
      >
        <Row>
          <View style={styles.button}>
            <IconWithBorder>
              <RobotIcon seed={publicKeyHash} />
            </IconWithBorder>
          </View>

          <Text numberOfLines={1} style={styles.accountName}>
            {name}
          </Text>
        </Row>
      </TouchableOpacity>
      <Row>
        <View style={styles.addressWrapper}>
          <CopyText text={publicKeyHash} />
        </View>
        <TouchableOpacity
          onPress={selectNetwork}
          style={styles.button}
          testID={HeaderSelectorsTestIDs.NetworkSelectorButton}
        >
          <IconWithBorder>
            <Icon name={iconName ?? IconNameEnum.NetworkFallback} />
          </IconWithBorder>
        </TouchableOpacity>
      </Row>
    </Row>
  );
};
