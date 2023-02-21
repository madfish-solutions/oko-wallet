import { signTypedData, SignTypedDataVersion } from '@metamask/eth-sig-util';
import { ethers } from 'ethers';
import { of } from 'rxjs';

import { DAppMethodEnum } from '../../enums/dApp-method.enum';

export function signMessageByMethod(privateKey: string, messageToSign: string, method: string) {
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
      const signedMessage = signTypedData({
        privateKey: privateKeyBuffer,
        data,
        version: version as SignTypedDataVersion
      });

      return of(signedMessage);
    }

    default: {
      throw Error('this method is not supported by sign');
    }
  }
}
