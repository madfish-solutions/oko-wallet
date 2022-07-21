import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { ButtonWithIcon } from '../../../../components/button-with-icon/button-with-icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { NETWORK_CHAIN_IDS_BY_NETWORK_TYPE } from '../../../../constants/networks';
import { NetworkTypeEnum } from '../../../../enums/network-type.enum';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useShelter } from '../../../../hooks/use-shelter.hook';
import { NetworkInterface } from '../../../../interfaces/network.interface';
import { editNetworkAction, removeNetworkAction } from '../../../../store/wallet/wallet.actions';
import { useAllNetworksSelector, useSelectedAccountSelector } from '../../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../../styles/format-size';
import { checkIsNetworkTypeKeyExist } from '../../../../utils/check-is-network-type-key-exist';
import { NetworkContainer } from '../components/network-container/network-container';
import { FormTypes } from '../types/form-types.interface';
import { confirmRemoveAction } from '../utils/confirmation.util';

import { styles } from './edit-network.styles';

export const EditNetwork: FC = () => {
  const { goBack } = useNavigation();
  const dispatch = useDispatch();
  const { createHdAccountForNewNetworkType } = useShelter();
  const selectedAccount = useSelectedAccountSelector();
  const networks = useAllNetworksSelector();
  const {
    params: { network: selectedNetwork, isNetworkSelected }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.EditNetwork>>();
  const networksWithoutCurrent = useMemo(
    () => networks.filter(network => network.rpcUrl !== selectedNetwork.rpcUrl),
    [networks, selectedNetwork]
  );

  const prepareSelectedNetwork = {
    name: selectedNetwork.name,
    rpcUrl: selectedNetwork.rpcUrl,
    chainId: selectedNetwork.chainId,
    blockExplorerUrl: selectedNetwork.explorerUrl,
    tokenSymbol: selectedNetwork.gasTokenMetadata.symbol
  };

  const onSumbit = (data: FormTypes) => {
    if (JSON.stringify(prepareSelectedNetwork) === JSON.stringify(data)) {
      return goBack();
    }

    let networkType = NetworkTypeEnum.EVM;

    if (NETWORK_CHAIN_IDS_BY_NETWORK_TYPE[NetworkTypeEnum.Tezos].includes(data.chainId)) {
      networkType = NetworkTypeEnum.Tezos;
    }

    const editedNetwork: NetworkInterface = {
      name: data.name,
      rpcUrl: data.rpcUrl,
      chainId: data.chainId,
      // Get metadata from rpc
      gasTokenMetadata: {
        name: data.tokenSymbol,
        symbol: data.tokenSymbol,
        decimals: 18
      },
      gasTokenBalance: selectedNetwork.gasTokenBalance,
      explorerUrl: data.blockExplorerUrl,
      networkType
    };

    if (isNetworkSelected && !checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networkType, () => {
        dispatch(editNetworkAction({ network: editedNetwork, isNetworkSelected }));
      });
    } else {
      dispatch(
        editNetworkAction({ network: editedNetwork, isNetworkSelected, prevRpcUrl: prepareSelectedNetwork.rpcUrl })
      );
    }

    goBack();
  };

  const handleConfirmRemoveAction = () => {
    confirmRemoveAction(handleRemoveNetwork);
  };

  const handleRemoveNetwork = () => {
    if (!checkIsNetworkTypeKeyExist(selectedAccount, networksWithoutCurrent[0].networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networksWithoutCurrent[0].networkType, () => {
        dispatch(removeNetworkAction(selectedNetwork.rpcUrl));
      });
    } else {
      dispatch(removeNetworkAction(selectedNetwork.rpcUrl));
    }
    goBack();
  };

  return (
    <NetworkContainer
      screenTitle="Edit network"
      submitTitle="Save"
      onSubmitPress={onSumbit}
      defaultValues={prepareSelectedNetwork}
    >
      <ButtonWithIcon
        title="Delete network"
        size="small"
        leftIcon={IconNameEnum.Trash}
        iconSize={getCustomSize(2)}
        onPress={handleConfirmRemoveAction}
        disabled={networks.length === 1}
        style={styles.button}
      />
    </NetworkContainer>
  );
};
