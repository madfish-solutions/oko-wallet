import React, { FC } from 'react';
import { View } from 'react-native';

import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Text } from '../../../components/text/text';
import { GasTokenMetadata } from '../../../interfaces/token.interface';
import { getCustomSize } from '../../../styles/format-size';
import { getFormattedBalance } from '../../../utils/units.utils';

import { styles } from './modal-gas-token.styles';

interface Props {
  balance: string;
  metadata: GasTokenMetadata;
}

export const ModalGasToken: FC<Props> = ({ balance, metadata }) => (
  <View style={styles.wrapper}>
    <Text style={[styles.marginRight, styles.balance]}>{getFormattedBalance(balance, metadata.decimals)}</Text>
    <Text style={styles.text} numberOfLines={1}>
      {metadata.symbol}
    </Text>
    <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />
  </View>
);
