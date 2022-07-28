import React, { FC } from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import { Token } from '../../components/token/token';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { Token as TokenInterface } from '../../interfaces/token.interface';
import { changeTokenVisibilityAction } from '../../store/wallet/wallet.actions';
import { useAccountTokensSelector } from '../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../utils/token.utils';

import { styles } from './manage-tokens.styles';

export const ManageTokens: FC = () => {
  const dispatch = useDispatch();
  const accountTokens = useAccountTokensSelector();

  const handleTokenVisibility = (token: TokenInterface) => dispatch(changeTokenVisibilityAction(token));

  return (
    <ScreenContainer screenTitle="Manage tokens" contentStyles={styles.root}>
      {accountTokens.map((token, i) => (
        <Row key={getTokenSlug(token)} style={[styles.token, i !== accountTokens.length - 1 && styles.borderBottom]}>
          <Token />
          <Row>
            <TouchableIcon name={IconNameEnum.Edit} style={styles.editIcon} />
            <Text>Switcher</Text>
          </Row>
        </Row>
      ))}

      {/* {accountTokens.map(token => (
        <Fragment key={getTokenSlug(token)}>
          <Text>Name: {token.name}</Text>
          <Pressable onPress={() => handleTokenVisibility(token)}>
            <Text>{token.isVisible ? 'Hide' : 'Show'}</Text>
          </Pressable>
        </Fragment>
      ))} */}
    </ScreenContainer>
  );
};
