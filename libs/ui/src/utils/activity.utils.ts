import { Observable, of } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';
import { ActivityItem } from '../interfaces/activity-item.interface';
import { NetworkInterface } from '../interfaces/network.interface';

import { loadEvmActivity$ } from './by-network-types/activity.utils.evm';
import { getNetworkType } from './network.util';

export const loadActivity$ = (network: NetworkInterface, publicKeyHash: string): Observable<ActivityItem[]> => {
  const networkType = getNetworkType(network);

  switch (networkType) {
    case NetworkTypeEnum.EVM:
      return loadEvmActivity$(network, publicKeyHash);

    default:
      return of([]);
  }
};
