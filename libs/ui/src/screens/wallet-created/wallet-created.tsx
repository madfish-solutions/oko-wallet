import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../../components/button/button';
import { ButtonThemesEnum } from '../../components/button/enums';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Pressable } from '../../components/pressable/pressable';
import { Row } from '../../components/row/row';
import { Text } from '../../components/text/text';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { setIsAnalyticsEnabled } from '../../store/settings/settings.actions';
import { getCustomSize } from '../../styles/format-size';
import { goToTermsOfUse } from '../settings/screens/about-us/utils/go-to-oko-links.utils';

import { styles } from './wallet-created.styles';
import { WalletCreatedTestIds } from './wallet-created.test-ids';

const interpolateConfig = {
  inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
  outputRange: [0, -9, 0, 9, 0, -9, 0]
};
const animationDuration = 400;
const toValueAnimation = 3;

export const WalletCreated: FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [isAnalytics, setIsAnalytics] = useState(true);
  const [isAcceptTerms, setIsAcceptTerms] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const onAnalyticsPress = () => setIsAnalytics(!isAnalytics);
  const onAcceptTermsPress = () => setIsAcceptTerms(!isAcceptTerms);

  const triggerShakeAnimation = useCallback(() => {
    animation.setValue(0);
    Animated.timing(animation, {
      duration: animationDuration,
      toValue: toValueAnimation,
      useNativeDriver: true,
      easing: Easing.bounce
    }).start();
  }, []);

  const interpolated = useMemo(() => animation.interpolate(interpolateConfig), []);

  const navigateWallet = () => {
    if (isAcceptTerms) {
      dispatch(setIsAnalyticsEnabled(isAnalytics));

      return navigate(ScreensEnum.Wallet);
    }

    triggerShakeAnimation();
  };

  return (
    <View style={styles.root}>
      <View style={styles.topBlock}>
        <Icon name={IconNameEnum.Success1} size={getCustomSize(16)} />

        <Text style={styles.title}>Wallet Created!</Text>
        <Text style={styles.description}>Get ready to manage your crypto!</Text>
      </View>

      <View style={styles.bottomBlock}>
        <Pressable onPress={onAnalyticsPress} style={styles.analytics}>
          <Row style={styles.row}>
            <Icon name={isAnalytics ? IconNameEnum.SelectedSquareCheckbox : IconNameEnum.EmptySquareCheckbox} />
            <Text style={styles.text}>Analytics</Text>
          </Row>
        </Pressable>

        <Pressable onPress={onAcceptTermsPress} testID={WalletCreatedTestIds.AcceptTerms}>
          <Animated.View style={[styles.row, styles.acceptTerms, { transform: [{ translateX: interpolated }] }]}>
            <Row>
              <Icon name={isAcceptTerms ? IconNameEnum.SelectedSquareCheckbox : IconNameEnum.EmptySquareCheckbox} />
              <Text style={styles.text}>Accept terms</Text>
            </Row>
            <TouchableIcon name={IconNameEnum.ChevronRight} onPress={goToTermsOfUse} />
          </Animated.View>
        </Pressable>

        <Button
          title="Get started"
          theme={ButtonThemesEnum.Secondary}
          onPress={navigateWallet}
          style={styles.button}
          testID={WalletCreatedTestIds.GetStarted}
        />
      </View>
    </View>
  );
};
