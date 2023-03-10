import { isString } from '@rnw-community/shared';
import React, { FC, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountInterface } from 'shared';

import { CopyText } from '../../../../components/copy-text/copy-text';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { IconWithBorderEnum } from '../../../../components/icon-with-border/enums';
import { IconWithBorder } from '../../../../components/icon-with-border/icon-with-border';
import { RobotIcon } from '../../../../components/robot-icon/robot-icon';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { ModalGasToken } from '../../../../modals/components/modal-gas-token/modal-gas-token';
import { useSelectedNetworkSelector, useSelectedNetworkTypeSelector } from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { getCustomSize } from '../../../../styles/format-size';
import { getGasTokenBalance$ } from '../../../../utils/token.utils';

import { styles } from './selected-account.styles';

interface Props {
  account: AccountInterface;
  isDisabled?: boolean;
  style?: ViewStyleProps;
}

export const SelectedAccount: FC<Props> = ({ account, isDisabled = false, style }) => {
  const { navigate } = useNavigation();
  const [balance, setBalance] = useState('0');
  const network = useSelectedNetworkSelector();
  const networkType = useSelectedNetworkTypeSelector();
  const publicKeyHash = getPublicKeyHash(account, networkType);

  useEffect(() => {
    const subscription = getGasTokenBalance$(network, account)
      .pipe(
        catchError(error => {
          console.log('Error:', error);

          return of([]);
        })
      )
      .subscribe(newBalance => isString(newBalance) && setBalance(newBalance));

    return () => subscription.unsubscribe();
  }, [account, network.rpcUrl, network.chainId]);

  const onChangeAccountPress = () => {
    setBalance('0');

    navigate(ScreensEnum.SendAccountsSelector, { account });
  };

  return (
    <View style={[styles.root, style]}>
      <Row style={styles.wrapper}>
        <Pressable onPress={onChangeAccountPress} disabled={isDisabled}>
          <Row>
            <IconWithBorder type={IconWithBorderEnum.Ternary} style={styles.icon}>
              <RobotIcon seed={publicKeyHash} size={getCustomSize(2.25)} />
            </IconWithBorder>
            <View style={styles.nameContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {account.name}
              </Text>
            </View>
            {!isDisabled && <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} />}
          </Row>
        </Pressable>
      </Row>

      <View>
        <Text style={styles.balance}>Gas balance</Text>
        <Row>
          <ModalGasToken balance={balance} metadata={network.gasTokenMetadata} />
          <CopyText text={publicKeyHash} />
        </Row>
      </View>
    </View>
  );
};
