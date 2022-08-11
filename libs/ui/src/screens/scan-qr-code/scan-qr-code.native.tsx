import React, { FC, useState } from 'react';
import { BarCodeReadEvent } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { Button } from '../../components/button/button';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { TernaryScreenContainer } from '../../components/screen-container/ternary-screen-container/ternary-screen-container';
import { Text } from '../../components/text/text';
import { useToast } from '../../hooks/use-toast.hook';
import { useSelectedNetworkTypeSelector } from '../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../styles/format-size';
import { isAddressValid } from '../../utils/is-address-valid.utils';

export const ScanQrCode: FC = () => {
  const { showErrorToast } = useToast();
  const networkType = useSelectedNetworkTypeSelector();
  const [qrCode, setQrCode] = useState('');

  const onSuccessRead = ({ data }: BarCodeReadEvent) => {
    const isValid = isAddressValid(data, networkType);

    if (!isValid) {
      setQrCode('Not Valid');

      return showErrorToast(`${networkType} QR Code not found on the picture.`);
    }

    setQrCode(data);
  };

  const showQrCode = () => setQrCode('');

  return (
    <TernaryScreenContainer screenTitle="Scan QRcode" scrollViewWrapper={false}>
      {qrCode.length === 0 ? (
        <QRCodeScanner
          showMarker
          customMarker={<Icon name={IconNameEnum.QrScanner} size={getCustomSize(25)} />}
          onRead={onSuccessRead}
        />
      ) : (
        <>
          <Text>{qrCode}</Text>
          <Button title="Show QrScanner camera" onPress={showQrCode} />
        </>
      )}
    </TernaryScreenContainer>
  );
};
