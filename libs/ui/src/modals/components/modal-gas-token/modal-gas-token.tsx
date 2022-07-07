import React, { FC } from 'react';
import { Text } from 'react-native';

import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { GasTokenMetadata } from '../../../interfaces/token.interface';
import { getCustomSize } from '../../../styles/format-size';
import { formatUnits } from '../../../utils/units.utils';

import { styles } from './modal-gas-token.styles';

interface Props {
  balance: string;
  metadata: GasTokenMetadata;
}

export const ModalGasToken: FC<Props> = ({ balance, metadata }) => (
  <>
    <Text style={[styles.text, styles.marginRight]}>{formatUnits(balance, metadata.decimals)}</Text>
    <Text style={styles.text}>{metadata.symbol}</Text>
    <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />
  </>
);
