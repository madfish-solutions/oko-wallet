import axios from 'axios';

import { Token } from '../interfaces/token.interface';

import { REFERRER_FEE, REFERRER_ADDRESS } from './constants/1inch-agregator';
import { get1inchTokenAddress } from './utils/get-1inch-token-address.util';

export interface QuoteResponse {
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

const oneInchApiRequest = axios.create({
  baseURL: 'https://api-okowallet.1inch.io/v5.0/'
});

export const quote = (chainId: string, fromToken: Token, toToken: Token, amount: string) =>
  oneInchApiRequest
    .get<QuoteResponse>(`${chainId}/quote`, {
      params: {
        fromTokenAddress: get1inchTokenAddress(fromToken.tokenAddress),
        toTokenAddress: get1inchTokenAddress(toToken.tokenAddress),
        amount,
        fee: REFERRER_FEE
      }
    })
    .then(({ data }) => data);

export const getDataToSignAllowance = (chainId: string, tokenAddress: string) =>
  oneInchApiRequest
    .get<{
      data: string;
      gasPrice: string;
      to: string;
      value: string;
    }>(`${chainId}/approve/transaction`, {
      params: {
        tokenAddress
      }
    })
    .then(({ data }) => data);

export const getDataToSwap = (
  chainId: string,
  publicKeyHash: string,
  fromToken: Token,
  toToken: Token,
  amount: string,
  slippage: string
) =>
  oneInchApiRequest
    .get<{
      tx: {
        from: string;
        to: string;
        data: string;
        value: string;
        gasPrice: string;
        gas: number;
      };
    }>(`${chainId}/swap`, {
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
          tx: { gas, ...restTxParams }
        }
      }) => ({
        gasLimit: gas,
        ...restTxParams
      })
    );
