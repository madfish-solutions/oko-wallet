import { getDefaultProvider, utils } from 'ethers';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';

import { ListOfChains } from '../../components/list-of-chains';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

// TODO: Delete later
const network = 'rinkeby'; // use rinkeby testnet
const provider = getDefaultProvider(network);
const address = '0xF02c1c8e6114b1Dbe8937a39260b5b0a374432bB';

const _global: any = global;

export const TestScreen = () => {
  console.log(_global.window);

  // Get ETH balance from 'Ethereum' testnet
  const getETHBalance = useCallback(async () => {
    const balance = await provider.getBalance(address).then(balance => {
      const balanceInEth = utils.formatEther(balance);
      console.log(`balance: ${balanceInEth} ETH`);
    });

    return balance;
  }, []);

  useEffect(() => {
    getETHBalance();
  }, [getETHBalance]);

  return (
    <View>
      <NavigationBar />
      <ListOfChains />
    </View>
  );
};
