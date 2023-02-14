import { TezosToolkit } from '@taquito/taquito';
import { NetworkTypeEnum } from 'ui-types/enums/network-type.enum';
import { AccountInterface } from 'ui-types/interfaces/account.interface';

import { ReadOnlyTezosSigner } from './read-only-tezos-signer.utils';

export const createTezosToolkit = (rpcUrl: string) => new TezosToolkit(rpcUrl);

export const createReadOnlyTezosToolkit = (rpcUrl: string, sender: AccountInterface) => {
  const readOnlyTezosToolkit = createTezosToolkit(rpcUrl);

  const publicKey = sender.networksKeys[NetworkTypeEnum.Tezos]?.publicKey ?? '';
  const publicKeyHash = sender.networksKeys[NetworkTypeEnum.Tezos]?.publicKeyHash ?? '';

  readOnlyTezosToolkit.setSignerProvider(new ReadOnlyTezosSigner(publicKeyHash, publicKey));

  return readOnlyTezosToolkit;
};
