import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import { ethers } from 'ethers';
import React, { FC, useMemo } from 'react';
import { View } from 'react-native';

import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useClosePopup } from '../../../hooks/use-close-popup';
import { EvmConfirmation } from '../../../screens/send-confirmation/components/evm-confirmation/evm-confirmation';
import { useAccountTokensSelector, useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { DAppHeader } from '../d-app-connection-confirmation/d-app-header/d-app-header';

import { styles } from './d-app-transaction-confirmation.styles';

export const DAppTransactionConfirmation: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DAppTransactionConfirmation>>();
  const network = useSelectedNetworkSelector();
  const allAvailableTokens = useAccountTokensSelector();
  useClosePopup(params.messageId);

  const permissionNeededToken = allAvailableTokens.find(token => token.tokenAddress === params.transactionInfo.to);

  const transferParams = useMemo(() => {
    const getValue = () => {
      if (isDefined(params.transactionInfo.value)) {
        const parsedValue = parseInt(params.transactionInfo?.value.substring(2), 16).toString();

        return ethers.utils.formatUnits(parsedValue, network.gasTokenMetadata.decimals);
      }

      return '0.0';
    };

    return {
      asset: {
        decimals: network.gasTokenMetadata.decimals,
        tokenAddress: '',
        tokenId: '',
        symbol: network.gasTokenMetadata.symbol
      },
      receiverPublicKeyHash: params.transactionInfo.to,
      value: getValue(),
      data: params.transactionInfo.data
    };
  }, []);

  return (
    <EvmConfirmation transferParams={transferParams} messageID={params.messageId}>
      <DAppHeader favicon={params.dAppInfo.favicon} origin={params.dAppInfo.origin} />

      {permissionNeededToken && transferParams.value === '0.0' && (
        <View style={styles.allowanceBlock}>
          <Text style={styles.mainText}>Give permission to access your {permissionNeededToken.symbol}?</Text>
          <Text style={styles.text}>
            By granting permission, you are allowing the following contract to access your funds
          </Text>
        </View>
      )}
    </EvmConfirmation>
  );
};
