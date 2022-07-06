import React, { FC } from 'react';

import { Divider } from '../../../components/divider/divider';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { ModalContainer } from '../../components/modal-container/modal-container';
import { ModalGasToken } from '../../components/modal-gas-token/modal-gas-token';
import { ModalHeader } from '../../components/modal-header/modal-header';

import { NetworksList } from './networks-list';
import { styles } from './networks-selector.styles';

export const NetworksSelector: FC = () => {
  const selectedNetwork = useSelectedNetworkSelector();

  return (
    <ModalContainer screenTitle="Networks">
      <ModalHeader
        name={selectedNetwork.name}
        balanceTitle="Gas balance"
        icon={<Icon name={selectedNetwork.iconName ?? IconNameEnum.NetworkFallback} size={getCustomSize(6)} />}
        balance={
          <ModalGasToken balance={selectedNetwork.gasTokenBalance.data} metadata={selectedNetwork.gasTokenMetadata} />
        }
        style={styles.header}
      />
      <Divider size={getCustomSize(0.5)} style={styles.divider} />

      <NetworksList />
    </ModalContainer>
  );
};
