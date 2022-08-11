import Clipboard from '@react-native-clipboard/clipboard';
import React, { FC, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { HeaderSideTypeEnum } from '../../components/header/enums/header-side-type.enum';
import { SecondaryScreenContainer } from '../../components/screen-container/secondary-screen-container/secondary-screen-container';
import { Text } from '../../components/text/text';
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
    <SecondaryScreenContainer screenTitle="Receive" navigationType={HeaderSideTypeEnum.Swap}>
      <QRCode value={publicKeyHash} />
      <Text>{publicKeyHash}</Text>
      <TouchableOpacity onPress={handleCopyToClipboard}>
        <Text>Copy</Text>
      </TouchableOpacity>
      {isCopied && <Text>Copied!</Text>}
    </SecondaryScreenContainer>
  );
};
