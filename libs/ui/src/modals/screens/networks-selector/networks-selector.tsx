import React, { FC } from 'react';

import { Divider } from '../../../components/divider/divider';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useGasTokenSelector, useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { ModalContainer } from '../../components/modal-container/modal-container';
import { ModalGasToken } from '../../components/modal-gas-token/modal-gas-token';
import { ModalHeader } from '../../components/modal-header/modal-header';

import { NetworksList } from './components/networks-list';
import { styles } from './networks-selector.styles';

export const NetworksSelector: FC = () => {
  const { goBack } = useNavigation();

  const selectedNetwork = useSelectedNetworkSelector();
  const { balance } = useGasTokenSelector();

  return (
    <ModalContainer screenTitle="Networks" onHeaderCloseButtonPress={goBack}>
      <ModalHeader
        name={selectedNetwork.name}
        balanceTitle="Gas balance"
        icon={<Icon name={selectedNetwork.iconName ?? IconNameEnum.NetworkFallback} size={getCustomSize(6)} />}
        balance={<ModalGasToken balance={balance?.data} metadata={selectedNetwork.gasTokenMetadata} />}
        style={styles.header}
      />
      <Divider size={getCustomSize(0.5)} style={styles.divider} />

      <NetworksList />
    </ModalContainer>
  );
};
