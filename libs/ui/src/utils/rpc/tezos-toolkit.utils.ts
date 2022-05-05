import { localForger } from '@taquito/local-forging';
import { CompositeForger, MichelCodecPacker, RpcForger, TezosToolkit } from '@taquito/taquito';
import { Tzip12Module } from '@taquito/tzip12';
import { Tzip16Module } from '@taquito/tzip16';

import { AccountInterface } from '../../store/interfaces/account.interface';
import { ReadOnlySigner } from '../read-only.signer.util';

export const CURRENT_NETWORK_ID = 'mainnet';
const michelEncoder = new MichelCodecPacker();

export const createTezosToolkit = (rpcUrl: string) => {
  const tezosToolkit = new TezosToolkit(rpcUrl);
  tezosToolkit.setPackerProvider(michelEncoder);
  tezosToolkit.setForgerProvider(new CompositeForger([tezosToolkit.getFactory(RpcForger)(), localForger]));
  tezosToolkit.addExtension(new Tzip16Module());
  tezosToolkit.addExtension(new Tzip12Module());

  return tezosToolkit;
};

export const createReadOnlyTezosToolkit = (rpcUrl: string, sender: AccountInterface) => {
  const readOnlyTezosToolkit = createTezosToolkit(rpcUrl);
  readOnlyTezosToolkit.setSignerProvider(new ReadOnlySigner(sender.publicKeyHash, sender.publicKey));

  return readOnlyTezosToolkit;
};
