import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber } from '@ethersproject/bignumber';
import { isDefined } from '@rnw-community/shared';
import { parseUnits } from 'ethers/lib/utils';
import debounce from 'lodash/debounce';
import { useEffect, useState, useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';
import { Alert } from 'react-native';

import { quote, QuoteResponse, getDataToSignAllowance } from '../../../api/1inch';
import { ONE_INCH_ROUTER_ADDRESS } from '../../../api/constants/1inch-agregator';
import { DEBOUNCE_TIME, GAS_TOKEN_ADDRESS } from '../../../constants/defaults';
import { Erc20Abi__factory } from '../../../contract-types';
import { useShelter } from '../../../hooks/use-shelter.hook';
import { useToast } from '../../../hooks/use-toast.hook';
import { Token } from '../../../interfaces/token.interface';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';
import { getDefaultEvmProvider } from '../../../utils/get-default-evm-provider.utils';
import { isWeb } from '../../../utils/platform.utils';
import { formatUnits, getFormattedBalance } from '../../../utils/units.utils';
import { FormTypes } from '../types';

import { useCheckAllowanceTransaction } from './use-check-allowance-transaction.hook';

export const useGetRoutesWithAllowance = (
  fromToken: Token | undefined,
  toToken: Token | undefined,
  fromAmount: string,
  setValue: UseFormSetValue<FormTypes>
) => {
  const { signEvmData } = useShelter();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const [result, setResult] = useState<QuoteResponse>();
  const [exchangeRate, setExchangeRate] = useState('----');
  const [allowance, setAllowance] = useState<BigNumber>();
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  const [loadingAllowance, setLoadingAllowance] = useState(false);
  const [loadingGettingAllowance, setLoadingGettingAllowance] = useState(false);
  const { chainId, rpcUrl } = useSelectedNetworkSelector();
  const { showErrorToast } = useToast();

  const getAllowance = useCallback((fromToken: Token) => {
    setLoadingAllowance(true);

    const provider = getDefaultEvmProvider(rpcUrl);
    const contract20 = Erc20Abi__factory.connect(fromToken.tokenAddress, provider);
    contract20
      .allowance(publicKeyHash, ONE_INCH_ROUTER_ADDRESS)
      .then(setAllowance)
      .finally(() => setLoadingAllowance(false));
  }, []);

  const { isWaitingForAllowanceTransactionComplete, setAllowanceTxHashes } = useCheckAllowanceTransaction(
    fromToken,
    getAllowance,
    setLoadingAllowance
  );

  const getQuote = useCallback(
    debounce(
      (
        chainId: string,
        rpcUrl: string,
        publicKeyHash: string,
        fromToken: Token,
        toToken: Token,
        fromAmount: string
      ) => {
        setLoadingRoutes(true);

        quote(chainId, fromToken, toToken, parseUnits(fromAmount, fromToken.decimals).toString())
          .then(quote => {
            const exchangeRate = formatUnits(quote.toTokenAmount, quote.toToken.decimals).div(
              formatUnits(quote.fromTokenAmount, quote.fromToken.decimals)
            );

            setExchangeRate(`1 ${fromToken.symbol} = ${exchangeRate.toFixed(4)} ${toToken.symbol}`);
            setValue('toAmount', getFormattedBalance(quote.toTokenAmount, toToken.decimals).toString());
            setResult(quote);
          })
          .catch(error => showErrorToast({ message: error.response?.data?.description }))
          .finally(() => setLoadingRoutes(false));

        if (fromToken.tokenAddress !== GAS_TOKEN_ADDRESS) {
          getAllowance(fromToken);
        }
      },
      DEBOUNCE_TIME
    ),
    []
  );

  const canGetRoutes = isDefined(fromToken) && isDefined(toToken) && Number(fromAmount) > 0;

  const getRoutes = useCallback(() => {
    if (canGetRoutes) {
      getQuote(chainId, rpcUrl, publicKeyHash, fromToken, toToken, fromAmount);
    }
  }, [fromToken?.tokenAddress, toToken?.tokenAddress, fromAmount, canGetRoutes]);

  useEffect(() => getRoutes(), [getRoutes]);

  const approveHandler = () => {
    if (isDefined(fromToken)) {
      setLoadingGettingAllowance(true);

      getDataToSignAllowance(chainId, fromToken.tokenAddress)
        .then(data =>
          signEvmData({
            publicKeyHash,
            data,
            rpcUrl,
            successCallback: (txHash: TransactionResponse) => {
              setAllowanceTxHashes(prevHashes => ({ ...prevHashes, [fromToken.tokenAddress]: txHash.hash }));
              setLoadingGettingAllowance(false);
            }
          })
        )
        .catch(error => showErrorToast({ message: error.response?.data?.description }))
        .finally(() => setLoadingGettingAllowance(false));
    }
  };

  const onApprovePress = () => {
    const question = `Give permission to access your ${fromToken?.symbol}?`;

    if (isWeb) {
      if (confirm(question)) {
        approveHandler();
      }
    } else {
      Alert.alert(question, 'By granting permission, you are allowing the following contract to access your funds', [
        {
          text: 'Decline',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: approveHandler
        }
      ]);
    }
  };

  return {
    loading: loadingRoutes || loadingAllowance || loadingGettingAllowance || isWaitingForAllowanceTransactionComplete,
    loadingRoutes,
    allowance,
    exchangeRate,
    getRoutes,
    onApprovePress,
    canGetRoutes,
    ...result
  };
};
