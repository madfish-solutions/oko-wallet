export interface DappConnection {
  dappName: string;
  id: string;
}

export interface DappConnectionStatus {
  pendingConnection: DappConnection;
  confirmedConnection: DappConnection;
}
