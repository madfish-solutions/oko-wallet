import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

import { Button } from '../../components/button/button';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { TernaryScreenContainer } from '../../components/screen-container/ternary-screen-container/ternary-screen-container';
import { Text } from '../../components/text/text';
import { useToast } from '../../hooks/use-toast.hook';
import { useSelectedNetworkTypeSelector } from '../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../styles/format-size';
import { isAddressValid } from '../../utils/is-address-valid.utils';

import { styles } from './scan-qr-code.styles';

export const ScanQrCode: FC = () => {
  const { showErrorToast } = useToast();
  const networkType = useSelectedNetworkTypeSelector();

  const [qrCode, setQrCode] = useState<string>();
  const [hasPermission, setHasPermission] = useState(false);

  const devices = useCameraDevices();
  const device = devices.back;
  const isCameraAvailable = device != null && hasPermission;

  const [frameProcessor, qrCodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();

      setHasPermission(status === 'authorized');
    })();
  }, []);

  useEffect(() => {
    if (qrCodes.length) {
      const [{ displayValue }] = qrCodes;
      const isValid = isAddressValid(displayValue, networkType);

      if (!isValid) {
        setQrCode('Not Valid');

        showErrorToast(`${networkType} QR Code not found on the picture.`);
      } else {
        setQrCode(displayValue);
      }
    }
  }, [qrCodes]);

  const showQrCodeScanner = () => setQrCode('');

  return (
    <TernaryScreenContainer screenTitle="Scan QRcode" scrollViewWrapper={false}>
      {isNotEmptyString(qrCode) ? (
        <>
          <Text>{qrCode}</Text>
          <Button title="Show QrScanner camera" onPress={showQrCodeScanner} />
        </>
      ) : (
        <>
          {isCameraAvailable && (
            <View style={styles.root}>
              <View style={styles.container}>
                <Camera
                  style={styles.camera}
                  device={device}
                  isActive
                  frameProcessor={frameProcessor}
                  frameProcessorFps={5}
                />
                <Icon name={IconNameEnum.QrScanner} size={getCustomSize(25)} iconStyle={styles.icon} />
              </View>
            </View>
          )}
        </>
      )}
    </TernaryScreenContainer>
  );
};
