import { signTypedData, SignTypedDataVersion } from '@metamask/eth-sig-util';
import { ethers } from 'ethers';
import { of } from 'rxjs';
import { DAppMethodEnum } from 'shared';

export const signMessageByMethod = (privateKey: string, messageToSign: string, method: string) => {
  switch (method) {
    case DAppMethodEnum.ETH_SIGN:
    case DAppMethodEnum.ETH_PERSONAL_SIGN: {
      return new ethers.Wallet(privateKey).signMessage(messageToSign);
    }
    case DAppMethodEnum.ETH_SIGN_TYPED_DATA:
    case DAppMethodEnum.ETH_SIGN_TYPED_DATA_V3:
    case DAppMethodEnum.ETH_SIGN_TYPED_DATA_V4: {
      const version = method.split('_')[2] ? method.split('_')[2].toUpperCase() : SignTypedDataVersion.V1;
      const data = JSON.parse(messageToSign);
      const privateKeyBuffer = Buffer.from(privateKey.slice(2), 'hex');
      if (
        version === SignTypedDataVersion.V1 ||
        version === SignTypedDataVersion.V3 ||
        version === SignTypedDataVersion.V4
      ) {
        const signedMessage = signTypedData({
          privateKey: privateKeyBuffer,
          data,
          version
        });

        return of(signedMessage);
      }
      throw Error('this version is not supported by sign');
    }

    default: {
      throw Error('this method is not supported by sign');
    }
  }
};
