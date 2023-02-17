import React, { FC, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { isMobile } from 'shared';

import { Column } from '../../components/column/column';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Row } from '../../components/row/row';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Text } from '../../components/text/text';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useDelayedEffect } from '../../hooks/use-delayed-effect.hook';
import { useNavigation } from '../../hooks/use-navigation.hook';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../store/wallet/wallet.selectors';
import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { handleSetValueToClipboard } from '../../utils/copy-to-clipboard.util';
import { share } from '../../utils/share.util';

import { styles } from './receive.styles';

export const Receive: FC = () => {
  const { navigate } = useNavigation();
  const [isCopied, setIsCopied] = useState(false);
  const network = useSelectedNetworkSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();

  const navigateToWallet = () => navigate(ScreensEnum.Wallet);
  const copyAddress = () => handleSetValueToClipboard(publicKeyHash);
  const shareAddress = () => share({ message: publicKeyHash });

  useDelayedEffect(() => setIsCopied(false), [isCopied]);

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Receive" onBackButtonPress={navigateToWallet} />
      </HeaderContainer>

      <ScreenScrollView style={styles.root}>
        <Column style={styles.container}>
          <View style={styles.qrCodeWrapper}>
            <QRCode
              value={publicKeyHash !== '' ? publicKeyHash : 'Not generated'}
              size={getCustomSize(20)}
              backgroundColor="transparent"
              color={colors.textGrey1}
            />
          </View>

          <Text style={styles.text}>{`Wallet Address on the ${network.name} Network`}</Text>
          <TouchableOpacity onPress={copyAddress} style={styles.addressWrapper}>
            <Text numberOfLines={2} style={styles.address}>
              {publicKeyHash}
            </Text>
          </TouchableOpacity>
        </Column>

        <Row style={styles.actions}>
          {isMobile && <TouchableIcon name={IconNameEnum.Share} onPress={shareAddress} style={styles.shareIcon} />}
          <TouchableIcon name={IconNameEnum.Copy} onPress={copyAddress} />
        </Row>
      </ScreenScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
