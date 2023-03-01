import axios from 'axios';

import { Token } from '../../interfaces/token.interface';

import { REFERRER_FEE, REFERRER_ADDRESS } from './constants';
import { GetApproveDataResponse, GetQuoteResponse, GetSwapDataResponse, SwapData } from './types';
import { get1inchTokenAddress } from './utils/get-1inch-token-address.util';

const oneInchApiRequest = axios.create({
  baseURL: 'https://api-okowallet.1inch.io/v5.0/'
});

export const getQuote = (chainId: string, fromToken: Token, toToken: Token, amount: string) =>
  oneInchApiRequest
    .get<GetQuoteResponse>(`${chainId}/quote`, {
      params: {
        fromTokenAddress: get1inchTokenAddress(fromToken.tokenAddress),
        toTokenAddress: get1inchTokenAddress(toToken.tokenAddress),
        amount,
        fee: REFERRER_FEE
      }
    })
    .then(({ data }) => data);

export const getApproveData = (chainId: string, tokenAddress: string) =>
  oneInchApiRequest
    .get<GetApproveDataResponse>(`${chainId}/approve/transaction`, {
      params: {
        tokenAddress
      }
    })
    .then(({ data: { data, value, to } }) => ({ data, value, to }));

export const getSwapData = (
  chainId: string,
  publicKeyHash: string,
  fromToken: Token,
  toToken: Token,
  amount: string,
  slippage: string
): Promise<SwapData> =>
  oneInchApiRequest
    .get<GetSwapDataResponse>(`${chainId}/swap`, {
      params: {
        fromAddress: publicKeyHash,
        fromTokenAddress: get1inchTokenAddress(fromToken.tokenAddress),
        toTokenAddress: get1inchTokenAddress(toToken.tokenAddress),
        amount,
        slippage,
        fee: REFERRER_FEE,
        referrerAddress: REFERRER_ADDRESS
      }
    })
    .then(
      ({
        data: {
          tx: { gas, ...restTxParams },
          fromTokenAmount,
          toTokenAmount
        }
      }) => ({
        gasLimit: gas,
        fromTokenAmount,
        toTokenAmount,
        ...restTxParams
      })
    );
