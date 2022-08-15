import React, { FC } from 'react';
import { View } from 'react-native';

import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Text } from '../../../components/text/text';
import { GasTokenMetadata } from '../../../interfaces/token.interface';
import { getCustomSize } from '../../../styles/format-size';
import { truncate } from '../../../utils/shortize.util';
import { formatUnits } from '../../../utils/units.utils';

import { styles } from './modal-gas-token.styles';

interface Props {
  balance: string;
  metadata: GasTokenMetadata;
}

const MAX_SYMBOL_LENGTH = 5;

export const ModalGasToken: FC<Props> = ({ balance, metadata }) => (
  <View style={styles.wrapper}>
    <Text style={[styles.text, styles.marginRight]} numberOfLines={1}>
      {formatUnits(balance, metadata.decimals)}
    </Text>
    <Text style={styles.text}>
      {metadata.symbol.length > MAX_SYMBOL_LENGTH ? truncate(metadata.symbol) : metadata.symbol}
    </Text>
    <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />
  </View>
);
