import React, { FC, useCallback, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Title } from '../../components/title';
import { GasTokensMetadata } from '../../constants/gas-tokens-metadata';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { addNewNetworkAction } from '../../store/settings/settings.actions';
import { NetworkType } from '../../types/networks.type';

import { AddNetworkScreenStyles } from './add-network-screen.styles';

export const AddNetworkScreen: FC = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const [name, setName] = useState('');
  const [rpc, setRpc] = useState('');
  const [chainId, setChainId] = useState('');
  const [gasTokenSymbol, setGasTokenSymbol] = useState('');
  const [explorer, setExplorer] = useState('');

  const handleAddNetwork = useCallback(() => {
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

    dispatch(addNewNetworkAction(values));
    navigate(ScreensEnum.Wallet);
  }, [name, rpc, chainId, gasTokenSymbol, explorer]);

  return (
    <View>
      <NavigationBar />
      <Title>Add network</Title>

      <View style={AddNetworkScreenStyles.form}>
        <Input value={name} onChangeText={setName} title="Name" style={AddNetworkScreenStyles.input} />
        <Input value={rpc} onChangeText={setRpc} title="Rpc url" style={AddNetworkScreenStyles.input} />
        <Input value={chainId} onChangeText={setChainId} title="Chain id" style={AddNetworkScreenStyles.input} />
        <Input
          value={gasTokenSymbol}
          onChangeText={setGasTokenSymbol}
          title="Token symbol"
          style={AddNetworkScreenStyles.input}
        />
        <Input value={explorer} onChangeText={setExplorer} title="Explorer" style={AddNetworkScreenStyles.input} />

        <Button onPress={handleAddNetwork} textStyle={AddNetworkScreenStyles.text}>
          Add
        </Button>
      </View>
    </View>
  );
};
