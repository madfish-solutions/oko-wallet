import { RouteProp, useRoute } from '@react-navigation/native';
import { ethers } from 'ethers';
import React, { FC } from 'react';
import { View } from 'react-native';

import { Text } from '../../..//components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { EvmConfirmation } from '../../../screens/send-confirmation/components/evm-confirmation/evm-confirmation';
import { useAccountTokensSelector, useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { DAppHeader } from '../d-app-connection-confirmation/d-app-header/d-app-header';

import { styles } from './d-app-send-confirmation.styles';

export const DAppSendConfirmation: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DAppSendConfirmation>>();
  const network = useSelectedNetworkSelector();
  const allAvailableTokens = useAccountTokensSelector();

  const permissionNeededToken = allAvailableTokens.find(token => token.tokenAddress === params.transactionInfo.to);

  let value = '0';

  if (params.transactionInfo.value) {
    const parsedValue = parseInt(params.transactionInfo?.value.substring(2), 16).toString();
    value = ethers.utils.formatUnits(parsedValue, network.gasTokenMetadata.decimals);
  }

  const transferParams = {
    asset: {
      decimals: network.gasTokenMetadata.decimals,
      tokenAddress: '',
      tokenId: '',
      symbol: network.gasTokenMetadata.symbol,
      data: params.transactionInfo.data
    },
    receiverPublicKeyHash: params.transactionInfo.to,
    value
  };

  return permissionNeededToken ? (
    <EvmConfirmation transferParams={transferParams} messageID={params.messageId}>
      <DAppHeader favicon={params.dAppInfo.favicon} origin={params.dAppInfo.origin} />

      <View style={styles.allowanceBlock}>
        <Text style={styles.mainText}>Give permission to access your {permissionNeededToken.symbol}?</Text>
        <Text style={styles.text}>
          By granting permission, you are allowing the following contract to access your funds
        </Text>
      </View>
    </EvmConfirmation>
  ) : (
    <EvmConfirmation transferParams={transferParams} messageID={params.messageId}>
      <DAppHeader favicon={params.dAppInfo.favicon} origin={params.dAppInfo.origin} />
    </EvmConfirmation>
  );
};
