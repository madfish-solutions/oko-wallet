import { Wallet } from 'ethers';
import { NetworkTypeEnum } from 'shared/enums/network-type.enum';
import { getKeys } from 'shelter/utils/generate-tezos-hd-account.util';

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
