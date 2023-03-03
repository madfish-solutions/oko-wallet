export interface GetQuoteResponse {
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
  toTokenAmount: string;
  fromTokenAmount: string;
}

export type SwapData = Omit<GetSwapDataResponse['tx'], 'gas'> & {
  gasLimit: number;
  toTokenAmount: string;
  fromTokenAmount: string;
};
