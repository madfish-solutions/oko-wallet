import { BscscanProvider, getDefaultProvider as getBscDefaultProvider } from '@ethers-ancillary/bsc';
import { ethers, getDefaultProvider as getEthersDefaultProvider } from 'ethers';
import { forkJoin, from, map, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ETHERSCAN_API_KEY, KLAYTN_API_ACCESS_KEY_ID, KLAYTN_API_SECRET_ACCESS_KEY } from '../../constants/api-auth';
import { ETHERSCAN_SUPPORTED_NETWORKS_CHAIN_IDS, NETWORK_CHAIN_IDS_BY_NETWORK_GROUP } from '../../constants/networks';
import { NetworkGroupEnum } from '../../enums/network-group.enum';
import { ActivityItem } from '../../interfaces/activity-item.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { getNetworkGroup } from '../network.util';

import { getCaverExtCas } from './klaytn.utils.evm';

interface KlaytnApiActivityItem {
  blockNumber: number;
  fee: string;
  feePayer: string;
  feeRatio: number;
  from: string;
  status?: number;
  timestamp: number;
  to: string;
  transactionHash: string;
  transactionIndex: number;
  transferType: string;
  typeInt: number;
  value: string;
}

interface KlaytnApiActivityResult {
  cursor: string;
  items: KlaytnApiActivityItem[];
}

export const loadEvmActivity$ = (network: NetworkInterface, publicKeyHash: string): Observable<ActivityItem[]> => {
  const { chainId } = network;

  const networkGroup = getNetworkGroup(network);

  if (
    [
      ...ETHERSCAN_SUPPORTED_NETWORKS_CHAIN_IDS,
      ...(NETWORK_CHAIN_IDS_BY_NETWORK_GROUP[NetworkGroupEnum.BSC] || [])
    ].includes(chainId)
  ) {
    return loadActivityFromEtherscan$(chainId, publicKeyHash, networkGroup);
  }

  switch (networkGroup) {
    case NetworkGroupEnum.Klaytn:
      return loadKlaytnActivity$(chainId, publicKeyHash);

    default:
      return of([]);
  }
};

const loadActivityFromEtherscan$ = (
  networkChainId: string,
  address: string,
  networkGroup?: NetworkGroupEnum
): Observable<ActivityItem[]> => {
  const scanProvider =
    networkGroup === NetworkGroupEnum.BSC
      ? new BscscanProvider(+networkChainId)
      : new ethers.providers.EtherscanProvider(+networkChainId, ETHERSCAN_API_KEY);
  const defaultProvider =
    networkGroup === NetworkGroupEnum.BSC
      ? getBscDefaultProvider(+networkChainId)
      : getEthersDefaultProvider(+networkChainId, { etherscan: ETHERSCAN_API_KEY });

  //address = '0x29Dde5eB80C512069b721dB28D2F5BCDE9Af4358'; //TODO

  return from(scanProvider.getHistory(address)).pipe(
    mergeMap(history =>
      forkJoin(history.map(item => defaultProvider.getTransactionReceipt(item.hash))).pipe(
        map(receipts =>
          receipts.map((receipt, i) => {
            const { hash, from, to, timestamp, value } = history[i];

            return {
              hash,
              from,
              to,
              timestamp,
              amount: value.toString(),
              status: receipt.status
            };
          })
        )
      )
    )
  );
};

const loadKlaytnActivity$ = (networkChainId: string, address: string): Observable<ActivityItem[]> => {
  const caverExtCas = getCaverExtCas();

  caverExtCas.initTokenHistoryAPI(networkChainId, KLAYTN_API_ACCESS_KEY_ID, KLAYTN_API_SECRET_ACCESS_KEY);

  return from(
    caverExtCas.kas.tokenHistory.getTransferHistoryByAccount(address) as Observable<KlaytnApiActivityResult>
  ).pipe(
    map(({ items }) =>
      items.map(item => {
        const { transactionHash: hash, from, to, timestamp, value, status } = item;

        return {
          hash,
          from,
          to,
          timestamp,
          amount: (+value).toString(),
          status
        };
      })
    )
  );
};
