import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';

import { Button } from '../../components/button/button';
import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import {
  changeConfirmationScreenStatus,
  deletePendingConnection,
  setConfirmedDapp
} from '../../store/wallet/wallet.actions';
import {
  usePendingDappConnectionSelector,
  useSelectedAccountPublicKeyHashSelector
} from '../../store/wallet/wallet.selectors';

interface Props {
  dappName: string;
}

const CLOSE_DELAY = 1000;

export const DappConfirmation: FC<Props> = ({ dappName }) => {
  const dispatch = useDispatch();
  const selectedAcc = useSelectedAccountPublicKeyHashSelector();
  const dappInfo = usePendingDappConnectionSelector();

  const sendMesg = (obj: unknown) => {
    browser.tabs.query({ active: true }).then(tabs => {
      if (tabs[0].id !== undefined) {
        browser.tabs.sendMessage(tabs[0].id, obj);
        setTimeout(() => {
          window.close();
        }, CLOSE_DELAY);
        dispatch(changeConfirmationScreenStatus(false));
        dispatch(deletePendingConnection(dappName));
        dispatch(setConfirmedDapp(dappInfo[dappName]));
      }
    });
  };

  return (
    <ScreenContainer screenTitle="Connect to Dapp">
      <View>
        <Text>{JSON.stringify(dappInfo)}</Text>
        <Button
          title="confirm"
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
