export interface IGasPrice {
  time: number;
  price: number;
}

export interface IGasPrices {
  timestamp: number;
  slow: IGasPrice;
  average: IGasPrice;
  fast: IGasPrice;
}

export interface IParsedTx {
  timestamp: string;
  hash: string;
  from: string;
  to: string;
  nonce: string;
  gasPrice: string;
  gasUsed: string;
  fee: string;
  value: string;
  input: string;
  error: boolean;
  asset: IAssetData;
  operations: ITxOperation[];
}

export interface IAssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
  balance?: string;
}

export interface ITxOperation {
  asset: IAssetData;
  value: string;
  from: string;
  to: string;
  functionName: string;
}
