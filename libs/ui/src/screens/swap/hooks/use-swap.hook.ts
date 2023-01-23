import { isDefined } from '@rnw-community/shared';
import { parseUnits } from 'ethers/lib/utils';
import { useState } from 'react';

import { getDataToSwap } from '../../../api/1inch';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useToast } from '../../../hooks/use-toast.hook';
import { Asset } from '../../../interfaces/asset.interface';
import { Token } from '../../../interfaces/token.interface';
import { useSlippageToleranceSelector } from '../../../store/settings/settings.selectors';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';
import { getAmount } from '../../send-confirmation/components/evm-confirmation/utils/get-amount.util';

export const useSwap = (fromToken: Token | undefined, toToken: Token | undefined, fromAmount: string) => {
  const [dataForSwapLoading, setDataForSwapLoading] = useState(false);
  const { navigate } = useNavigation();
  const { chainId } = useSelectedNetworkSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const slippageTolerance = useSlippageToleranceSelector();
  const { showErrorToast } = useToast();

  const onSwapPress = () => {
    if (isDefined(fromToken) && isDefined(toToken)) {
      setDataForSwapLoading(true);

      getDataToSwap(
        chainId,
        publicKeyHash,
        fromToken,
        toToken,
        parseUnits(fromAmount, fromToken.decimals).toString(),
        slippageTolerance
      )
        .then(data =>
          navigate(ScreensEnum.SwapConfirmation, {
            transferParams: {
              receiverPublicKeyHash: data.to,
              value: fromAmount,
              asset: fromToken as Asset,
              dataToSign: { ...data, value: getAmount(fromAmount, fromToken.decimals) },
              gas: data.gasLimit
            }
          })
        )
        .catch(error => showErrorToast({ message: error.response?.data?.description }))
        .finally(() => setDataForSwapLoading(false));
    }
  };

  return { onSwapPress, dataForSwapLoading };
};
