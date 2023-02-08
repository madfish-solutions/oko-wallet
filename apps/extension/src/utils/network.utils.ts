import { INPAGE, PROVIDER } from 'ui/inpage';

export const getHexChanId = (chainId: string) => `0x${Number(chainId).toString(16)}`;

export const createDAppNotificationResponse = <T>(method: string, params: T) => ({
  data: {
    data: {
      method,
      params
    },
    name: PROVIDER
  },
  target: INPAGE
});
