import React, { FC, useMemo } from 'react';
import { View } from 'react-native';

import { ButtonWithIcon } from '../../../../components/button-with-icon/button-with-icon';
import { Divider } from '../../../../components/divider/divider';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { WidgetContainer } from '../../../../components/widget-container/widget-container';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useVisibleAccountTokensSelector } from '../../../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../../../utils/token.utils';

import { styles } from './assets-widget.styles';
import { AccountToken } from './components/account-token/account-token';
import { GasToken } from './components/gas-token/gas-token';
import { VISIBLE_TOKENS_NUMBER } from './constants/assets-number';

export const AssetsWidget: FC = () => {
  const { navigate } = useNavigation();
  const accountTokens = useVisibleAccountTokensSelector();
  const visibleAccountTokens = useMemo(() => accountTokens.slice(0, VISIBLE_TOKENS_NUMBER), [accountTokens]);

  const navigateToAccountTokens = () => navigate(ScreensEnum.AccountTokens);

  return (
    <WidgetContainer style={styles.widgetStyles} iconName={IconNameEnum.Assets} title="Assets">
      <View style={styles.root}>
        <Row style={styles.upperButtons}>
          <ButtonWithIcon title="Swap" size="medium" theme="tertiay" leftIcon={IconNameEnum.Swap} />
          <Divider />
          <ButtonWithIcon title="Top up" size="medium" theme="tertiay" rightIcon={IconNameEnum.Topup} />
        </Row>
        <GasToken />
        {visibleAccountTokens.map(token => (
          <AccountToken key={getTokenSlug(token)} token={token} />
        ))}
        <Row>
          <ButtonWithIcon title="Activity" size="medium" theme="tertiay" leftIcon={IconNameEnum.Activity} />
          <Divider />
          <ButtonWithIcon
            title="View All"
            size="medium"
            theme="tertiay"
            rightIcon={IconNameEnum.ArrowRight}
            onPress={navigateToAccountTokens}
          />
        </Row>
      </View>
    </WidgetContainer>
  );
};
