export const getHexChanId = (chainId: string) => `0x${Number(chainId).toString(16)}`;

export const createDAppNotificationResponse = <T>(method: string, params: T) => ({
  data: {
    data: {
      method,
      params
    },
    name: 'oko-provider'
  },
  target: 'oko-inpage'
});
