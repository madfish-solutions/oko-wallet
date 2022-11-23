import { RouteProp, useRoute } from '@react-navigation/native';
import isEmpty from 'lodash/isEmpty';
import React, { FC } from 'react';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { TextInput } from '../../../../components/text-input/text-input';
import { Text } from '../../../../components/text/text';
import { Token } from '../../../../components/token/token';
import { GAS_TOKEN_ADDRESS } from '../../../../constants/defaults';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useToast } from '../../../../hooks/use-toast.hook';
import { Asset } from '../../../../interfaces/asset.interface';
import { useTokensMarketInfoSelector } from '../../../../store/tokens-market-info/token-market-info.selectors';
import { sendAssetAction } from '../../../../store/wallet/wallet.actions';
import {
  useAllAccountsWithoutSelectedSelector,
  useGasTokenSelector,
  useSelectedNetworkSelector,
  useSelectedNetworkTypeSelector
} from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { getCustomSize } from '../../../../styles/format-size';
import { getDollarValue } from '../../../../utils/get-dollar-amount.util';
import { getTokenMetadataSlug } from '../../../../utils/token-metadata.util';
import { getFormattedBalance } from '../../../../utils/units.utils';
import { GasTokenWarning } from '../../components/gas-token-warning/gas-token-warning';
import { SendButton } from '../../components/send-button/send-button';
import { TransferBetweenMyAccounts } from '../../components/transfer-between-my-accounts/transfer-between-my-accounts';
import { useSend } from '../../hooks/use-send.hook';
import { useValidateAmountField } from '../../hooks/use-validate-amount-field.hook';
import { FormTypes } from '../../types';

import { HeaderSideBalance } from './components/header-side-balance/header-side-balance';
import { styles } from './send-token.styles';

export const SendToken: FC = () => {
  const { showErrorToast } = useToast();
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SendToken>>();

  const dispatch = useDispatch();
  const allTokensMarketInfoSelector = useTokensMarketInfoSelector();
  const { chainId } = useSelectedNetworkSelector();
  const gasToken = useGasTokenSelector();
  const networkType = useSelectedNetworkTypeSelector();
  const allAccountsWithoutSelected = useAllAccountsWithoutSelectedSelector();

  const defaultValues: FormTypes = {
    token: gasToken,
    amount: '',
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
    trigger
  } = methods;
  const token = watch('token');
  const account = watch('account');
  const amount = watch('amount');

  useSend({ params, account, setValue, trigger });

  const isSendButtonDisabled = !isEmpty(errors);

  const { price } = allTokensMarketInfoSelector[getTokenMetadataSlug(chainId, token.tokenAddress, token.tokenId)] ?? {};
  const availableBalance = getFormattedBalance(token.balance.data, token.decimals);
  const availableUsdBalance = getDollarValue({
    amount: availableBalance,
    decimals: token.decimals,
    price,
    isNeedToFormat: false
  });
  const amountInDollar = getDollarValue({
    amount,
    decimals: token.decimals,
    price,
    errorValue: '0.00',
    isNeedToFormat: false
  });

  const amountRules = useValidateAmountField(availableBalance);

  const onSubmit = ({
    token: { decimals, tokenAddress, tokenId },
    amount,
    receiverPublicKeyHash,
    isTransferBetweenAccounts,
    account
  }: FormTypes) => {
    const isGasTokenZeroBalance = Number(gasToken.balance.data) === 0;

    if (isGasTokenZeroBalance) {
      showErrorToast('Not enough gas');
    } else {
      const assetToSend: Asset = {
        decimals,
        tokenAddress: tokenAddress === GAS_TOKEN_ADDRESS ? '' : tokenAddress,
        tokenId: tokenId ?? '',
        symbol: token.symbol
      };

      dispatch(
        sendAssetAction.submit({
          asset: assetToSend,
          amount,
          receiverPublicKeyHash:
            isTransferBetweenAccounts && account ? getPublicKeyHash(account, networkType) : receiverPublicKeyHash
        })
      );
    }
  };
  const navigateToTokensSelector = () => navigate(ScreensEnum.SendTokensSelector, { token });

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle
          title={`Send ${token.symbol}`}
          onBackButtonPress={goBack}
          numberOfLines={1}
          titleStyle={styles.screenTitle}
        />
        <HeaderSideBalance symbol={token.symbol} balance={availableBalance} usdBalance={availableUsdBalance} />
      </HeaderContainer>

      <ScreenScrollView>
        <GasTokenWarning />
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
              decimals={token.decimals}
              error={errors?.amount?.message}
              keyboardType="numeric"
              showClearIcon={false}
            >
              <View>
                <Row>
                  <Pressable onPress={navigateToTokensSelector}>
                    <Row>
                      <Token symbol={token.symbol} uri={token.thumbnailUri} forceHideTokenName />
                      <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} />
                    </Row>
                  </Pressable>
                </Row>
                <Row style={styles.dollarAmountContainer}>
                  <Text style={styles.text}>≈</Text>
                  <Text style={[styles.text, styles.dollarAmount]}>{amountInDollar}</Text>
                  <Text style={styles.text}>$</Text>
                </Row>
              </View>
            </TextInput>
          )}
        />
        <FormProvider {...methods}>
          <TransferBetweenMyAccounts />
        </FormProvider>
      </ScreenScrollView>

      <SendButton onPress={handleSubmit(onSubmit)} isDisabled={isSendButtonDisabled} />
    </ScreenContainer>
  );
};
