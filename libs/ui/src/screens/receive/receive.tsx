import Clipboard from '@react-native-clipboard/clipboard';
import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { useDelayedEffect } from '../../hooks/use-delayed-effect.hook';
import { useSelectedAccountSelector } from '../../store/wallet/wallet.selectors';

export const Receive: FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { publicKeyHash } = useSelectedAccountSelector();

  const handleCopyToClipboard = () => {
    Clipboard.setString(publicKeyHash);
    setIsCopied(true);
  };

  useDelayedEffect(() => setIsCopied(false), [isCopied]);

  return (
    <View>
      <NavigationBar />
      <QRCode value={publicKeyHash} />
      <Text>{publicKeyHash}</Text>
      <TouchableOpacity onPress={handleCopyToClipboard}>
        <Text>Copy</Text>
      </TouchableOpacity>
      {isCopied && <Text>Copied!</Text>}
    </View>
  );
};
