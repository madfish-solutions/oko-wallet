import { TezosToolkit } from '@taquito/taquito';
import memoize from 'mem';

import { AccountInterface } from '../interfaces/account.interface';

import { ReadOnlyTezosSigner } from './read-only-tezos-signer.utils';

export const createTezosToolkit = (rpcUrl: string) => new TezosToolkit(rpcUrl);

export const createReadOnlyTezosToolkit = memoize(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (rpcUrl: string, sender: AccountInterface) => {
    const readOnlyTezosToolkit = createTezosToolkit(rpcUrl);

    const tezosPublicKey = 'edpktf1jwVq31Gr2CxmPPCyaPLMKVtfGdKS5gkaEYnKDucasbrBABc';
    const tezosPublicKeyHash = 'tz1R6BQTSQsXiPy8rFqeisYzVd3pRdJqgEEV';

    // TODO change to sender.publicKey and sender.publicKeyHash
    readOnlyTezosToolkit.setSignerProvider(new ReadOnlyTezosSigner(tezosPublicKeyHash, tezosPublicKey));

    return readOnlyTezosToolkit;
  },
  { cacheKey: ([rpcUrl, sender]) => `${rpcUrl}_${sender.publicKeyHash}` }
);
