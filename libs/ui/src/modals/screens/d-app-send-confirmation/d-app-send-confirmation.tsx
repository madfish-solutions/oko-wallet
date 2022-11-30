import { RouteProp, useRoute } from '@react-navigation/native';
import { ethers } from 'ethers';
import React, { FC } from 'react';

import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { EvmConfirmation } from '../../../screens/send-confirmation/components/evm-confirmation/evm-confirmation';
import { useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { DAppHeader } from '../d-app-connection-confirmation/d-app-header/d-app-header';

export const DAppSendConfirmation: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DAppSendConfirmation>>();
  const network = useSelectedNetworkSelector();

  let value = '0x';

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

  return (
    <EvmConfirmation transferParams={transferParams} messageID={params.messageId}>
      <DAppHeader favicon={params.dAppInfo.favicon} origin={params.dAppInfo.origin} />
    </EvmConfirmation>
  );
};
