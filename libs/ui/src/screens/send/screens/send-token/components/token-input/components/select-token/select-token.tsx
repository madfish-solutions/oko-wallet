import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '../../../../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../../../../components/icon/icon-name.enum';
import { Row } from '../../../../../../../../components/row/row';
import { Text } from '../../../../../../../../components/text/text';
import { Token } from '../../../../../../../../components/token/token';
import { ScreensEnum } from '../../../../../../../../enums/sreens.enum';
import { useNavigation } from '../../../../../../../../hooks/use-navigation.hook';
import { Token as TokenType } from '../../../../../../../../interfaces/token.interface';
import { getCustomSize } from '../../../../../../../../styles/format-size';

import { styles } from './select-token.styles';

interface Props {
  token?: TokenType;
  tokenParam: string;
  isReadOnly: boolean;
  withBalanceTokens: boolean;
  availableBalance?: string;
}

export const SelectToken: FC<Props> = ({ token, tokenParam, isReadOnly, availableBalance, withBalanceTokens }) => {
  const { navigate } = useNavigation();
  const navigateToTokensSelector = () =>
    navigate(ScreensEnum.TokensSelector, { token, field: tokenParam, withBalanceTokens });

  const isToken = isDefined(token);

  return (
    <Row style={[styles.root, isReadOnly && styles.readOnlyBlock]}>
      <Pressable onPress={navigateToTokensSelector}>
        <Row>
          <Token
            symbol={isToken ? token.symbol : 'Select Token'}
            uri={token?.thumbnailUri}
            forceHideTokenName
            {...(!isToken && { symbolStyle: styles.selectAsset })}
          />

          <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} />
        </Row>
      </Pressable>
      {isDefined(availableBalance) && isToken && (
        <View style={styles.availableBalanceBlock}>
          <Text style={styles.availableBalanceText}>Available balance</Text>
          <Row>
            <Text style={styles.availableBalanceNumber}>{availableBalance}</Text>
            <Text style={styles.availableBalanceSymbol} numberOfLines={1}>
              {token.symbol}
            </Text>
          </Row>
        </View>
      )}
    </Row>
  );
};
