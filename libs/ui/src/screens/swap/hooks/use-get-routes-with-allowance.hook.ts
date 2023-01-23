import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber } from '@ethersproject/bignumber';
import { isDefined } from '@rnw-community/shared';
import { parseUnits } from 'ethers/lib/utils';
import debounce from 'lodash/debounce';
import { useEffect, useState, useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';
import { Alert } from 'react-native';

import { getAmountAndRoutesApi, GetAmountAndRoutesResponse, getDataToSignAllowance } from '../../../api/1inch';
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
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { signEvmData } = useShelter();
  const { chainId, rpcUrl } = useSelectedNetworkSelector();
  const { showErrorToast } = useToast();

  const [routes, setRoutes] = useState<GetAmountAndRoutesResponse['protocols']>();
  const [exchangeRate, setExchangeRate] = useState('----');
  const [allowance, setAllowance] = useState<BigNumber>();
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  const [loadingAllowance, setLoadingAllowance] = useState(false);
  const [loadingDataToSignAllowance, setLoadingDataToSignAllowance] = useState(false);

  const getAllowance = useCallback(({ tokenAddress }: Token) => {
    setLoadingAllowance(true);

    const provider = getDefaultEvmProvider(rpcUrl);
    const contract20 = Erc20Abi__factory.connect(tokenAddress, provider);
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

  const getSwapAmountAndRoutes = useCallback(
    debounce((currentFromToken: Token, currentToToken: Token, currentFromAmount: string) => {
      setLoadingRoutes(true);

      getAmountAndRoutesApi(
        chainId,
        currentFromToken,
        currentToToken,
        parseUnits(currentFromAmount, currentFromToken.decimals).toString()
      )
        .then(response => {
          const currentExchangeRate = formatUnits(response.toTokenAmount, response.toToken.decimals).div(
            formatUnits(response.fromTokenAmount, response.fromToken.decimals)
          );

          setExchangeRate(`1 ${currentFromToken.symbol} = ${currentExchangeRate.toFixed(4)} ${currentToToken.symbol}`);
          setValue('toAmount', getFormattedBalance(response.toTokenAmount, currentToToken.decimals).toString());
          setRoutes(response.protocols);
        })
        .catch(error => showErrorToast({ message: error.response?.data?.description }))
        .finally(() => setLoadingRoutes(false));

      if (currentFromToken.tokenAddress !== GAS_TOKEN_ADDRESS) {
        getAllowance(currentFromToken);
      }
    }, DEBOUNCE_TIME),
    []
  );

  const canGetAmountAndRoutes = isDefined(fromToken) && isDefined(toToken) && Number(fromAmount) > 0;

  const getAmountAndRoutes = useCallback(() => {
    if (canGetAmountAndRoutes) {
      getSwapAmountAndRoutes(fromToken, toToken, fromAmount);
    }
  }, [fromToken?.tokenAddress, toToken?.tokenAddress, fromAmount, canGetAmountAndRoutes]);

  useEffect(() => getAmountAndRoutes(), [getAmountAndRoutes]);

  const approveHandler = () => {
    if (isDefined(fromToken)) {
      setLoadingDataToSignAllowance(true);

      getDataToSignAllowance(chainId, fromToken.tokenAddress)
        .then(data =>
          signEvmData({
            publicKeyHash,
            data,
            rpcUrl,
            successCallback: (txHash: TransactionResponse) => {
              setAllowanceTxHashes(prevHashes => ({ ...prevHashes, [fromToken.tokenAddress]: txHash.hash }));
              setLoadingDataToSignAllowance(false);
            }
          })
        )
        .catch(error => showErrorToast({ message: error.response?.data?.description }))
        .finally(() => setLoadingDataToSignAllowance(false));
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
    loading:
      loadingRoutes || loadingAllowance || loadingDataToSignAllowance || isWaitingForAllowanceTransactionComplete,
    loadingRoutes,
    allowance,
    exchangeRate,
    getAmountAndRoutes,
    onApprovePress,
    canGetAmountAndRoutes,
    routes
  };
};
