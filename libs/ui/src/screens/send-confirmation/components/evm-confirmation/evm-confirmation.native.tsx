import React, { FC } from 'react';

import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { EvmTransferParams } from '../../types';

import { EvmConfirmationContainer } from './components/evm-confirmation-container/evm-confirmation-container';

interface Props {
  transferParams: EvmTransferParams;
  messageID?: string;
}

export const EvmConfirmation: FC<Props> = ({ transferParams, children }) => {
  const { goBack } = useNavigation();

  return <EvmConfirmationContainer transferParams={transferParams} onDecline={goBack} children={children} />;
};
