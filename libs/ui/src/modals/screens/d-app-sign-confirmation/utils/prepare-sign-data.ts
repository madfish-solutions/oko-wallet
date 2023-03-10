import { ethers } from 'ethers';
import { DAppMethodEnum } from 'shared';

const prepareSignData = (signData: string) => {
  try {
    const parsedData = ethers.utils.toUtf8String(signData);

    return parsedData;
  } catch {
    console.log('failed to parse sign data');

    return signData;
  }
};

const formatMessageToSign = (method: string, signInfo: string[]) => {
  switch (method) {
    case DAppMethodEnum.ETH_PERSONAL_SIGN: {
      return signInfo[0];
    }
    case DAppMethodEnum.ETH_SIGN_TYPED_DATA: {
      return JSON.stringify(signInfo[0]);
    }
    case DAppMethodEnum.ETH_SIGN_TYPED_DATA_V3:
    case DAppMethodEnum.ETH_SIGN_TYPED_DATA_V4: {
      return signInfo[1];
    }
    case DAppMethodEnum.ETH_SIGN: {
      return signInfo[1];
    }
    default: {
      throw Error('method is not acceptable');
    }
  }
};

export const getMessageToSign = (method: string, signInfo: string[]) =>
  prepareSignData(formatMessageToSign(method, signInfo));
