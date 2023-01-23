import React, { FC } from 'react';
import { View } from 'react-native';

import { QuoteResponse } from '../../../../../api/1inch';
import { Text } from '../../../../../components/text/text';
import { Token as TokenType } from '../../../../../interfaces/token.interface';
import { TokenFromRoute } from '../../types';

import { FromToTokens } from './components/from-to-tokens/from-to-tokens';
import { Protocol } from './components/protocol/protocol';
import { styles } from './routes.styles';

interface Props {
  protocols: QuoteResponse['protocols'];
  tokens: TokenFromRoute;
  fromToken: TokenType;
}

export const Routes: FC<Props> = ({ protocols, tokens, fromToken }) => (
  <>
    {protocols.map((protocol, protocolIndex) => (
      <View key={protocolIndex} style={styles.root}>
        {protocols.length > 1 && (
          <View>
            <View style={styles.square} />
            <Text style={styles.part}>
              Part: {protocolIndex + 1} of {fromToken.symbol}
            </Text>
          </View>
        )}

        {protocol.map((path, pathIndex) =>
          path.length === 1 ? (
            path.map(({ fromTokenAddress, toTokenAddress, name, part }) => (
              <View key={`${fromTokenAddress}${toTokenAddress}${name}${part}`} style={styles.route}>
                <FromToTokens fromToken={tokens[fromTokenAddress]} toToken={tokens[toTokenAddress]} />
                <Protocol name={name} />
              </View>
            ))
          ) : (
            <View key={pathIndex} style={styles.route}>
              <FromToTokens fromToken={tokens[path[0].fromTokenAddress]} toToken={tokens[path[0].toTokenAddress]} />
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
