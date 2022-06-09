export interface ClientPeerMeta {
  description: string;
  url: string;
  icons: string[];
  name: string;
  ssl?: boolean;
}

export interface WalletConnectSession {
  connected: boolean;
  accounts: string[];
  chainId: number;
  bridge: string;
  key: string;
  clientId: string;
  clientMeta: ClientPeerMeta | null;
  peerId: string;
  peerMeta: ClientPeerMeta | null;
  handshakeId: number;
  handshakeTopic: string;
}
