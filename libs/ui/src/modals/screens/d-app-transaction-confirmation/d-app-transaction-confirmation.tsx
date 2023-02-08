import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import { ethers } from 'ethers';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';

import { Text } from '../../../components/text/text';
import { FLOAT_ZERO_STRING } from '../../../constants/defaults';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useClosePopup } from '../../../hooks/use-close-popup';
import { EvmConfirmation } from '../../../screens/send-confirmation/components/evm-confirmation/evm-confirmation';
import { EMPTY_GAS } from '../../../screens/send-confirmation/constants';
import { useAccountTokensSelector, useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { DAppHeader } from '../d-app-connection-confirmation/d-app-header/d-app-header';

import { styles } from './d-app-transaction-confirmation.styles';
import { parseTransactionData } from './d-app-transaction.utils';

export const DAppTransactionConfirmation: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DAppTransactionConfirmation>>();
  const network = useSelectedNetworkSelector();
  const allAvailableTokens = useAccountTokensSelector();
  useClosePopup(params.messageId, params.dAppInfo.origin);

  const transactionData = parseTransactionData(params.transactionInfo.data);

  const permissionNeededToken = allAvailableTokens.find(
    token => token.tokenAddress?.toLowerCase() === params.transactionInfo?.to?.toLowerCase()
  );

  const transferParams = useMemo(() => {
    const getValue = () => {
      if (isDefined(params.transactionInfo.value)) {
        const parsedValue = parseInt(params.transactionInfo?.value.substring(2), 16).toString();

        return ethers.utils.formatUnits(parsedValue, network.gasTokenMetadata.decimals);
      }

      return FLOAT_ZERO_STRING;
    };

    const { data, gas, from, to, value } = params.transactionInfo;

    return {
      asset: {
        decimals: network.gasTokenMetadata.decimals,
        tokenAddress: '',
        tokenId: '',
        symbol: network.gasTokenMetadata.symbol
      },
      receiverPublicKeyHash: params.transactionInfo.to,
      value: getValue(),
      gas: isDefined(gas) ? parseInt(gas, 16) : EMPTY_GAS,
      transactionParams: {
        data,
        from,
        to,
        value
      }
    };
  }, []);

  return (
    <EvmConfirmation transferParams={transferParams} params={params}>
      <DAppHeader favicon={params.dAppInfo.favicon} origin={params.dAppInfo.origin} />

      {transactionData && transactionData.name === 'approve' && (
        <View style={styles.allowanceBlock}>
          <Text style={styles.mainText}>
            Give permission to access your {permissionNeededToken?.symbol ?? 'TOKEN'}?
          </Text>
          <Text style={styles.text}>
            By granting permission, you are allowing the following contract to access your funds
          </Text>
        </View>
      )}
    </EvmConfirmation>
  );
};
