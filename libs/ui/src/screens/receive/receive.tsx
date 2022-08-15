import Clipboard from '@react-native-clipboard/clipboard';
import React, { FC, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Text } from '../../components/text/text';
import { useDelayedEffect } from '../../hooks/use-delayed-effect.hook';
import { useSelectedAccountSelector, useSelectedNetworkTypeSelector } from '../../store/wallet/wallet.selectors';

import { HeaderSwapSide } from './components/header-side-swap/header-side-swap';

export const Receive: FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const selectedAccount = useSelectedAccountSelector();
  const networkType = useSelectedNetworkTypeSelector();

  const publicKeyHash = useMemo(() => selectedAccount.networksKeys[networkType]?.publicKeyHash, [networkType]);

  const handleCopyToClipboard = () => {
    if (typeof publicKeyHash === 'string') {
      Clipboard.setString(publicKeyHash);
      setIsCopied(true);
    }
  };

  useDelayedEffect(() => setIsCopied(false), [isCopied]);

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Receive" />

        <HeaderSwapSide />
      </HeaderContainer>

      <ScreenScrollView>
        <QRCode value={publicKeyHash} />
        <Text>{publicKeyHash}</Text>
        <TouchableOpacity onPress={handleCopyToClipboard}>
          <Text>Copy</Text>
        </TouchableOpacity>
        {isCopied && <Text>Copied!</Text>}
      </ScreenScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
