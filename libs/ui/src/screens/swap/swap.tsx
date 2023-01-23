import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { parseUnits } from 'ethers/lib/utils';
import isEmpty from 'lodash/isEmpty';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { REFERRER_FEE } from '../../api/constants/1inch-agregator';
import { Button } from '../../components/button/button';
import { ButtonThemesEnum } from '../../components/button/enums';
import { Divider } from '../../components/divider/divider';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Pressable } from '../../components/pressable/pressable';
import { Row } from '../../components/row/row';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { getValueWithMaxNumberOfDecimals } from '../../components/text-input/utils/get-value-with-max-number-of-decimals.util';
import { Text } from '../../components/text/text';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { GAS_TOKEN_ADDRESS } from '../../constants/defaults';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useTokenFiatBalance } from '../../hooks/use-token-fiat-balance.hook';
import { useSlippageToleranceSelector } from '../../store/settings/settings.selectors';
import { useGasTokenSelector } from '../../store/wallet/wallet.selectors';
import { useValidateAmountField, isGreaterThanZeroError } from '../send/hooks/use-validate-amount-field.hook';
import { TokenInput } from '../send/screens/send-token/components/token-input/token-input';

import { Timer } from './components/timer/timer';
import { useGetRoutesWithAllowance } from './hooks/use-get-routes-with-allowance.hook';
import { useSwap } from './hooks/use-swap.hook';
import { styles } from './swap.styles';
import { FormTypes } from './types';

export const Swap: FC = () => {
  const { navigate, goBack } = useNavigation();
  const slippageTolerance = useSlippageToleranceSelector();
  const gasToken = useGasTokenSelector();
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Swap>>();

  const defaultValues: FormTypes = {
    fromToken: params?.fromToken ?? gasToken,
    toToken: undefined,
    fromAmount: '',
    toAmount: ''
  };

  const {
    control,
    watch,
    setValue,
    clearErrors,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const fromToken = watch('fromToken');
  const toToken = watch('toToken');
  const fromAmount = watch('fromAmount');
  const toAmount = watch('toAmount');

  const fromTokenBalance = useTokenFiatBalance(fromAmount, fromToken);
  const toTokenBalance = useTokenFiatBalance(toAmount, toToken);

  const fromTokenRules = useValidateAmountField(fromTokenBalance.availableBalance, true);

  const { loading, loadingRoutes, allowance, onApprovePress, protocols, exchangeRate, getRoutes, canGetRoutes } =
    useGetRoutesWithAllowance(fromToken, toToken, fromAmount, setValue);
  const { onSwapPress, dataForSwapLoading } = useSwap(fromToken, toToken, fromAmount);
  const showLoading = loading || dataForSwapLoading;

  const isApproveSwapButtonDisabled = !isEmpty(errors);
  const showNavigationBar = !isDefined(fromToken) || !isDefined(toToken) || fromAmount === '';
  const numberOfRoutes = protocols?.flat(1).length ?? 0;

  const isNeedToApprove =
    isDefined(allowance) &&
    isDefined(fromToken) &&
    fromToken.tokenAddress !== GAS_TOKEN_ADDRESS &&
    isNotEmptyString(fromAmount) &&
    !isNaN(Number(fromAmount)) &&
    allowance.lt(parseUnits(fromAmount, fromToken.decimals));

  useEffect(() => {
    if (isDefined(params) && isDefined(params.fromToken)) {
      if (params.fromToken.tokenAddress === toToken?.tokenAddress) {
        return swapTokenOrder();
      }

      if (isNotEmptyString(fromAmount)) {
        setValue('fromAmount', getValueWithMaxNumberOfDecimals(fromAmount, params.fromToken.decimals));
      }

      setValue('fromToken', params.fromToken);
      clearErrors();
    }

    if (isDefined(params) && isDefined(params.toToken)) {
      if (params.toToken.tokenAddress === fromToken?.tokenAddress) {
        return swapTokenOrder();
      }

      setValue('toToken', params.toToken);
    }
  }, [params]);

  const navigateToSlippageTolerance = () => navigate(ScreensEnum.SlippageTolerance);
  const navigateToSwapRoute = () =>
    isDefined(protocols) &&
    isDefined(fromToken) &&
    isDefined(toToken) &&
    !loadingRoutes &&
    navigate(ScreensEnum.SwapRoute, { protocols, fromToken, toToken });

  const swapTokenOrder = () => {
    setValue('fromAmount', toAmount);
    setValue('toAmount', fromAmount);
    setValue('fromToken', toToken);
    setValue('toToken', fromToken);

    clearErrors();
  };

  const onMaxButtonPress = isDefined(fromToken)
    ? () => {
        setValue('fromAmount', fromTokenBalance.availableBalance);
        trigger('fromAmount');
      }
    : undefined;

  const onApproveOrSwapPress = () => {
    if (loading) {
      return;
    }

    if (isNeedToApprove) {
      return onApprovePress();
    }

    onSwapPress();
  };

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Swap" onBackButtonPress={goBack} />
        <View style={styles.header}>
          {canGetRoutes && <Timer getRoutes={getRoutes} protocols={protocols} />}
          <TouchableIcon name={IconNameEnum.Slider} onPress={navigateToSlippageTolerance} />
        </View>
      </HeaderContainer>

      <ScreenScrollView>
        <TokenInput
          label="From"
          control={control}
          name="fromAmount"
          token={fromToken}
          amountInDollar={fromTokenBalance.amountInDollar}
          tokenParam="fromToken"
          availableFormattedBalance={fromTokenBalance.availableFormattedBalance}
          amount={fromAmount}
          rules={fromTokenRules}
          onMaxButtonPress={onMaxButtonPress}
          error={errors?.fromAmount?.message}
          errorStyle={errors?.fromAmount?.type === isGreaterThanZeroError ? styles.errorFromAmount : undefined}
        />
        <View style={styles.swapIcon}>
          <TouchableIcon name={IconNameEnum.Swap} onPress={swapTokenOrder} />
        </View>
        <TokenInput
          label="To"
          control={control}
          name="toAmount"
          token={toToken}
          amountInDollar={toTokenBalance.amountInDollar}
          isReadOnly
          tokenParam="toToken"
          availableFormattedBalance={toTokenBalance.availableFormattedBalance}
          amount={toAmount}
        />

        <Row style={styles.routeBlock}>
          <Text style={styles.route}>Route</Text>
          {numberOfRoutes > 0 ? (
            <Pressable onPress={navigateToSwapRoute}>
              <Text style={styles.routesText}>
                {numberOfRoutes} step{numberOfRoutes === 1 ? '' : 's'} in the route
              </Text>
            </Pressable>
          ) : (
            <Text style={styles.swapFirst}>Select tokens to swap first</Text>
          )}
        </Row>
        <Row style={styles.routingFeeBlock}>
          <Text style={styles.caption11}>Routing Fee</Text>
          <Text style={styles.numbers13}>{REFERRER_FEE} %</Text>
        </Row>
        <Row style={styles.exchangeRateBlock}>
          <Text style={styles.caption11}>Exchange rate</Text>
          <Text style={styles.numbers13}>{exchangeRate}</Text>
        </Row>

        <Divider style={styles.divider} />

        <Row style={styles.slippageToleranceBlock}>
          <Text style={styles.caption11}>Slippage Tolerance</Text>
          <Text style={styles.slippageToleranceNumber}>{slippageTolerance} %</Text>
        </Row>
      </ScreenScrollView>

      {showNavigationBar ? (
        <NavigationBar />
      ) : (
        <View style={styles.swapButton}>
          <Button
            title={isNeedToApprove ? `Approve ${fromToken?.symbol}` : 'Swap'}
            onPress={handleSubmit(onApproveOrSwapPress)}
            disabled={isApproveSwapButtonDisabled}
            theme={ButtonThemesEnum.Secondary}
            loading={showLoading}
          />
        </View>
      )}
    </ScreenContainer>
  );
};
