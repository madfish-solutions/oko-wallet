import React, { FC } from 'react';
import { Text, View } from 'react-native';
import QRCodeLibrary from 'react-native-qrcode-svg';

import { StylePropsType } from '../../../interfaces/style.interface';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';
import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { handleCopyToClipboard } from '../../../utils/copy-to-clipboard.util';
import { Column } from '../../column/column';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { Row } from '../../row/row';
import { TouchableIcon } from '../../touchable-icon/touchable-icon';

import { styles } from './header-qr-code.styles';

interface Props {
  style?: StylePropsType;
}

export const HeaderQRCode: FC<Props> = ({ style }) => {
  const address = useSelectedAccountPublicKeyHashSelector();
  const { name } = useSelectedNetworkSelector();

  const copyAddress = () => handleCopyToClipboard(address);

  return (
    <Row style={[styles.root, style]}>
      <Column style={styles.wrapper}>
        <Text style={styles.text}>
          Share this address
          {'\n'}
          for receive <Text style={styles.symbol}>{name}</Text> network tokens
        </Text>
        <Text style={styles.address} numberOfLines={2}>
          {address}
        </Text>
        <TouchableIcon name={IconNameEnum.Copy} onPress={copyAddress} />
      </Column>
      <View style={styles.container}>
        <QRCodeLibrary
          backgroundColor="transparent"
          color={colors.textGrey1}
          value={address}
          size={getCustomSize(14)}
        />
      </View>
    </Row>
  );
};
