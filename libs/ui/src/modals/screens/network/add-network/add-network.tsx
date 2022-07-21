import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { NETWORK_CHAIN_IDS_BY_NETWORK_TYPE } from '../../../../constants/networks';
import { NetworkTypeEnum } from '../../../../enums/network-type.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useShelter } from '../../../../hooks/use-shelter.hook';
import { NetworkInterface } from '../../../../interfaces/network.interface';
import { createEntity } from '../../../../store/utils/entity.utils';
import { addNewNetworkAction } from '../../../../store/wallet/wallet.actions';
import { useSelectedAccountSelector } from '../../../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../../../utils/check-is-network-type-key-exist';
import { NetworkContainer } from '../components/network-container/network-container';
import { FormTypes } from '../types/form-types.interface';

export const AddNetwork: FC = () => {
  const { goBack } = useNavigation();
  const dispatch = useDispatch();
  const { createHdAccountForNewNetworkType } = useShelter();
  const selectedAccount = useSelectedAccountSelector();

  const onSumbit = ({ name, rpcUrl, chainId, tokenSymbol, blockExplorerUrl }: FormTypes) => {
    let networkType = NetworkTypeEnum.EVM;

    if (NETWORK_CHAIN_IDS_BY_NETWORK_TYPE[NetworkTypeEnum.Tezos].includes(chainId)) {
      networkType = NetworkTypeEnum.Tezos;
    }

    const values: NetworkInterface = {
      name,
      rpcUrl,
      chainId,
      // Get metadata from rpc
      gasTokenMetadata: {
        name: tokenSymbol,
        symbol: tokenSymbol,
        decimals: 18
      },
      gasTokenBalance: createEntity('0'),
      explorerUrl: blockExplorerUrl,
      networkType
    };

    if (!checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networkType, () => {
        dispatch(addNewNetworkAction(values));
      });
    } else {
      dispatch(addNewNetworkAction(values));
    }

    goBack();
  };

  return <NetworkContainer screenTitle="Add network" submitTitle="Add" onSubmitPress={onSumbit} />;
};
