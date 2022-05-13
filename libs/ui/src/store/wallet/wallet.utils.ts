import { NetworkInterface } from '../../interfaces/network.interface';

import { WalletState } from './wallet.state';

export const updateSelectedNetworkState = (
  state: WalletState,
  updateFunc: (selectedNetwork: NetworkInterface) => Partial<NetworkInterface>
): WalletState => ({
  ...state,
  networks: state.networks.map(network => {
    if (network.rpcUrl === state.selectedNetworkRpcUrl) {
      return {
        ...network,
        ...updateFunc(network)
      };
    }

    return network;
  })
});
