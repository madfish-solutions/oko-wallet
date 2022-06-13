import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { QRCodeStyles } from './qr-code.styles';

export const QRCode: FC = () => (
  // TODO: Add Row
  <View style={QRCodeStyles.root}>
    {/* TODO: Add Column component */}
    <View style={QRCodeStyles.wrapper}>
      <Text style={QRCodeStyles.text}>
        Share this address
        <br />
        for receive <Text style={QRCodeStyles.symbol}>KLAY</Text> tokens
      </Text>
      <Text style={QRCodeStyles.address}>3CKMANUB7yJZ2thT1d5k2srMYq2tdW5rNX</Text>
      <Text style={QRCodeStyles.icon}>CC</Text>
    </View>
    <View style={QRCodeStyles.qrcode} />
  </View>
);
