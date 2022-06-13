import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';

import { TouchableElement } from '../touchable-element/touchable-element';

import { AccountInfo } from './components/account-info/account-info';
import { QRCode } from './components/qr-code/qr-code';
import { Title } from './components/title/title';
import { HeaderStyles } from './header.styles';

export const Header: FC = () => {
  const { canGoBack } = useNavigation();

  return (
    <View style={HeaderStyles.root}>
      <View style={HeaderStyles.wrapper}>
        <TouchableElement onPress={() => null} text="Klaytn" />
        <TouchableElement onPress={() => null} />
      </View>
      {!canGoBack() && (
        <>
          <AccountInfo style={HeaderStyles.accountInfo} />
          <QRCode />
        </>
      )}
      {canGoBack() && <Title text="Title" />}
    </View>
  );
};
