export const getHexChanId = (chainId: string) => `0x${Number(chainId).toString(16)}`;

export const createDAppNotificationResponse = (chainId: string) => ({
  data: {
    data: {
      method: 'metamask_chainChanged',
      params: {
        chainId: getHexChanId(chainId),
        networkVersion: chainId
      }
    },
    name: 'oko-provider'
  },
  target: 'oko-inpage'
});
