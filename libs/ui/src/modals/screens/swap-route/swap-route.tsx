import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { LayoutChangeEvent, ScrollView, View } from 'react-native';

import { Button } from '../../../components/button/button';
import { LoaderSizeEnum } from '../../../components/loader/enums';
import { Loader } from '../../../components/loader/loader';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { Token } from '../../../components/token/token';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { getCustomSize } from '../../../styles/format-size';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { Routes } from './components/routes/routes';
import { VerticalLine } from './components/vertical-line/vertical-line';
import { useGetTokens } from './hooks/use-get-tokens';
import { styles } from './swap-route.styles';

export const SwapRoute: FC = () => {
  const [contentHeight, setContentHeight] = useState(getCustomSize(12));
  const { goBack } = useNavigation();
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SwapRoute>>();
  const { loading, tokens } = useGetTokens(params);

  const handleLayout = (event: LayoutChangeEvent) =>
    setContentHeight(event.nativeEvent.layout.height - getCustomSize(3));

  return (
    <ModalContainer screenTitle="Route">
      <View style={styles.root}>
        {loading ? (
          <View style={styles.loader}>
            <Loader size={LoaderSizeEnum.Large} />
          </View>
        ) : (
          <ScrollView style={styles.content}>
            <View onLayout={handleLayout}>
              <VerticalLine height={contentHeight} />
              <Row style={styles.fromToken}>
                <Row>
                  <View style={styles.triangle} />
                  <Token symbol={params.fromToken.symbol} uri={params.fromToken?.thumbnailUri} forceHideTokenName />
                </Row>

                <Text style={styles.destination}>From</Text>
              </Row>
              <Routes routes={params.routes} tokens={tokens} fromToken={params.fromToken} />
              <Row style={styles.toToken}>
                <Row>
                  <View style={styles.triangle} />
                  <Token symbol={params.toToken.symbol} uri={params.toToken?.thumbnailUri} forceHideTokenName />
                </Row>
                <Text style={styles.destination}>To</Text>
              </Row>
            </View>
          </ScrollView>
        )}

        <View style={styles.button}>
          <Button title="Close" onPress={goBack} />
        </View>
      </View>
    </ModalContainer>
  );
};
