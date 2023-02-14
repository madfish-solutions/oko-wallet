import { Wallet } from 'ethers';
import { getKeys } from 'shelter/src/utils/generate-tezos-hd-account.util';
import { NetworkTypeEnum } from 'ui-types/enums/network-type.enum';

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
