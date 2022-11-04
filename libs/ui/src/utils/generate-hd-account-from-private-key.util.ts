import { Wallet } from 'ethers';

import { NetworkTypeEnum } from '../enums/network-type.enum';

import { getKeys } from './generate-tezos-hd-account.util';

export const generateHdAccountFromPrivateKey = async (privateKeyParam: string, networkType: NetworkTypeEnum) => {
  switch (networkType) {
    case NetworkTypeEnum.Tezos: {
      const [publicKey, address, privateKey] = await getKeys(privateKeyParam);

      return {
        publicKey,
        address,
        privateKey
      };
    }
    default:
      return new Wallet(privateKeyParam);
  }
};
