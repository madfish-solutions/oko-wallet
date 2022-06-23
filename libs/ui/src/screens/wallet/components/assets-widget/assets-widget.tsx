import React, { FC, useMemo } from 'react';
import { View } from 'react-native';

import { Button } from '../../../../components/button/button';
import { Divider } from '../../../../components/divider/divider';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { WidgetContainer } from '../../../../components/widget-container/widget-container';
import { useVisibleAccountTokensSelector } from '../../../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../../../utils/token.utils';

import { styles } from './assets-widget.styles';
import { AccountToken } from './components/account-token/account-token';
import { GasToken } from './components/gas-token/gas-token';

interface Props {
  assetsNumber?: number;
}

export const AssetsWidget: FC<Props> = ({ assetsNumber }) => {
  const accountTokens = useVisibleAccountTokensSelector();
  const visibleAccountTokens = useMemo(
    () => (assetsNumber !== undefined ? accountTokens.slice(0, assetsNumber) : accountTokens),
    [assetsNumber, accountTokens]
  );

  return (
    <WidgetContainer iconName={IconNameEnum.Assets} title="Assets">
      <View style={styles.root}>
        <Row style={styles.upperButtons}>
          <Button title="Swap" leftIcon={IconNameEnum.Swap} />
          <Divider />
          <Button title="Top up" rightIcon={IconNameEnum.Topup} />
        </Row>
        <GasToken />
        {visibleAccountTokens.map(token => (
          <AccountToken key={getTokenSlug(token)} token={token} />
        ))}
        <Row>
          <Button title="Activity" leftIcon={IconNameEnum.Activity} />
          <Divider />
          <Button title="View All" rightIcon={IconNameEnum.ArrowRight} />
        </Row>
      </View>
    </WidgetContainer>
  );
};
