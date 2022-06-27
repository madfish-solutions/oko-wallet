import React, { FC, useCallback, useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { Input } from '../../components/input/input';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useShelter } from '../../hooks/use-shelter.hook';
import { NetworkInterface } from '../../interfaces/network.interface';
import { createEntity } from '../../store/utils/entity.utils';
import { addNewNetworkAction } from '../../store/wallet/wallet.actions';
import { useAllNetworksSelector, useSelectedAccountSelector } from '../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../utils/check-is-network-type-key-exist';

import { AddNetworkStyles } from './add-network.styles';

export const AddNetwork: FC = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const selectedAccount = useSelectedAccountSelector();
  const networks = useAllNetworksSelector();
  const { createHdAccountForNewNetworkType } = useShelter();

  const [name, setName] = useState('');
  const [rpcUrl, setRpcUrl] = useState('');
  const [chainId, setChainId] = useState('');
  const [gasTokenSymbol, setGasTokenSymbol] = useState('');
  const [explorerUrl, setExplorerUrl] = useState('');
  const [error, setError] = useState('');
  const [networkType, setNetworkType] = useState<NetworkTypeEnum>(NetworkTypeEnum.EVM);

  const validateSubmitValue = (values: NetworkInterface) =>
    Object.values(values).every(field => {
      if (typeof field === 'string') {
        return field.trim() !== undefined && field.trim() !== '';
      }

      return field !== undefined;
    });

  const isNetworkRpcUrlAlreadyExist = (newRpcUrl: string) => networks.some(network => network.rpcUrl === newRpcUrl);

  const handleSelectNetworkType = (newNetworkType: NetworkTypeEnum) => {
    setNetworkType(newNetworkType);
  };

  const handleSubmitNewNetwork = useCallback(() => {
    const values: NetworkInterface = {
      name,
      rpcUrl,
      chainId,
      gasTokenMetadata: {
        // TODO: Get token metadata from api
        name: 'Bitcoin',
        symbol: gasTokenSymbol,
        decimals: 6
      },
      gasTokenBalance: createEntity('0'),
      explorerUrl,
      networkType
    };

    if (!validateSubmitValue(values)) {
      return setError('Please, fill all fields!');
    }
    if (isNetworkRpcUrlAlreadyExist(rpcUrl)) {
      return setError('Please, add other rpc-url!');
    }

    if (!checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networkType, () => {
        dispatch(addNewNetworkAction(values));
        navigate(ScreensEnum.Wallet);
      });
    } else {
      dispatch(addNewNetworkAction(values));
      navigate(ScreensEnum.Wallet);
    }
  }, [name, rpcUrl, chainId, gasTokenSymbol, explorerUrl, networkType]);

  return (
    <View>
      <NavigationBar />
      <Text>Add network</Text>

      <View style={AddNetworkStyles.form}>
        <View>
          <TouchableOpacity onPress={() => handleSelectNetworkType(NetworkTypeEnum.EVM)}>
            <Text>Ethereum</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectNetworkType(NetworkTypeEnum.Tezos)}>
            <Text>Tezos</Text>
          </TouchableOpacity>
        </View>
        <Input value={name} onChangeText={setName} title="Name" style={AddNetworkStyles.input} />
        <Input value={rpcUrl} onChangeText={setRpcUrl} title="Rpc url" style={AddNetworkStyles.input} />
        <Input value={chainId} onChangeText={setChainId} title="Chain id" style={AddNetworkStyles.input} />
        <Input
          value={gasTokenSymbol}
          onChangeText={setGasTokenSymbol}
          title="Token symbol"
          style={AddNetworkStyles.input}
        />
        <Input value={explorerUrl} onChangeText={setExplorerUrl} title="Explorer" style={AddNetworkStyles.input} />
        {!!error && <Text style={AddNetworkStyles.error}>{error}</Text>}
        <Button title="Add" onPress={handleSubmitNewNetwork} />
      </View>
    </View>
  );
};
