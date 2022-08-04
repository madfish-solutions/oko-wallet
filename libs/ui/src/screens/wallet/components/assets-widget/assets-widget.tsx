import React, { FC, useMemo } from 'react';
import { View } from 'react-native';

import { ButtonWithIcon } from '../../../../components/button-with-icon/button-with-icon';
import { ButtonWithIconSizeEnum, ButtonWithIconThemesEnum } from '../../../../components/button-with-icon/enums';
import { Divider } from '../../../../components/divider/divider';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { AccountToken } from '../../../../components/token/account-token/account-token';
import { GasToken } from '../../../../components/token/gas-token/gas-token';
import { WidgetContainer } from '../../../../components/widget-container/widget-container';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useVisibleAccountTokensSelector } from '../../../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../../../utils/token.utils';

import { styles } from './assets-widget.styles';
import { VISIBLE_TOKENS_NUMBER } from './constants/assets-number';

export const AssetsWidget: FC = () => {
  const { navigate } = useNavigation();
  const accountTokens = useVisibleAccountTokensSelector();
  const visibleAccountTokens = useMemo(() => accountTokens.slice(0, VISIBLE_TOKENS_NUMBER), [accountTokens]);

  const navigateToTokens = () => navigate(ScreensEnum.Tokens);

  return (
    <WidgetContainer style={styles.widgetStyles} iconName={IconNameEnum.Assets} title="Tokens">
      <View style={styles.root}>
        <Row style={styles.upperButtons}>
          <ButtonWithIcon
            title="Swap"
            size={ButtonWithIconSizeEnum.Medium}
            theme={ButtonWithIconThemesEnum.Tertiary}
            leftIcon={IconNameEnum.Swap}
          />
          <Divider />
          <ButtonWithIcon
            title="Top up"
            size={ButtonWithIconSizeEnum.Medium}
            theme={ButtonWithIconThemesEnum.Tertiary}
            rightIcon={IconNameEnum.Topup}
          />
        </Row>
        <GasToken />
        {visibleAccountTokens.map(token => (
          <AccountToken key={getTokenSlug(token.tokenAddress, token.tokenId)} token={token} />
        ))}
        <Row>
          <ButtonWithIcon
            title="Activity"
            size={ButtonWithIconSizeEnum.Medium}
            theme={ButtonWithIconThemesEnum.Tertiary}
            leftIcon={IconNameEnum.Activity}
          />
          <Divider />
          <ButtonWithIcon
            title="View All"
            size={ButtonWithIconSizeEnum.Medium}
            theme={ButtonWithIconThemesEnum.Tertiary}
            rightIcon={IconNameEnum.ArrowRight}
            onPress={navigateToTokens}
          />
        </Row>
      </View>
    </WidgetContainer>
  );
};
