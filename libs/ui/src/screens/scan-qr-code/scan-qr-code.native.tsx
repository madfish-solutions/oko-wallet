import React from 'react';
import { Text } from 'react-native';

// import { View } from 'react-native';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';
// import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
// import { Icon } from '../../components/icon/icon';
// import { IconNameEnum } from '../../components/icon/icon-name.enum';
// import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';

// import { ScreensEnum } from '../../enums/sreens.enum';
// import { useNavigation } from '../../hooks/use-navigation.hook';
// import { usePreviousScreenName } from '../../hooks/use-previous-screen-name.hook';
// import { useToast } from '../../hooks/use-toast.hook';
// import { useSelectedNetworkTypeSelector } from '../../store/wallet/wallet.selectors';
// import { getCustomSize } from '../../styles/format-size';
// import { isAddressValid } from '../../utils/is-address-valid.utils';
import { styles } from './scan-qr-code.styles';

// const qrScannerIconSize = getCustomSize(25);

// eslint-disable-next-line arrow-body-style
export const ScanQrCode = () => {
  // TODO: return camera after fix of this issue https://github.com/mrousavy/react-native-vision-camera/pull/1419
  // const [hasPermission, setHasPermission] = useState(false);
  //
  // const device = useCameraDevices().back;
  // const isCameraAvailable = device != null && hasPermission;
  //
  // const [frameProcessor, qrCodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
  //   checkInverted: true
  // });
  //
  // useEffect(() => void Camera.requestCameraPermission().then(status => setHasPermission(status === 'authorized')), []);
  //
  // const { navigate, goBack } = useNavigation();
  // const previousScreen = usePreviousScreenName();
  //
  // const { showErrorToast } = useToast();
  // const networkType = useSelectedNetworkTypeSelector();
  //
  // useEffect(() => {
  //   const isSendScreen = previousScreen === ScreensEnum.SendToken || previousScreen === ScreensEnum.SendCollectible;
  //
  //   if (qrCodes.length && hasPermission && isSendScreen) {
  //     const receiverPublicKeyHash = qrCodes[0].displayValue;
  //     const isValid = isAddressValid(receiverPublicKeyHash, networkType);
  //
  //     if (!isValid) {
  //       showErrorToast(`${networkType} QR Code not found on the picture.`);
  //
  //       navigate(previousScreen);
  //     } else {
  //       navigate(previousScreen, { receiverPublicKeyHash });
  //     }
  //
  //     return () => setHasPermission(false);
  //   }
  // }, [qrCodes.length]);

  return (
    <ScreenContainer>
      <HeaderContainer style={styles.headerContainer}>
        {/*<ScreenTitle title="Scan QRcode" onBackButtonPress={goBack} />*/}
      </HeaderContainer>

      <Text>Camera is not available until </Text>
      {/*{isCameraAvailable && (*/}
      {/*  <View>*/}
      {/*    <Camera*/}
      {/*      style={styles.camera}*/}
      {/*      device={device}*/}
      {/*      isActive*/}
      {/*      frameProcessor={frameProcessor}*/}
      {/*      frameProcessorFps={5}*/}
      {/*    />*/}
      {/*    <Icon name={IconNameEnum.QrScanner} size={qrScannerIconSize} iconStyle={styles.icon} />*/}
      {/*  </View>*/}
      {/*)}*/}
    </ScreenContainer>
  );
};
