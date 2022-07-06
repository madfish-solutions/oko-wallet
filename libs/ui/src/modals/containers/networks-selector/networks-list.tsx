import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useShelter } from '../../../hooks/use-shelter.hook';
import { NetworkInterface } from '../../../interfaces/network.interface';
import { changeNetworkAction } from '../../../store/wallet/wallet.actions';
import {
  useAllNetworksSelector,
  useSelectedAccountSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../../utils/check-is-network-type-key-exist';
import { ModalFlatList } from '../../components/modal-flat-list/modal-flat-list';
import { ModalGasToken } from '../../components/modal-gas-token/modal-gas-token';
import { ModalRenderItem } from '../../components/modal-render-item/modal-render-item';
import { useFlatListRef } from '../../hooks/use-flat-list-ref.hook';

export const NetworksList = () => {
  const selectedNetwork = useSelectedNetworkSelector();
  const networks = useAllNetworksSelector();
  const selectedAccount = useSelectedAccountSelector();
  const { createHdAccountForNewNetworkType } = useShelter();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const selectedIndex = networks.findIndex(account => account.rpcUrl === selectedNetwork.rpcUrl);

  const { flatListRef } = useFlatListRef({ array: networks, selectedIndex });

  const handleChangeNetwork = ({ rpcUrl, networkType }: NetworkInterface) => {
    dispatch(changeNetworkAction(rpcUrl));

    if (!checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networkType);
    }
  };

  const navigateToAddNetwork = () => navigate(ScreensEnum.AddNetwork);

  const renderAccount = ({ item, index }: ListRenderItemInfo<NetworkInterface>) => {
    const isNetworkSelected = selectedIndex === index;

    return (
      <ModalRenderItem
        name={item.name}
        icon={<Icon name={item.iconName ?? IconNameEnum.NetworkFallback} />}
        isActive={isNetworkSelected}
        balanceTitle="Gas balance"
        balance={<ModalGasToken balance={item.gasTokenBalance.data} metadata={item.gasTokenMetadata} />}
        onPress={() => handleChangeNetwork(item)}
      />
    );
  };

  return (
    <ModalFlatList
      onPressAddIcon={navigateToAddNetwork}
      flatListRef={flatListRef}
      data={networks}
      renderItem={renderAccount}
    />
  );
};
