import { localForger } from '@taquito/local-forging';
import { CompositeForger, MichelCodecPacker, RpcForger, TezosToolkit } from '@taquito/taquito';
import { Tzip12Module } from '@taquito/tzip12';
import { Tzip16Module } from '@taquito/tzip16';
import memoize from 'mem';

import { AccountInterface } from '../../interfaces/account.interface';
import { ReadOnlyTezosSigner } from '../read-only-tezos-signer.utils';

import { getFastRpcClient } from './fast-rpc';

const michelEncoder = new MichelCodecPacker();

export const createTezosToolkit = (rpcUrl: string) => {
  const tezosToolkit = new TezosToolkit(getFastRpcClient(rpcUrl));
  tezosToolkit.setPackerProvider(michelEncoder);
  tezosToolkit.setForgerProvider(new CompositeForger([tezosToolkit.getFactory(RpcForger)(), localForger]));
  tezosToolkit.addExtension(new Tzip16Module());
  tezosToolkit.addExtension(new Tzip12Module());

  return tezosToolkit;
};

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
