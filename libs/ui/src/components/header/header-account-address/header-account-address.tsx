import React, { FC } from 'react';
import { Text } from 'react-native';

import { useSelectedAccountPublicKeyHashSelector } from '../../../store/wallet/wallet.selectors';
import { handleCopyToClipboard } from '../../../utils/copy-to-clipboard.util';
import { isWeb } from '../../../utils/platform.utils';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { Row } from '../../row/row';
import { TouchableIcon } from '../../touchable-icon/touchable-icon';

import { styles } from './header-account-address.styles';

export const HeaderAccountAddress: FC = () => {
  const address = useSelectedAccountPublicKeyHashSelector();

  const copyAddress = () => handleCopyToClipboard(address);

  return (
    <Row>
      {isWeb ? (
        <>
          <TouchableIcon name={IconNameEnum.Copy} onPress={copyAddress} iconStyle={styles.icon} />
          <Text style={styles.address} ellipsizeMode="middle" numberOfLines={1}>
            3CKM...5rNX
          </Text>
        </>
      ) : (
        <TouchableIcon name={IconNameEnum.Qrscan} onPress={copyAddress} />
      )}
    </Row>
  );
};
