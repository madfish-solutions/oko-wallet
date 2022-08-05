export interface DappConnection {
  chainId: string;
  dappName: string;
  data: Record<string, unknown>;
}

export interface DappConnectionStatus {
  pendingConnection: DappConnection;
  confirmedConnection: DappConnection;
}
