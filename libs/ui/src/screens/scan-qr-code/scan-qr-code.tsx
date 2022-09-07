import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useToast } from '../../hooks/use-toast.hook';
import { useSelectedNetworkTypeSelector } from '../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../styles/format-size';
import { isAddressValid } from '../../utils/is-address-valid.utils';

import { styles } from './scan-qr-code.styles';

const qrScannerIconSize = getCustomSize(25);

export const ScanQrCode: FC = () => {
  const { goBack, navigate } = useNavigation();
  const { showErrorToast } = useToast();
  const networkType = useSelectedNetworkTypeSelector();

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
      const [{ displayValue: receiverPublicKeyHash }] = qrCodes;
      const isValid = isAddressValid(receiverPublicKeyHash, networkType);

      if (!isValid) {
        showErrorToast(`${networkType} QR Code not found on the picture.`);

        navigate(ScreensEnum.Send);
      } else {
        navigate(ScreensEnum.Send, { receiverPublicKeyHash });
      }

      return () => setHasPermission(false);
    }
  }, [qrCodes.length]);

  return (
    <ScreenContainer>
      <HeaderContainer style={styles.headerContainer}>
        <ScreenTitle title="Scan QRcode" onBackButtonPress={goBack} />
      </HeaderContainer>

      {isCameraAvailable && (
        <View>
          <Camera
            style={styles.camera}
            device={device}
            isActive
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          <Icon name={IconNameEnum.QrScanner} size={qrScannerIconSize} iconStyle={styles.icon} />
        </View>
      )}
    </ScreenContainer>
  );
};
