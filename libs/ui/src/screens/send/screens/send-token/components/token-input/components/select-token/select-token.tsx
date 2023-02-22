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
  navigationKey?: string;
  isReadOnly?: boolean;
  availableBalance?: string;
}

export const SelectToken: FC<Props> = ({ token, navigationKey, isReadOnly = false, availableBalance }) => {
  const { navigate } = useNavigation();
  const isSelectable = isDefined(navigationKey);

  const navigateToTokensSelector = () =>
    isSelectable &&
    navigate(ScreensEnum.TokensSelector, {
      token,
      navigationKey
    });

  const isToken = isDefined(token);
  const showAvailableBalance = isDefined(availableBalance) && isToken;

  return (
    <Row style={[styles.root, isReadOnly && styles.readOnlyBlock]}>
      <Pressable onPress={navigateToTokensSelector} disabled={!isSelectable}>
        <Row>
          <Token
            symbol={isToken ? token.symbol : 'Select Token'}
            uri={token?.thumbnailUri}
            forceHideTokenName
            {...(!isToken && { symbolStyle: styles.selectAsset })}
          />

          {isSelectable && <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} />}
        </Row>
      </Pressable>
      {showAvailableBalance && (
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
