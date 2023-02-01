import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { BigNumber } from 'bignumber.js';
import isEmpty from 'lodash/isEmpty';
import React, { FC, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { REFERRER_FEE } from '../../api/1inch/constants';
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
import { Text } from '../../components/text/text';
import { getValueWithMaxNumberOfDecimals } from '../../components/text-input/utils/get-value-with-max-number-of-decimals.util';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useToast } from '../../hooks/use-toast.hook';
import { useTokenFiatBalance } from '../../hooks/use-token-fiat-balance.hook';
import {
  approveAllowanceAction,
  loadQuoteAction,
  loadSwapDataAction,
  loadTokenAllowanceAction,
  resetSwapAction
} from '../../store/swap/swap.actions';
import {
  useAllowanceSelector,
  useExchangeRateSelector,
  useOutputAmountSelector,
  useRoutesSelector,
  useShowLoadingOnSwapScreenSelector,
  useSlippageToleranceSelector,
  useSwapDataSelector
} from '../../store/swap/swap.selectors';
import { useGasTokenSelector } from '../../store/wallet/wallet.selectors';
import { checkIsGasToken } from '../../utils/check-is-gas-token.util';
import { isWeb } from '../../utils/platform.utils';
import { parseUnits } from '../../utils/units.utils';
import { useValidateAmountField } from '../send/hooks/use-validate-amount-field.hook';
import { ReadOnlyTokenInput } from '../send/screens/send-token/components/read-only-token-input/read-only-token-input';
import { TokenInput } from '../send/screens/send-token/components/token-input/token-input';

import { Timer } from './components/timer/timer';
import { styles } from './swap.styles';
import { FormTypes } from './types';

export const Swap: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Swap>>();
  const { navigate, goBack } = useNavigation();
  const { showErrorToast } = useToast();
  const dispatch = useDispatch();
  const gasToken = useGasTokenSelector();
  const slippageTolerance = useSlippageToleranceSelector();
  const allowance = useAllowanceSelector();
  const outputAmount = useOutputAmountSelector();
  const routes = useRoutesSelector();
  const exchangeRate = useExchangeRateSelector();
  const swapData = useSwapDataSelector();

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
    formState: { errors }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const fromToken = watch('fromToken');
  const toToken = watch('toToken');
  const fromAmount = watch('fromAmount');
  const toAmount = watch('toAmount');

  const fromTokenBalance = useTokenFiatBalance(fromAmount, fromToken, true);
  const toTokenBalance = useTokenFiatBalance(toAmount, toToken, true);

  const fromTokenRules = useValidateAmountField(fromTokenBalance.availableBalance, true);
  const showLoading = useShowLoadingOnSwapScreenSelector(fromToken?.tokenAddress);

  const isApproveSwapButtonDisabled = !isEmpty(errors);
  const canGetAmountAndRoutes = isDefined(fromToken) && isDefined(toToken) && Number(fromAmount) > 0;
  const showNavigationBar = !isDefined(fromToken) || !isDefined(toToken) || fromAmount === '';
  const numberOfRoutes = routes.data?.flat(1)?.length;
  const isGasToken = isDefined(fromToken) && checkIsGasToken(fromToken.tokenAddress);

  const isNeedToApprove =
    isDefined(fromToken) && !isGasToken && new BigNumber(allowance.data).lt(parseUnits(fromAmount, fromToken.decimals));

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

  const getAmountAndRoutes = useCallback(() => {
    if (canGetAmountAndRoutes) {
      dispatch(loadQuoteAction.submit({ fromToken, toToken, amount: fromAmount }));
    }
  }, [fromToken?.tokenAddress, toToken?.tokenAddress, fromAmount]);

  useEffect(() => void dispatch(resetSwapAction()), []);

  useEffect(() => {
    if (isDefined(fromToken) && !isGasToken) {
      dispatch(loadTokenAllowanceAction.submit(fromToken.tokenAddress));
    }
  }, [fromToken?.tokenAddress]);

  useEffect(() => getAmountAndRoutes(), [getAmountAndRoutes]);

  useEffect(() => setValue('toAmount', outputAmount.data), [outputAmount.data]);

  useEffect(() => {
    if (isNotEmptyString(swapData.error)) {
      showErrorToast({ message: 'Oops', data: { description: swapData.error } });
      dispatch(loadSwapDataAction.fail(''));
    }

    if (isNotEmptyString(routes.error)) {
      showErrorToast({ message: 'Oops', data: { description: routes.error } });
      dispatch(loadQuoteAction.fail(''));
    }
  }, [routes.error, swapData.error]);

  const navigateToSlippageTolerance = () => navigate(ScreensEnum.SlippageTolerance);
  const navigateToSwapRoute = () =>
    isDefined(fromToken) &&
    isDefined(toToken) &&
    routes.data.length &&
    !routes.isLoading &&
    navigate(ScreensEnum.SwapRoute, { routes: routes.data, fromToken, toToken });

  const swapTokenOrder = () => {
    setValue('fromAmount', toAmount);
    setValue('toAmount', fromAmount);
    setValue('fromToken', toToken);
    setValue('toToken', fromToken);

    clearErrors();
  };

  const onApprovePress = () => {
    const approveHandler = () => isDefined(fromToken) && dispatch(approveAllowanceAction.submit({ fromToken }));
    const question = `Give permission to access your ${fromToken?.symbol}?`;

    if (isWeb) {
      if (confirm(question)) {
        approveHandler();
      }
    } else {
      Alert.alert(question, 'By granting permission, you are allowing the following contract to access your funds', [
        {
          text: 'Decline',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: approveHandler
        }
      ]);
    }
  };

  const onSwapPress = () =>
    isDefined(fromToken) &&
    isDefined(toToken) &&
    dispatch(loadSwapDataAction.submit({ fromToken, toToken, amount: fromAmount, slippageTolerance }));

  const onApproveOrSwapPress = () => {
    if (showLoading) {
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
          {canGetAmountAndRoutes && <Timer getAmountAndRoutes={getAmountAndRoutes} routes={routes.data} />}
          <TouchableIcon name={IconNameEnum.Slider} onPress={navigateToSlippageTolerance} />
        </View>
      </HeaderContainer>

      <ScreenScrollView>
        <Controller
          control={control}
          name="fromAmount"
          rules={fromTokenRules}
          render={({ field }) => (
            <TokenInput
              field={field}
              label="From"
              token={fromToken}
              amountInDollar={fromTokenBalance.amountInDollar}
              availableBalance={fromTokenBalance.availableBalance}
              tokenParam="fromToken"
              availableFormattedBalance={fromTokenBalance.availableFormattedBalance}
              error={errors.fromAmount?.message}
            />
          )}
        />

        <View style={styles.swapIcon}>
          <TouchableIcon name={IconNameEnum.Swap} onPress={swapTokenOrder} />
        </View>

        <ReadOnlyTokenInput
          label="To"
          token={toToken}
          amount={toAmount}
          amountInDollar={toTokenBalance.amountInDollar}
          availableFormattedBalance={toTokenBalance.availableFormattedBalance}
          tokenParam="toToken"
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
          <Text numberOfLines={1} style={[styles.numbers13, styles.exchangeRate]}>
            {isNotEmptyString(exchangeRate.data) ? exchangeRate.data : '----'}
          </Text>
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
