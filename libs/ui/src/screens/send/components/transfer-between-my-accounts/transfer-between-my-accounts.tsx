import Clipboard from '@react-native-clipboard/clipboard';
import { isDefined, isEmptyString, isNotEmptyString } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { NetworkTypeEnum, isMobile } from 'shared';

import { Button } from '../../../../components/button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../../../../components/button/enums';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { Label } from '../../../../components/text-input/components/label/label';
import { Prompt } from '../../../../components/text-input/components/prompt/prompt';
import { TextInput } from '../../../../components/text-input/text-input';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useToast } from '../../../../hooks/use-toast.hook';
import { useCreateHdAccountForNewNetworkType } from '../../../../shelter/hooks/use-create-hd-account-for-new-network-type.hook';
import {
  useAllAccountsWithoutSelectedSelector,
  useSelectedNetworkTypeSelector
} from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { colors } from '../../../../styles/colors';
import { useValidateAddressField } from '../../hooks/use-validate-address-field.hook';
import { FormTypes } from '../../types';
import { SelectedAccount } from '../selected-account/selected-account';

import { styles } from './transfer-between-my-accounts.styles';

const MAXIMUM_ADDRESS_LENGTH = 64;

export const TransferBetweenMyAccounts: FC = () => {
  const { showWarningToast } = useToast();
  const createHdAccountForNewNetworkType = useCreateHdAccountForNewNetworkType();
  const allAccountsWithoutSelected = useAllAccountsWithoutSelectedSelector();
  const isTransferBetweenAccountsDisabled = allAccountsWithoutSelected.length === 0;
  const networkType = useSelectedNetworkTypeSelector();
  const receiverPublicKeyHashRules = useValidateAddressField(networkType);
  const { navigate } = useNavigation();
  const {
    control,
    setValue,
    formState: { errors },
    clearErrors,
    trigger,
    watch
  } = useFormContext<FormTypes>();
  const isTransferBetweenAccounts = watch('isTransferBetweenAccounts');
  const account = watch('account');

  const addressPlaceholder = networkType === NetworkTypeEnum.EVM ? '0x0000...' : 'tz...';

  const onTransferBetweenAccountsPress = () => {
    if (isTransferBetweenAccountsDisabled) {
      return showWarningToast({ message: 'Please, add one more account' });
    }
    const selectedAccount = account ?? allAccountsWithoutSelected[0];

    if (!isDefined(account)) {
      setValue('account', selectedAccount);
    }
    const publicKeyHashOfSelectedAccount = getPublicKeyHash(selectedAccount, networkType);

    if (!isTransferBetweenAccounts && isEmptyString(publicKeyHashOfSelectedAccount)) {
      createHdAccountForNewNetworkType(
        selectedAccount,
        networkType,
        newAccount => setValue('account', newAccount),
        false
      );
    }

    clearErrors('receiverPublicKeyHash');
    setValue('isTransferBetweenAccounts', !isTransferBetweenAccounts);
  };

  const navigateToScanQrCode = () => navigate(ScreensEnum.ScanQrCode);

  const onPastePress = async () => {
    const copiedText = await Clipboard.getString();

    if (isNotEmptyString(copiedText) && copiedText.length < MAXIMUM_ADDRESS_LENGTH && copiedText !== 'null') {
      setValue('receiverPublicKeyHash', copiedText);
      await trigger('receiverPublicKeyHash');
    }
  };

  return (
    <View style={styles.root}>
      <Row style={styles.transferBetweenAccountsContainer}>
        <Pressable onPress={onTransferBetweenAccountsPress}>
          <Row>
            <Icon
              name={
                isTransferBetweenAccounts
                  ? IconNameEnum.SelectedSquareCheckboxSmall
                  : IconNameEnum.EmptySquareCheckboxSmall
              }
              {...(isTransferBetweenAccountsDisabled && { color: colors.bgGrey5 })}
            />
            <Text style={[styles.transferBetweenAccountsText, isTransferBetweenAccountsDisabled && styles.greyText]}>
              Transfer between my accounts
            </Text>
          </Row>
        </Pressable>
      </Row>

      <Label title={isTransferBetweenAccounts ? 'Account' : 'Address'} />
      <Prompt title={isTransferBetweenAccounts ? 'Select your account to send' : 'Address to send'} />
      {isTransferBetweenAccounts && account ? (
        <SelectedAccount account={account} />
      ) : (
        <Controller
          control={control}
          name="receiverPublicKeyHash"
          rules={receiverPublicKeyHashRules}
          render={({ field }) => (
            <TextInput
              field={field}
              placeholder={addressPlaceholder}
              containerStyle={styles.publicKeyHashContainer}
              inputContainerStyle={styles.publicKeyHashInputContainer}
              inputStyle={styles.publicKeyHashInput}
              multiline
              clearIconStyles={styles.publicKeyHashClearIcon}
              error={errors?.receiverPublicKeyHash?.message}
            >
              {isMobile && (
                <View>
                  <Row style={styles.publicKeyHashFooter}>
                    <TouchableIcon onPress={navigateToScanQrCode} name={IconNameEnum.Qrscan} />
                    <View>
                      <Button
                        title="Paste"
                        onPress={onPastePress}
                        theme={ButtonThemesEnum.Ternary}
                        size={ButtonSizeEnum.Fluid}
                      />
                    </View>
                  </Row>
                </View>
              )}
            </TextInput>
          )}
        />
      )}
    </View>
  );
};
