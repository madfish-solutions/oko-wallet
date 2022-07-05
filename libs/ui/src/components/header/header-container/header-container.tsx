import React, { FC } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle, Text } from 'react-native';

import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';
import { handleCopyToClipboard } from '../../../utils/copy-to-clipboard.util';
import { shortize } from '../../../utils/shortize.util';
import { IconWithBorder } from '../../icon-with-border/icon-with-border';
import { Icon } from '../../icon/icon';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { RobotIcon } from '../../robot-icon/robot-icon';
import { Row } from '../../row/row';
import { TouchableIcon } from '../../touchable-icon/touchable-icon';

import { styles } from './header-container.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const HeaderContainer: FC<Props> = ({ style, children }) => {
  const { iconName } = useSelectedNetworkSelector();
  const address = useSelectedAccountPublicKeyHashSelector();

  const selectNetwork = () => null;
  const selectAccount = () => null;
  const copyAddress = () => handleCopyToClipboard(address);

  return (
    <View style={[styles.root, style]}>
      <Row style={styles.wrapper}>
        <TouchableOpacity onPress={selectNetwork} style={styles.button}>
          <IconWithBorder>
            <RobotIcon seed={address} />
          </IconWithBorder>
        </TouchableOpacity>

        <Row style={styles.addressWrapper}>
          <TouchableIcon name={IconNameEnum.Copy} onPress={copyAddress} iconStyle={styles.icon} />
          <Text numberOfLines={1} style={styles.address}>
            {shortize(address)}
          </Text>
        </Row>

        <TouchableOpacity onPress={selectAccount} style={styles.button}>
          <IconWithBorder>
            <Icon name={iconName ?? IconNameEnum.NetworkFallback} />
          </IconWithBorder>
        </TouchableOpacity>
      </Row>

      {children}
    </View>
  );
};
