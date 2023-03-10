import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC, useEffect, useRef } from 'react';
import { Animated, Easing, GestureResponderEvent, View } from 'react-native';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';

import { ToastsEnum } from '../../enums/toasts.enums';
import { ToastData } from '../../interfaces/toast.interface';
import { hapticFeedback } from '../../utils/taptic-engine/taptic-engine.util';
import { Column } from '../column/column';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { Text } from '../text/text';
import { TouchableIcon } from '../touchable-icon/touchable-icon';

import { themes } from './constants/themes';
import { styles } from './toast.styles';

interface Props extends Pick<ToastProps, 'message'> {
  type: ToastsEnum;
  onClose?: OnEventFn<GestureResponderEvent>;
  data?: ToastData;
  duration?: number;
}

export const Toast: FC<Props> = ({ message, type, onClose, data, duration }) => {
  const animationController = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isDefined(duration)) {
      Animated.timing(animationController, {
        duration,
        toValue: 1,
        useNativeDriver: false,
        easing: Easing.linear
      }).start();
    }

    hapticFeedback();
  }, []);

  const interpolateWidthValue = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%']
  });

  const isShowTimerLine = isDefined(data) && isDefined(data.isShowTimerLine) ? data.isShowTimerLine : true;

  return (
    <Column style={[styles.root, themes[type].root]}>
      <Row style={styles.container}>
        <Column>
          <Row>
            <Icon iconStyle={styles.icon} name={themes[type].iconName} />
            <Text style={styles.text}>{message}</Text>
          </Row>

          {isDefined(data) && isDefined(data.description) && (
            <View style={styles.description}>
              {typeof data.description === 'string' ? (
                <Text style={styles.descriptionText}>{data.description}</Text>
              ) : (
                data.description
              )}
            </View>
          )}
        </Column>

        <TouchableIcon onPress={onClose} name={IconNameEnum.Close} style={styles.closeButton} />
      </Row>

      {isDefined(duration) && duration > 0 && isShowTimerLine && (
        <View style={styles.timerLine}>
          <Animated.View style={[styles.line, { width: interpolateWidthValue }, themes[type].lineColor]} />
        </View>
      )}
    </Column>
  );
};
