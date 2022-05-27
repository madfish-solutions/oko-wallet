export interface IClientMeta {
  description: string;
  url: string;
  icons: string[];
  name: string;
}

export interface IWalletConnectSession {
  connected: boolean;
  accounts: string[];
  chainId: number;
  bridge: string;
  key: string;
  clientId: string;
  clientMeta: IClientMeta | null;
  peerId: string;
  peerMeta: IClientMeta | null;
  handshakeId: number;
  handshakeTopic: string;
}

export function getCachedSession(): IWalletConnectSession | null {
  const local = localStorage.getItem('walletconnect');

  let session = null;
  if (local != null) {
    try {
      session = JSON.parse(local);
    } catch (error) {
      throw error;
    }
  }

  return session;
}
