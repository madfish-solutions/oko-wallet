import React, { FC, useMemo } from 'react';
import { View } from 'react-native';

import { ButtonWithIcon } from '../../../../components/button-with-icon/button-with-icon';
import { ButtonWithIconSizeEnum, ButtonWithIconThemesEnum } from '../../../../components/button-with-icon/enums';
import { Divider } from '../../../../components/divider/divider';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { AccountToken } from '../../../../components/token/account-token/account-token';
import { WidgetContainer } from '../../../../components/widget-container/widget-container';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useSortAccountTokensByBalance } from '../../../../hooks/use-sort-tokens-by-balance.hook';
import { TestIDProps } from '../../../../interfaces/test-id.props';
import { Token } from '../../../../interfaces/token.interface';
import { useVisibleAccountTokensAndGasTokenSelector } from '../../../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../../../utils/token.utils';

import { styles } from './assets-widget.styles';
import { VISIBLE_TOKENS_NUMBER } from './constants/assets-number';

export const AssetsWidget: FC<TestIDProps> = ({ testID }) => {
  const { navigate } = useNavigation();
  const accountTokens = useVisibleAccountTokensAndGasTokenSelector();
  const sortedTokens = useSortAccountTokensByBalance(accountTokens);

  const visibleAccountTokens = useMemo(() => sortedTokens.slice(0, VISIBLE_TOKENS_NUMBER), [sortedTokens]);

  const navigateToTokens = () => navigate(ScreensEnum.Tokens);
  const navigateToActivity = () => navigate(ScreensEnum.Activity);
  const navigateToTokenDetails = (token: Token) =>
    navigate(ScreensEnum.Token, { tokenAddress: token.tokenAddress, tokenId: token.tokenId });

  return (
    <WidgetContainer style={styles.root} iconName={IconNameEnum.Assets} title="Tokens" testID={testID}>
      <View style={styles.widgetContainer}>
        {visibleAccountTokens.map(token => (
          <AccountToken
            key={getTokenSlug(token.tokenAddress, token.tokenId)}
            token={token}
            onPress={() => navigateToTokenDetails(token)}
          />
        ))}
        <Row>
          <ButtonWithIcon
            title="Activity"
            size={ButtonWithIconSizeEnum.Medium}
            theme={ButtonWithIconThemesEnum.Tertiary}
            leftIcon={IconNameEnum.ActivitySmall}
            onPress={navigateToActivity}
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
