import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { ScreenContainerThemesEnum } from '../../components/screen-components/screen-container/enums';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { useAccountAssetsSelector } from '../../store/wallet/wallet.selectors';

import { AssetsWidget } from './components/assets-widget/assets-widget';
import { CollectiblesWidget } from './components/collectibles/collectibles';
import { Header } from './components/header/header';
import { QrCode } from './components/qr-code/qr-code';
import { useAllUserNft } from './hooks/use-all-user-nft.hook';
import { useHeaderAnimation } from './hooks/use-header-animation.hook';
import { styles } from './wallet.styles';
import { WalletTestIDs } from './wallet.test-ids';

export const Wallet: FC = () => {
  const { isLocked } = useUnlock();
  const { onScroll, onTouchEnd, changeQrCodeVisibility, contentOffsetY, scrollViewRef } = useHeaderAnimation();

  useAllUserNft();

  const allAssets = useAccountAssetsSelector();
  // console.log('allAssets', allAssets);

  return (
    <ScreenContainer theme={ScreenContainerThemesEnum.Secondary}>
      <Header changeQrCodeVisibility={changeQrCodeVisibility} />

      <ScrollView
        ref={scrollViewRef}
        onTouchEnd={onTouchEnd}
        onScroll={onScroll}
        scrollEventThrottle={10}
        scrollEnabled={!isLocked}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <QrCode contentOffsetY={contentOffsetY} />

        <View style={styles.content}>
          <AssetsWidget testID={WalletTestIDs.AssetsWidget} />
          <CollectiblesWidget testID={WalletTestIDs.CollectiblesWidget} />
        </View>
      </ScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
