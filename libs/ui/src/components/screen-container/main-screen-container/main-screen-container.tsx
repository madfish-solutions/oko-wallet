import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { useUnlock } from '../../../hooks/use-unlock.hook';
import { ViewStyleProps } from '../../../interfaces/style.interface';
import { Column } from '../../column/column';
import { HeaderQRCode } from '../../header/components/header-qr-code/header-qr-code';
import { HeaderMainScreen } from '../../header/header-main-screen/header-main-screen';
import { HeaderIconsProps } from '../../header/interfaces/header.interface';
import { NavigationBar } from '../../navigation-bar/navigation-bar';
import { useHeaderAnimation } from '../hooks/use-header-animation.hook';

import { styles } from './main-screen-container.styles';

interface Props extends HeaderIconsProps {
  style?: ViewStyleProps;
}

export const MainScreenContainer: FC<Props> = ({ style, children }) => {
  const { isLocked } = useUnlock();

  const { onScroll, onTouchEnd, changeQrCodeVisibility, contentOffsetY, scrollViewRef } = useHeaderAnimation();

  return (
    <Column style={[styles.root, style]}>
      <HeaderMainScreen changeQrCodeVisibility={changeQrCodeVisibility} />

      <ScrollView
        ref={scrollViewRef}
        onTouchEnd={onTouchEnd}
        onScroll={onScroll}
        scrollEventThrottle={10}
        scrollEnabled={!isLocked}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.qrCodeWrapper}>
          <View style={styles.layout} />
          <HeaderQRCode contentOffsetY={contentOffsetY} />
        </View>
        <View style={[styles.content, styles.contentPadding]}>{children}</View>
      </ScrollView>

      <NavigationBar />
    </Column>
  );
};
