import React, { FC } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Text } from '../../../../components/text/text';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { ModalActionContainer } from '../../../../modals/components/modal-action-container/modal-action-container';
import { resetApplicationAction } from '../../../../store/root-state.actions';
import { getCustomSize } from '../../../../styles/format-size';

import { styles } from './reset-wallet-confirm.styles';

export const ResetWalletConfirm: FC = () => {
  const { goBack } = useNavigation();
  const dispatch = useDispatch();

  const onReset = () => dispatch(resetApplicationAction.submit());

  return (
    <ModalActionContainer
      screenTitle="Reset Wallet"
      submitTitle="Yes"
      cancelTitle="No"
      onSubmitPress={onReset}
      onCancelPress={goBack}
      style={styles.root}
    >
      <View style={styles.iconContainer}>
        <Icon name={IconNameEnum.IconWarning} size={getCustomSize(12)} />
      </View>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>Are you sure?</Text>
      </View>
      <View style={styles.resetTextContainer}>
        <Text style={styles.resetText}>
          You wanna reset Klaytn Wallet. As a result, all your data will be deleted. Confirm it?
        </Text>
      </View>
    </ModalActionContainer>
  );
};