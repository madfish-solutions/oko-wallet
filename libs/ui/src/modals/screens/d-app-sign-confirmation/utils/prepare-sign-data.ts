import { ethers } from 'ethers';

export const prepareSignData = (signData: string) => {
  try {
    const parsedData = ethers.utils.toUtf8String(signData);

    return parsedData;
  } catch {
    console.log('failed to parse sign data');

    return signData;
  }
};
