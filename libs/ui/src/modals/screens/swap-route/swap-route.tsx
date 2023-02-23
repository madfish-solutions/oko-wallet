import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

import { LoaderSizeEnum } from '../../../components/loader/enums';
import { Loader } from '../../../components/loader/loader';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { Token } from '../../../components/token/token';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { getCustomSize } from '../../../styles/format-size';
import { ModalActionContainer } from '../../components/modal-action-container/modal-action-container';

import { Routes } from './components/routes/routes';
import { VerticalLine } from './components/vertical-line/vertical-line';
import { useGetRouteTokensMetadata } from './hooks/use-get-route-tokens-metadata';
import { styles } from './swap-route.styles';

export const SwapRoute: FC = () => {
  const [contentHeight, setContentHeight] = useState(getCustomSize(12));
  const { goBack } = useNavigation();
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SwapRoute>>();
  const { loading, tokensMetadata } = useGetRouteTokensMetadata(params);

  const handleLayout = (event: LayoutChangeEvent) =>
    setContentHeight(event.nativeEvent.layout.height - getCustomSize(3));

  return (
    <ModalActionContainer
      screenTitle="Route"
      buttonTitle="Close"
      onPress={goBack}
      contentContainerStyle={loading ? styles.root : undefined}
    >
      {loading ? (
        <Loader size={LoaderSizeEnum.Large} style={styles.loader} />
      ) : (
        <View onLayout={handleLayout}>
          <VerticalLine height={contentHeight} />
          <Row style={styles.fromToken}>
            <Row>
              <View style={styles.triangle} />
              <Token symbol={params.fromToken.symbol} uri={params.fromToken?.thumbnailUri} forceHideTokenName />
            </Row>

            <Text style={styles.destination}>From</Text>
          </Row>

          <Routes routes={params.routes} tokensMetadata={tokensMetadata} fromToken={params.fromToken} />

          <Row style={styles.toToken}>
            <Row>
              <View style={styles.triangle} />
              <Token symbol={params.toToken.symbol} uri={params.toToken?.thumbnailUri} forceHideTokenName />
            </Row>

            <Text style={styles.destination}>To</Text>
          </Row>
        </View>
      )}
    </ModalActionContainer>
  );
};
