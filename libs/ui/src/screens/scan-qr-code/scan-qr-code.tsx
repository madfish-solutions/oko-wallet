import React from 'react';
import { BarCodeReadEvent } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { usePreviousScreenName } from '../../hooks/use-previous-screen.hook';
import { useToast } from '../../hooks/use-toast.hook';
import { useSelectedNetworkTypeSelector } from '../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../styles/format-size';
import { isAddressValid } from '../../utils/is-address-valid.utils';

import { styles } from './scan-qr-code.styles';

export const ScanQrCode = () => {
  const { navigate, goBack } = useNavigation();
  const previousScreen = usePreviousScreenName();

  const { showErrorToast } = useToast();
  const networkType = useSelectedNetworkTypeSelector();

  const handleRead = ({ data: receiverPublicKeyHash }: BarCodeReadEvent) => {
    const isValidAddress = isAddressValid(receiverPublicKeyHash, networkType);
    const isSendScreen = previousScreen === ScreensEnum.SendToken || previousScreen === ScreensEnum.SendCollectible;

    if (!isSendScreen) {
      return goBack();
    }

    if (isValidAddress) {
      navigate(previousScreen, { receiverPublicKeyHash });
    } else {
      showErrorToast(`${networkType} QR Code not found on the picture.`);

      navigate(previousScreen);
    }
  };

  return (
    <QRCodeScanner
      showMarker
      customMarker={<Icon name={IconNameEnum.QrScanner} size={getCustomSize(25)} iconStyle={styles.icon} />}
      permissionDialogTitle="There is no access to the Camera."
      permissionDialogMessage="Please, give access in the phone Setting page."
      onRead={handleRead}
    />
  );
};
