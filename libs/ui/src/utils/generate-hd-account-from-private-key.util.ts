import { Wallet } from 'ethers';
import { NetworkTypeEnum } from 'shared';
import { getKeys } from 'shelter';

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
