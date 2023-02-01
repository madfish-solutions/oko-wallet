import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import isEmpty from 'lodash/isEmpty';
import React, { FC, useEffect } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { getValueWithMaxNumberOfDecimals } from '../../../../components/text-input/utils/get-value-with-max-number-of-decimals.util';
import { GAS_TOKEN_ADDRESS } from '../../../../constants/defaults';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useToast } from '../../../../hooks/use-toast.hook';
import { useTokenFiatBalance } from '../../../../hooks/use-token-fiat-balance.hook';
import { Asset } from '../../../../interfaces/asset.interface';
import { sendAssetAction } from '../../../../store/wallet/wallet.actions';
import {
  useAllAccountsWithoutSelectedSelector,
  useGasTokenSelector,
  useSelectedNetworkTypeSelector
} from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { GasTokenWarning } from '../../components/gas-token-warning/gas-token-warning';
import { SendButton } from '../../components/send-button/send-button';
import { TransferBetweenMyAccounts } from '../../components/transfer-between-my-accounts/transfer-between-my-accounts';
import { useSendForm } from '../../hooks/use-send-form.hook';
import { useValidateAmountField } from '../../hooks/use-validate-amount-field.hook';
import { FormTypes } from '../../types';

import { HeaderSideBalance } from './components/header-side-balance/header-side-balance';
import { TokenInput } from './components/token-input/token-input';
import { styles } from './send-token.styles';

export const SendToken: FC = () => {
  const { showErrorToast } = useToast();
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SendToken>>();

  const { goBack } = useNavigation();
  const dispatch = useDispatch();
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
    trigger,
    clearErrors
  } = methods;
  const token = watch('token');
  const account = watch('account');
  const amount = watch('amount');

  useSendForm({ params, account, setValue, trigger, clearErrors, token });

  const { availableBalance, availableUsdBalance, amountInDollar, availableFormattedBalance } = useTokenFiatBalance(
    amount,
    token
  );
  const isTokenSelected = isDefined(token);
  const isSendButtonDisabled = !isEmpty(errors);

  const amountRules = useValidateAmountField(availableBalance);

  useEffect(() => {
    if (isTokenSelected && isNotEmptyString(amount)) {
      setValue('amount', getValueWithMaxNumberOfDecimals(amount, token.decimals));
    }
  }, [token]);

  const onSubmit = (formValue: FormTypes) => {
    const isGasTokenZeroBalance = Number(gasToken.balance.data) === 0;

    if (isGasTokenZeroBalance) {
      return showErrorToast({ message: 'Not enough gas' });
    }

    if (isDefined(formValue.token)) {
      const { decimals, tokenAddress, tokenId, symbol } = formValue.token;
      const assetToSend: Asset = {
        decimals,
        tokenAddress: tokenAddress === GAS_TOKEN_ADDRESS ? '' : tokenAddress,
        tokenId: tokenId ?? '',
        symbol
      };

      dispatch(
        sendAssetAction.submit({
          asset: assetToSend,
          amount: formValue.amount,
          receiverPublicKeyHash:
            formValue.isTransferBetweenAccounts && formValue.account
              ? getPublicKeyHash(formValue.account, networkType)
              : formValue.receiverPublicKeyHash
        })
      );
    }
  };

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle
          title={`Send ${isTokenSelected ? token.symbol : ''}`}
          onBackButtonPress={goBack}
          numberOfLines={1}
          titleStyle={styles.screenTitle}
        />

        {isTokenSelected && (
          <HeaderSideBalance
            symbol={token.symbol}
            balance={availableFormattedBalance}
            usdBalance={availableUsdBalance}
          />
        )}
      </HeaderContainer>

      <ScreenScrollView>
        <GasTokenWarning />
        <Controller
          control={control}
          name="amount"
          rules={amountRules}
          render={({ field }) => (
            <TokenInput
              field={field}
              label="Asset"
              token={token}
              amountInDollar={amountInDollar}
              tokenParam="token"
              error={errors?.amount?.message}
            />
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
