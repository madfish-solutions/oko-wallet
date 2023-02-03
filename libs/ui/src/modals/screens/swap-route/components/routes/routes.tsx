import React, { FC } from 'react';
import { View } from 'react-native';

import { GetQuoteResponse } from '../../../../../api/1inch/types';
import { Text } from '../../../../../components/text/text';
import { TokenMetadata } from '../../../../../interfaces/token-metadata.interface';
import { Token } from '../../../../../interfaces/token.interface';

import { Protocol } from './components/protocol/protocol';
import { SwapRouteItem } from './components/swap-route-item/swap-route-item';
import { styles } from './routes.styles';

interface Props {
  routes: GetQuoteResponse['protocols'];
  tokensMetadata: Record<string, TokenMetadata>;
  fromToken: Token;
}

export const Routes: FC<Props> = ({ routes, tokensMetadata, fromToken }) => (
  <>
    {routes.map((route, routeIndex) => (
      <View key={routeIndex} style={styles.root}>
        {routes.length > 1 && (
          <View>
            <View style={styles.square} />
            <Text style={styles.part}>
              Part: {routeIndex + 1} of {fromToken.symbol}
            </Text>
          </View>
        )}

        {route.map((path, pathIndex) =>
          path.length === 1 ? (
            path.map(({ fromTokenAddress, toTokenAddress, name, part }) => (
              <View key={`${fromTokenAddress}${toTokenAddress}${name}${part}`} style={styles.route}>
                <SwapRouteItem fromToken={tokensMetadata[fromTokenAddress]} toToken={tokensMetadata[toTokenAddress]} />
                <Protocol name={name} />
              </View>
            ))
          ) : (
            <View key={pathIndex} style={styles.route}>
              <SwapRouteItem
                fromToken={tokensMetadata[path[0].fromTokenAddress]}
                toToken={tokensMetadata[path[0].toTokenAddress]}
              />
              {path.map(({ name, part }, index) => (
                <Protocol key={`${name}${part}${index}`} name={name} />
              ))}
            </View>
          )
        )}
      </View>
    ))}
  </>
);
