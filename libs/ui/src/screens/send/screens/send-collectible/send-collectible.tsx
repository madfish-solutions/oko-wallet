import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import isEmpty from 'lodash/isEmpty';
import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import { CollectibleImage } from '../../../../components/collectible-image/collectible-image';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Text } from '../../../../components/text/text';
import { ErrorField } from '../../../../components/text-input/components/error-field/error-field';
import { Label } from '../../../../components/text-input/components/label/label';
import { TextInput } from '../../../../components/text-input/text-input';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useAllAccountsWithoutSelectedSelector } from '../../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../../styles/format-size';
import { checkIsErc721Collectible } from '../../../../utils/check-is-erc721-collectible.util';
import { GasTokenWarning } from '../../components/gas-token-warning/gas-token-warning';
import { SendButton } from '../../components/send-button/send-button';
import { TransferBetweenMyAccounts } from '../../components/transfer-between-my-accounts/transfer-between-my-accounts';
import { useSendForm } from '../../hooks/use-send-form.hook';
import { useValidateAmountField } from '../../hooks/use-validate-amount-field.hook';
import { FormTypes } from '../../types';

import { styles } from './send-collectible.styles';

const COLLECTIBLE_IMAGE_SIZE = getCustomSize(11.75);

export const SendCollectible: FC = () => {
  const [isFocusedInput, setIsFocusedInput] = useState(false);
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SendCollectible>>();
  const allAccountsWithoutSelected = useAllAccountsWithoutSelectedSelector();

  const defaultValues: FormTypes = {
    token: params?.token,
    amount: '1',
    receiverPublicKeyHash: '',
    account: allAccountsWithoutSelected[0],
    isTransferBetweenAccounts: false
  };

  const methods = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
    clearErrors
  } = methods;
  const token = watch('token');
  const account = watch('account');

  const amountRules = useValidateAmountField(token?.balance?.data ?? '0');

  const isCollectibleSelected = isDefined(token);
  const isErc721 = isCollectibleSelected ? checkIsErc721Collectible(token) : false;
  const isSendButtonDisabled = !isEmpty(errors);
  const isAmountInputError = isNotEmptyString(errors?.amount?.message);

  const onSubmit = useSendForm({ params, account, setValue, trigger, clearErrors, token });

  useEffect(() => {
    if (isCollectibleSelected) {
      setValue('amount', '1');
    }
  }, [token?.tokenAddress, token?.tokenId]);

  const navigateToNftSelectors = () => {
    clearErrors('amount');
    navigate(ScreensEnum.SendCollectiblesSelector, { token });
  };

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle
          title={`Send ${isCollectibleSelected ? token.name : ''}`}
          onBackButtonPress={goBack}
          numberOfLines={1}
          titleStyle={styles.screenTitle}
        />
      </HeaderContainer>

      <ScreenScrollView>
        <GasTokenWarning />

        <View>
          <Label title="Collectible" />
          <Row
            style={[
              styles.container,
              isFocusedInput && styles.focusedContainer,
              isDefined(errors?.amount?.message) && styles.errorContainer
            ]}
          >
            <Row style={styles.nftWrapper}>
              <CollectibleImage
                artifactUri={token?.artifactUri}
                pixelShitSize={60}
                size={COLLECTIBLE_IMAGE_SIZE}
                style={[styles.nftImage, !isDefined(token?.artifactUri) && styles.shitIcon]}
              />
              <View style={styles.flex1}>
                <Row style={styles.availableAmountContainer}>
                  <Pressable onPress={navigateToNftSelectors}>
                    <Row style={[styles.nftNameContainer, !isCollectibleSelected && styles.noNftContainer]}>
                      <Text numberOfLines={1} style={styles.nftName}>
                        {isCollectibleSelected ? token.name : 'Select collectible'}
                      </Text>
                      <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} />
                    </Row>
                  </Pressable>
                  {isCollectibleSelected && (
                    <View style={styles.availableContainer}>
                      <Text style={styles.greyText}>Available</Text>
                      <Text style={styles.availableNumber}>{token.balance.data}</Text>
                    </View>
                  )}
                </Row>
                <View style={styles.amountContainer}>
                  <Controller
                    control={control}
                    rules={amountRules}
                    name="amount"
                    render={({ field }) => (
                      <TextInput
                        field={{ ...field, onBlur: () => setIsFocusedInput(false) }}
                        label="Amount"
                        placeholder="0"
                        inputContainerStyle={styles.amountInputContainer}
                        inputStyle={styles.amountInput}
                        labelContainerStyle={styles.amountLabelContainer}
                        labelTextStyle={styles.amountLabelText}
                        decimals={token?.decimals}
                        keyboardType="number-pad"
                        showClearIcon={false}
                        editable={!isErc721 && isCollectibleSelected}
                        onFocus={() => setIsFocusedInput(true)}
                      />
                    )}
                  />
                </View>
              </View>
            </Row>
          </Row>
          {isAmountInputError && <ErrorField name={errors?.amount?.message} />}
        </View>

        <FormProvider {...methods}>
          <TransferBetweenMyAccounts />
        </FormProvider>
      </ScreenScrollView>

      <SendButton isDisabled={isSendButtonDisabled} onPress={handleSubmit(onSubmit)} />
    </ScreenContainer>
  );
};
