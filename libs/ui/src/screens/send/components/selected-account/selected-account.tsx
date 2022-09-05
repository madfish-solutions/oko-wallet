import { isString } from '@rnw-community/shared';
import React, { FC, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IconWithBorder } from '../../../../components/icon-with-border/icon-with-border';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { RobotIcon } from '../../../../components/robot-icon/robot-icon';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { AccountInterface } from '../../../../interfaces/account.interface';
import { ModalGasToken } from '../../../../modals/components/modal-gas-token/modal-gas-token';
import { useSelectedNetworkSelector, useSelectedNetworkTypeSelector } from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { getCustomSize } from '../../../../styles/format-size';
import { shortize } from '../../../../utils/shortize.util';
import { getGasTokenBalance$ } from '../../../../utils/token.utils';

import { styles } from './selected-account.styles';

interface Props {
  account: AccountInterface;
}

export const SelectedAccount: FC<Props> = ({ account }) => {
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
      .subscribe(balance => {
        if (isString(balance)) {
          setBalance(balance);
        }
      });

    return () => subscription.unsubscribe();
  }, [account]);

  const onChangeAccountPress = () => {
    setBalance('0');

    navigate(ScreensEnum.SendAccountsSelector, { account });
  };

  return (
    <View style={styles.root}>
      <Row style={styles.wrapper}>
        <Pressable onPress={onChangeAccountPress}>
          <Row>
            <IconWithBorder>
              <RobotIcon seed={publicKeyHash} />
            </IconWithBorder>
            <View style={styles.nameContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {account.name}
              </Text>
            </View>
            <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} />
          </Row>
        </Pressable>
        <Text style={styles.pkh}>{shortize(publicKeyHash)}</Text>
      </Row>

      <View>
        <Text style={styles.balance}>Gas balance</Text>
        <Row>
          <ModalGasToken balance={balance} metadata={network.gasTokenMetadata} />
        </Row>
      </View>
    </View>
  );
};
