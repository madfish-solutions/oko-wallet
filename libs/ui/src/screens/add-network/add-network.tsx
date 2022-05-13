import React, { FC, useCallback, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { Input } from '../../components/input';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { GasTokensMetadata } from '../../constants/gas-tokens-metadata';
import { RpcEnum } from '../../enums/networks.enum';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { addNewNetworkAction } from '../../store/settings/settings.actions';
import { NetworkType } from '../../types/networks.type';

import { AddNetworkStyles } from './add-network.styles';

export const AddNetwork: FC = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const [name, setName] = useState('');
  const [rpc, setRpc] = useState(RpcEnum.KlaytnMainnet as string);
  const [chainId, setChainId] = useState('');
  const [gasTokenSymbol, setGasTokenSymbol] = useState('');
  const [explorer, setExplorer] = useState('');
  const [error, setError] = useState('');

  const validateSubmitValue = (values: NetworkType) => {
    return Object.values(values).every(field => {
      if (typeof field === 'string') {
        return field.trim() !== undefined && field.trim() !== '';
      } else {
        return field !== undefined;
      }
    });
  };

  const handleSubmitNewNetwork = useCallback(() => {
    const values: NetworkType = {
      name,
      rpc,
      chainId,
      gasToken: {
        // TODO: Get token metadata from api
        ...GasTokensMetadata['Klaytn Mainnet'],
        symbol: gasTokenSymbol
      },
      explorer
    };

    if (validateSubmitValue(values)) {
      dispatch(addNewNetworkAction(values));
      navigate(ScreensEnum.Wallet);
    } else {
      setError('Please, fill all fields!');
    }
  }, [name, rpc, chainId, gasTokenSymbol, explorer]);

  return (
    <View>
      <NavigationBar />
      <Text>Add network</Text>

      <View style={AddNetworkStyles.form}>
        <Input value={name} onChangeText={setName} title="Name" style={AddNetworkStyles.input} />
        <Input value={rpc} onChangeText={setRpc} title="Rpc url" style={AddNetworkStyles.input} />
        <Input value={chainId} onChangeText={setChainId} title="Chain id" style={AddNetworkStyles.input} />
        <Input
          value={gasTokenSymbol}
          onChangeText={setGasTokenSymbol}
          title="Token symbol"
          style={AddNetworkStyles.input}
        />
        <Input value={explorer} onChangeText={setExplorer} title="Explorer" style={AddNetworkStyles.input} />
        {!!error && <Text style={AddNetworkStyles.error}>{error}</Text>}
        <Button title="Add" onPress={handleSubmitNewNetwork} />
      </View>
    </View>
  );
};
