//import { ethers } from 'ethers';
import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { Account } from '../../components/account/account';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Networks } from '../../components/networks/networks';
import { useUnlock } from '../../hooks/use-unlock.hook';

import { Activity } from './components/activity/activity';
import { AssetsWidget } from './components/assets-widget/assets-widget';
import { CollectiblesWidget } from './components/collectibles/collectibles';
import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const { isLocked } = useUnlock();
  //const txHash = '0x6306109c98c151dfb8a5af7fa9f581d18c366a0b389ac83c41e8c0dde13d6248';
  //const network = useSelectedNetworkSelector();
  //const provider = getDefaultEvmProvider(network.rpcUrl);

  //useEffect(() => {
  // const confirmTransactionMined = async () => {
  //   const tx = await provider.getTransactionReceipt(txHash);
  //   console.log(tx);
  // };
  // confirmTransactionMined();
  //   provider.on('pending', block => console.log(block));
  // }, []);

  return (
    <View style={WalletStyles.root}>
      <ScrollView scrollEnabled={!isLocked}>
        <Account />
        <Networks />
        <AssetsWidget />
        <CollectiblesWidget />
        <Activity />
      </ScrollView>
      <NavigationBar />
    </View>
  );
};
