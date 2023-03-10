import React, { FC } from 'react';
import { AccountInterface } from 'shared';

import { IconWithBorderEnum } from '../../../../../../components/icon-with-border/enums';
import { IconWithBorder } from '../../../../../../components/icon-with-border/icon-with-border';
import { RobotIcon } from '../../../../../../components/robot-icon/robot-icon';
import { ScreensEnum } from '../../../../../../enums/sreens.enum';
import { useNavigation } from '../../../../../../hooks/use-navigation.hook';
import { ViewStyleProps } from '../../../../../../interfaces/style.interface';
import { useSelectedNetworkTypeSelector } from '../../../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../../../store/wallet/wallet.utils';
import { getCustomSize } from '../../../../../../styles/format-size';
import { Item } from '../../../../components/item/item';
import { ItemContainer } from '../../../../components/item-container/item-container';
import { Separator } from '../../../../components/separator/separator';

import { styles } from './accounts-list.styles';
import { AccountsListTestIDs } from './accounts-list.test-ids';

interface Props {
  name: string;
  accounts: AccountInterface[];
  style?: ViewStyleProps;
}

export const AccountsList: FC<Props> = ({ name, accounts, style }) => {
  const { navigate } = useNavigation();
  const networkType = useSelectedNetworkTypeSelector();

  const onPressAccount = (publicKeyHash: string) => navigate(ScreensEnum.EditAccount, { publicKeyHash });

  return (
    <>
      {accounts.length > 0 && (
        <ItemContainer title={name} style={[styles.robot, style]}>
          {accounts.map((account, index) => (
            <React.Fragment key={account.accountId}>
              <Item
                title={account.name}
                iconComponent={
                  <IconWithBorder type={IconWithBorderEnum.Ternary} style={styles.robot}>
                    <RobotIcon seed={getPublicKeyHash(account, networkType)} size={getCustomSize(1.8)} />
                  </IconWithBorder>
                }
                onPress={() => onPressAccount(getPublicKeyHash(account, networkType))}
                testID={AccountsListTestIDs.AccountButton}
              />
              {index !== accounts.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </ItemContainer>
      )}
    </>
  );
};
