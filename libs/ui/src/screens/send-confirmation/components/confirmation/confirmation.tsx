import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable } from 'react-native';

import { NavigationBar } from '../../../../components/navigation-bar/navigation-bar';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Text } from '../../../../components/text/text';
import { NetworkInterface } from '../../../../interfaces/network.interface';
import { getString } from '../../../../utils/get-string.utils';

import { TransactionInfo } from './transaction-info/transaction-info';

interface Props {
  isLoading: boolean;
  transactionHash: string;
  network: NetworkInterface;
  onSend: OnEventFn;
  transferParams?: EvmTransferParams;
  isTransactionLoading: boolean;
}

export const Confirmation: FC<Props> = ({
  children,
  isLoading,
  transactionHash,
  network,
  onSend,
  transferParams,
  isTransactionLoading
}) => (
  <ScreenContainer>
    <HeaderContainer isSelectors>
      <ScreenTitle title="Confirmation" />
    </HeaderContainer>

    <ScreenScrollView>
      {(isLoading || isTransactionLoading) && <Text>Loading...</Text>}
      {!isLoading && (
        <>
          {children}
          {!transactionHash && (
            <Pressable onPress={onSend}>
              <Text>Send</Text>
            </Pressable>
          )}
        </>
      )}
      {!!transactionHash && (
        <TransactionInfo transactionHash={transactionHash} network={network} receiver={getString(transferParams?.to)} />
      )}
    </ScreenScrollView>

    <NavigationBar />
  </ScreenContainer>
);
