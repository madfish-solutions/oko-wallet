import { Observable, of } from 'rxjs';

import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { NetworkInterface } from '../../interfaces/network.interface';
import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';
import { TransferParams } from '../../interfaces/transfer-params.interface';
import { getNetworkType } from '../../utils/network.utils';

import { WalletState } from './wallet.state';

export const updateSelectedNetworkState = (
  state: WalletState,
  updateFunc: (selectedNetwork: NetworkInterface) => Partial<NetworkInterface>
): WalletState => ({
  ...state,
  networks: state.networks.map(network =>
    network.rpcUrl === state.selectedNetworkRpcUrl
      ? {
          ...network,
          ...updateFunc(network)
        }
      : network
  )
});

export const getTransferParams$ = (
  { receiverPublicKeyHash, amount }: SendAssetPayload,
  selectedNetwork: NetworkInterface
): Observable<TransferParams> => {
  let transferParams;

  if (getNetworkType(selectedNetwork) === NetworkTypeEnum.Tezos) {
    transferParams = {
      to: receiverPublicKeyHash,
      amount: Number(amount)
    };
  } else {
    transferParams = {
      to: receiverPublicKeyHash,
      value: amount
    };
  }

  return of(transferParams);
};
