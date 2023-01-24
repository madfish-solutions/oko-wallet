export interface GetQuoteResponse {
  fromToken: {
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    logoURI: string;
  };
  toToken: {
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    logoURI: string;
  };
  toTokenAmount: string;
  fromTokenAmount: string;
  protocols: {
    name: string;
    part: number;
    fromTokenAddress: string;
    toTokenAddress: string;
  }[][][];
  estimatedGas: number;
}

export interface GetApproveDataResponse {
  data: string;
  gasPrice: string;
  to: string;
  value: string;
}

export interface GetSwapDataResponse {
  tx: {
    from: string;
    to: string;
    data: string;
    value: string;
    gasPrice: string;
    gas: number;
  };
}
