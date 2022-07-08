import React, { useCallback, useMemo, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { EMPTY_STRING } from '../../../../constants/defaults';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useShelter } from '../../../../hooks/use-shelter.hook';
import { NetworkInterface } from '../../../../interfaces/network.interface';
import { changeNetworkAction } from '../../../../store/wallet/wallet.actions';
import {
  useAllNetworksSelector,
  useSelectedAccountSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../../../utils/check-is-network-type-key-exist';
import { ModalFlatList } from '../../../components/modal-flat-list/modal-flat-list';
import { ModalGasToken } from '../../../components/modal-gas-token/modal-gas-token';
import { ModalRenderItem } from '../../../components/modal-render-item/modal-render-item';
import { useFlatListRef } from '../../../hooks/use-flat-list-ref.hook';
import { useListSearch } from '../../../hooks/use-list-search.hook';

export const NetworksList = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { createHdAccountForNewNetworkType } = useShelter();

  const networks = useAllNetworksSelector();
  const selectedNetwork = useSelectedNetworkSelector();
  const selectedAccount = useSelectedAccountSelector();

  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  const filteredList = useListSearch(searchValue, networks);

  const selectedIndex = useMemo(
    () => filteredList.findIndex(account => account.rpcUrl === selectedNetwork.rpcUrl),
    [filteredList, selectedNetwork.rpcUrl]
  );
  const { flatListRef } = useFlatListRef({ data: filteredList, selectedIndex });

  const handleChangeNetwork = useCallback(
    ({ rpcUrl, networkType }: NetworkInterface) => {
      dispatch(changeNetworkAction(rpcUrl));

      if (!checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
        createHdAccountForNewNetworkType(selectedAccount, networkType);
      }
    },
    [selectedAccount]
  );

  const navigateToAddNetwork = () => navigate(ScreensEnum.AddNetwork);

  const edit = () => null;

  const renderItem = ({ item, index }: ListRenderItemInfo<NetworkInterface>) => {
    const isNetworkSelected = selectedIndex === index;

    return (
      <ModalRenderItem
        name={item.name}
        icon={<Icon name={item.iconName ?? IconNameEnum.NetworkFallback} />}
        isActive={isNetworkSelected}
        balanceTitle="Gas balance"
        balance={<ModalGasToken balance={item.gasTokenBalance.data} metadata={item.gasTokenMetadata} />}
        onSelectItem={() => handleChangeNetwork(item)}
        onEdit={edit}
      />
    );
  };

  return (
    <ModalFlatList
      onPressAddIcon={navigateToAddNetwork}
      flatListRef={flatListRef}
      data={filteredList}
      renderItem={renderItem}
      setSearchValue={setSearchValue}
      keyExtractor={item => item.rpcUrl}
      selectedItem={selectedNetwork}
    />
  );
};
