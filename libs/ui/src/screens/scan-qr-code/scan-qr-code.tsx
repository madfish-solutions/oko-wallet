import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

import { Button } from '../../components/button/button';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { Text } from '../../components/text/text';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useToast } from '../../hooks/use-toast.hook';
import { useSelectedNetworkTypeSelector } from '../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../styles/format-size';
import { isAddressValid } from '../../utils/is-address-valid.utils';

import { styles } from './scan-qr-code.styles';

export const ScanQrCode: FC = () => {
  const { goBack } = useNavigation();
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

  useEffect(() => void Camera.requestCameraPermission().then(status => setHasPermission(status === 'authorized')), []);

  useEffect(() => {
    if (qrCodes.length && hasPermission) {
      const [{ displayValue }] = qrCodes;
      const isValid = isAddressValid(displayValue, networkType);

      if (!isValid) {
        setQrCode('Not Valid');
        setHasPermission(false);

        showErrorToast(`${networkType} QR Code not found on the picture.`);
      } else {
        setQrCode(displayValue);
      }
    }
  }, [qrCodes.length]);

  const showQrCodeScanner = () => {
    setQrCode('');
    setHasPermission(true);
  };

  return (
    <ScreenContainer>
      <HeaderContainer style={styles.headerContainer}>
        <ScreenTitle title="Scan QRcode" onBackButtonPress={goBack} />
      </HeaderContainer>

      {isNotEmptyString(qrCode) ? (
        <>
          <Text>{qrCode}</Text>
          <Button title="Show QrScanner camera" onPress={showQrCodeScanner} />
        </>
      ) : (
        <>
          {isCameraAvailable && (
            <View>
              <Camera
                style={styles.camera}
                device={device}
                isActive
                frameProcessor={frameProcessor}
                frameProcessorFps={5}
              />
              <Icon name={IconNameEnum.QrScanner} size={getCustomSize(25)} iconStyle={styles.icon} />
            </View>
          )}
        </>
      )}
    </ScreenContainer>
  );
};