import { getDefaultProvider, utils } from 'ethers';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';

import { ChainsDropdown } from '../../components/chains-dropdown';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

const network = 'https://moonbeam-alpha.api.onfinality.io/public';
const provider = getDefaultProvider(network);
const address = '0x84757a438E06631f34b2199B5D92e6865cE47D50';

export const TestScreen = () => {
  // Get token balance from ethereum like network
  const getETHBalance = useCallback(async () => {
    await provider.getBalance(address).then(balance => {
      const balanceInEth = utils.formatEther(balance);
      console.log(`balance: ${balanceInEth} ETH`);
    });
  }, []);

  useEffect(() => {
    getETHBalance();
  }, [getETHBalance]);

  return (
    <View>
      <NavigationBar />
      <ChainsDropdown />
    </View>
  );
};
