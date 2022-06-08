import { TezosToolkit } from '@taquito/taquito';

import { NetworkTypeEnum } from '../enums/network-type.enum';
import { AccountInterface } from '../interfaces/account.interface';

import { getString } from './get-string.utils';
import { ReadOnlyTezosSigner } from './read-only-tezos-signer.utils';

export const createTezosToolkit = (rpcUrl: string) => new TezosToolkit(rpcUrl);

export const createReadOnlyTezosToolkit = (rpcUrl: string, sender: AccountInterface) => {
  const readOnlyTezosToolkit = createTezosToolkit(rpcUrl);

  const publicKey = getString(sender.networksKeys[NetworkTypeEnum.Tezos]?.publicKey);
  const publicKeyHash = getString(sender.networksKeys[NetworkTypeEnum.Tezos]?.publicKeyHash);

  readOnlyTezosToolkit.setSignerProvider(new ReadOnlyTezosSigner(publicKeyHash, publicKey));

  return readOnlyTezosToolkit;
};
