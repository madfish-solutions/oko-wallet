import Clipboard from '@react-native-clipboard/clipboard';
import { RouteProp, useRoute } from '@react-navigation/native';
import { emptyFn, isDefined, isEmptyString } from '@rnw-community/shared';
import isEmpty from 'lodash/isEmpty';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../../components/button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../../components/button/enums';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Label } from '../../components/text-input/components/label/label';
import { Prompt } from '../../components/text-input/components/prompt/prompt';
import { TextInput } from '../../components/text-input/text-input';
import { Text } from '../../components/text/text';
import { Token } from '../../components/token/token';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { Warning } from '../../components/warning/warning';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useShelter } from '../../hooks/use-shelter.hook';
import { useToast } from '../../hooks/use-toast.hook';
import { AccountInterface } from '../../interfaces/account.interface';
import { Asset } from '../../interfaces/asset.interface';
import { Token as TokenType } from '../../interfaces/token.interface';
import { sendAssetAction } from '../../store/wallet/wallet.actions';
import {
  useAllAccountsWithoutSelectedSelector,
  useSelectedNetworkSelector,
  useSelectedNetworkTypeSelector
} from '../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../store/wallet/wallet.utils';
import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { isMobile } from '../../utils/platform.utils';
import { formatUnits } from '../../utils/units.utils';

import { HeaderSideBalance } from './components/header-side-balance/header-side-balance';
import { SelectedAccount } from './components/selected-account/selected-account';
import { useValidateSendFields } from './hooks/use-validate-send-fields.hook';
import { styles } from './send.styles';
import { FormTypes } from './types';

export const Send: FC = () => {
  const { showWarningToast, showErrorToast } = useToast();
  const { navigate } = useNavigation();
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Send>>();
  const { createHdAccountForNewNetworkType } = useShelter();

  const dispatch = useDispatch();
  const { gasTokenMetadata, gasTokenBalance } = useSelectedNetworkSelector();
  const networkType = useSelectedNetworkTypeSelector();
  const allAccountsWithoutSelected = useAllAccountsWithoutSelectedSelector();
  const { amountRules, receiverPublicKeyHashRules } = useValidateSendFields(networkType);

  const isTransferBetweenAccountsDisabled = allAccountsWithoutSelected.length === 0;

  const defaultValues: FormTypes = {
    asset: { ...gasTokenMetadata, balance: gasTokenBalance } as TokenType,
    amount: '',
    receiverPublicKeyHash: '',
    selectedAccount: allAccountsWithoutSelected[0],
    isTransferBetweenAccounts: false
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
    trigger
  } = useForm({
    mode: 'onChange',
    defaultValues
  });
  const selectedAsset = watch('asset');
  const selectedAccount = watch('selectedAccount');
  const isTransferBetweenAccounts = watch('isTransferBetweenAccounts');
  const isSendButtonDisabled = !isEmpty(errors);

  const addressPlaceholder = networkType === NetworkTypeEnum.EVM ? '0x0000...' : 'tz...';
  const availableBalance = formatUnits(selectedAsset.balance.data, selectedAsset.decimals);

  const onSubmit = ({
    asset: { decimals, tokenAddress, tokenId },
    amount,
    receiverPublicKeyHash,
    isTransferBetweenAccounts,
    selectedAccount
  }: FormTypes) => {
    const isGasTokenZeroBalance = Number(gasTokenBalance.data) === 0;

    if (isGasTokenZeroBalance) {
      return showErrorToast('Not enough gas');
    }

    const assetToSend: Asset = {
      decimals,
      tokenAddress: tokenAddress ?? '',
      tokenId: tokenId ?? ''
    };

    dispatch(
      sendAssetAction.submit({
        asset: assetToSend,
        amount,
        receiverPublicKeyHash:
          isTransferBetweenAccounts && selectedAccount
            ? getPublicKeyHash(selectedAccount, networkType)
            : receiverPublicKeyHash
      })
    );
  };

  const navigateToWallet = () => navigate(ScreensEnum.Wallet);
  const navigateToScanQrCode = () => navigate(ScreensEnum.ScanQrCode);
  const navigateToTokensSelector = () => {
    navigate(ScreensEnum.SendTokensSelector, { selectedAsset });
  };

  const onTransferBetweenAccountsPress = () => {
    if (isTransferBetweenAccountsDisabled) {
      return showWarningToast('Please, add one more account');
    }
    const publicKeyHashOfSelectedAccount = getPublicKeyHash(selectedAccount as AccountInterface, networkType);

    if (!isTransferBetweenAccounts && selectedAccount && isEmptyString(publicKeyHashOfSelectedAccount)) {
      createHdAccountForNewNetworkType(
        selectedAccount,
        networkType,
        selectedAccount => setValue('selectedAccount', selectedAccount),
        false
      );
    }

    clearErrors('receiverPublicKeyHash');
    setValue('isTransferBetweenAccounts', !isTransferBetweenAccounts);
  };

  const onPastePress = async () => {
    setValue('receiverPublicKeyHash', await Clipboard.getString());
    await trigger('receiverPublicKeyHash');
  };

  useEffect(() => {
    if (isDefined(params) && isDefined(params.selectedAccount)) {
      setValue('selectedAccount', params.selectedAccount);
    }

    if (isDefined(params) && isDefined(params.selectedAsset)) {
      setValue('asset', params.selectedAsset);
    }

    if (isDefined(params) && isDefined(params.receiverPublicKeyHash)) {
      setValue('receiverPublicKeyHash', params.receiverPublicKeyHash);
      trigger('receiverPublicKeyHash');
    }
  }, [params]);

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle
          title={`Send ${selectedAsset.symbol}`}
          onBackButtonPress={navigateToWallet}
          numberOfLines={1}
          titleStyle={styles.screenTitle}
        />
        <HeaderSideBalance symbol={selectedAsset.symbol} balance={availableBalance} />
      </HeaderContainer>

      <ScreenScrollView>
        <Warning text={`Needed gas token: ${selectedAsset.symbol}`} style={styles.warning} />
        <Controller
          control={control}
          name="amount"
          rules={amountRules}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Asset"
              placeholder="0.00"
              inputContainerStyle={styles.assetContainer}
              inputStyle={styles.amountInput}
              decimals={selectedAsset.decimals}
              error={errors?.amount?.message}
              keyboardType="numeric"
            >
              <View>
                <Row>
                  <Pressable onPress={navigateToTokensSelector}>
                    <Row>
                      <Token symbol={selectedAsset.symbol} uri={selectedAsset.thumbnailUri} forceHideTokenName />
                      <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} />
                    </Row>
                  </Pressable>
                </Row>
                <Row style={styles.dollarAmountContainer}>
                  <Text style={styles.text}>≈</Text>
                  <Text style={[styles.text, styles.dollarAmount]}>0.00</Text>
                  <Text style={[styles.text]}>$</Text>
                </Row>
              </View>
            </TextInput>
          )}
        />

        <Row style={styles.transferBetweenAccountsContainer}>
          <Pressable onPress={onTransferBetweenAccountsPress}>
            <Row>
              <Icon
                name={
                  isTransferBetweenAccounts ? IconNameEnum.SelectedSquareCheckbox : IconNameEnum.EmptySquareCheckbox
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
        <Prompt
          title={isTransferBetweenAccounts ? 'Your Account to send funds To' : 'Address to send funds To'}
          handlePrompt={emptyFn}
          isInfo
        />
        {isTransferBetweenAccounts && selectedAccount ? (
          <SelectedAccount account={selectedAccount} />
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
      </ScreenScrollView>

      <View style={styles.sendButtonContainer}>
        <Button
          disabled={isSendButtonDisabled}
          onPress={handleSubmit(onSubmit)}
          theme={ButtonThemesEnum.Secondary}
          title="Send"
        />
      </View>
    </ScreenContainer>
  );
};
