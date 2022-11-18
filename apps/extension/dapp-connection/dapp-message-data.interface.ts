export interface DAppMessageData {
  target: string;
  data: {
    data?: {
      id: string;
      method: string;
      jsonrpc: string;
      params?: any[];
    };
  };
}
