import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { browser } from 'webextension-polyfill-ts';

import { Button } from '../../components/button/button';
import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import {
  usePendingDappConnectionSelector,
  useSelectedAccountPublicKeyHashSelector
} from '../../store/wallet/wallet.selectors';

interface Props {
  dappName: string;
}

const CLOSE_DELAY = 1000;

export const ConfirmationDapp: FC<Props> = ({ dappName }) => {
  const selectedAcc = useSelectedAccountPublicKeyHashSelector();
  const dappInfo = usePendingDappConnectionSelector();

  const sendMesg = (obj: unknown) => {
    browser.tabs.query({ active: true }).then(tabs => {
      if (tabs[0].id !== undefined) {
        browser.tabs.sendMessage(tabs[0].id, obj);
        setTimeout(() => {
          window.close();
        }, CLOSE_DELAY);
      }
    });
  };

  return (
    <ScreenContainer screenTitle="Connect to Dapp">
      <View>
        <Text>{JSON.stringify(dappInfo)}</Text>
        <Button
          title="send"
          onPress={() =>
            sendMesg({
              data: { data: { ...dappInfo[dappName].data, result: [selectedAcc] }, name: 'metamask-provider' },
              target: 'metamask-inpage'
            })
          }
        />
      </View>
    </ScreenContainer>
  );
};
