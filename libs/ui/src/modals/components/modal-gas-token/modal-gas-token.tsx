import React, { FC } from 'react';
import { Text } from 'react-native';

import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';

import { styles } from './modal-gas-token.styles';

export const ModalGasToken: FC = () => {
  const selectedNetwork = useSelectedNetworkSelector();

  return (
    <>
      <Text style={[styles.balanceText, styles.amount]}>{selectedNetwork.gasTokenBalance.data}</Text>
      <Text style={styles.balanceText}>{selectedNetwork.gasTokenMetadata.symbol}</Text>
      <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />
    </>
  );
};
