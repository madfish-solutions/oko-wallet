import Clipboard from '@react-native-clipboard/clipboard';
import React, { FC, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { HeaderSideTypeEnum } from '../../components/header/enums/header-side-type.enum';
import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import { MainText } from '../../components/text/text';
import { useDelayedEffect } from '../../hooks/use-delayed-effect.hook';
import { useSelectedAccountSelector, useSelectedNetworkTypeSelector } from '../../store/wallet/wallet.selectors';

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
    <ScreenContainer screenTitle="Receive" navigationType={HeaderSideTypeEnum.Swap}>
      <QRCode value={publicKeyHash} />
      <MainText>{publicKeyHash}</MainText>
      <TouchableOpacity onPress={handleCopyToClipboard}>
        <MainText>Copy</MainText>
      </TouchableOpacity>
      {isCopied && <MainText>Copied!</MainText>}
    </ScreenContainer>
  );
};
