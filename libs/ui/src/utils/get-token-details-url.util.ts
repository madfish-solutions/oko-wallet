import { NetworkTypeEnum } from '../enums/network-type.enum';

export const getTokenDetailsUrl = (value: string, explorerUrl: string, networkType = NetworkTypeEnum.EVM) => {
  const explorerUrlPrefix = networkType === NetworkTypeEnum.EVM ? '/token/' : '';

  return `${explorerUrl}${explorerUrlPrefix}${value}`;
};
