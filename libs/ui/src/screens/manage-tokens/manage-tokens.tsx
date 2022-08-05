import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import { SwitchThemesEnum } from '../../components/switch/enum';
import { Switch } from '../../components/switch/switch';
import { Text } from '../../components/text/text';
import { Token } from '../../components/token/token';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { Token as TokenInterface } from '../../interfaces/token.interface';
import { changeTokenVisibilityAction } from '../../store/wallet/wallet.actions';
import { useAccountTokensSelector, useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../utils/token.utils';

import { styles } from './manage-tokens.styles';

export const ManageTokens: FC = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const accountTokens = useAccountTokensSelector();
  const {
    gasTokenMetadata: { thumbnailUri, symbol, name }
  } = useSelectedNetworkSelector();

  const navigateToEditTokenScreen = (token: TokenInterface) => navigate(ScreensEnum.EditToken, { token });

  const handleTokenVisibility = (token: TokenInterface) => dispatch(changeTokenVisibilityAction(token));

  return (
    <ScreenContainer screenTitle="Edit Token List" contentStyles={styles.root}>
      <Row style={[styles.token, styles.borderBottom]}>
        <Token uri={thumbnailUri} symbol={symbol} name={name} gasToken />
        <Row>
          <TouchableIcon name={IconNameEnum.Edit} disabled style={[styles.editIcon]} />
          <Row style={styles.switcherContainer}>
            <Text style={styles.status}>Show</Text>
            <Switch theme={SwitchThemesEnum.Primary} isActive disabled />
          </Row>
        </Row>
      </Row>
      {accountTokens.map((token, i) => (
        <Row
          key={getTokenSlug(token.tokenAddress, token.tokenId)}
          style={[styles.token, i !== accountTokens.length - 1 && styles.borderBottom]}
        >
          <Token uri={token.thumbnailUri} symbol={token.symbol} name={token.name} forceNameVisibility />
          <Row>
            <TouchableIcon
              onPress={() => navigateToEditTokenScreen(token)}
              name={IconNameEnum.Edit}
              style={styles.editIcon}
            />
            <Row style={styles.switcherContainer}>
              <Text style={styles.status}>{token.isVisible ? 'Show' : 'Hide'}</Text>
              <Switch
                onPress={() => handleTokenVisibility(token)}
                theme={SwitchThemesEnum.Primary}
                isActive={token.isVisible}
              />
            </Row>
          </Row>
        </Row>
      ))}
    </ScreenContainer>
  );
};
