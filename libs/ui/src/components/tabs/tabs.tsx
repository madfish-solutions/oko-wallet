import { isDefined } from '@rnw-community/shared';
import React, { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, GestureResponderEvent, Pressable, View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { Divider } from '../divider/divider';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './tabs.styles';

interface Props {
  values: string[];
  style?: ViewStyleProps;
}

export const Tabs: FC<Props> = ({ values, style }) => {
  const [activeElement, setActiveElement] = useState(values[0]);

  const firstElement = useRef<View | null>(null);

  const widthElement = useRef(new Animated.Value(0)).current;
  const offsetXElement = useRef(new Animated.Value(0)).current;

  // get first item width when component mount and add to border width
  useEffect(() => {
    if (isDefined(firstElement) && firstElement.current) {
      firstElement.current.measure((...params: number[]) => {
        const width = params[2];
        widthElement.setValue(width ?? 0);
      });
    }
  }, []);

  const handleActiveItem = useCallback(
    (value: string, el: GestureResponderEvent) => {
      setActiveElement(value);
      // @ts-ignore
      el.currentTarget.measure(setBorderParams);
    },
    [activeElement]
  );

  const setBorderParams = (...props: number[]) => {
    const offsetX = props[0];
    const width = props[2];

    animatedOffset(offsetX);
    animatedWidth(width);
  };

  const animatedWidth = (toValue: number) => animated(widthElement, toValue);

  const animatedOffset = (toValue: number) => animated(offsetXElement, toValue);

  const animated = (animatedValue: Animated.Value, toValue: number) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.linear
    }).start();

  return (
    <Row style={[styles.root, style]}>
      {values.map((value, index) => (
        <Fragment key={value}>
          <Pressable
            ref={el => (index === 0 ? (firstElement.current = el) : null)}
            onPress={el => handleActiveItem(value, el)}
            style={styles.element}
          >
            <Text style={[styles.text, activeElement === value && styles.active]}>{value}</Text>
          </Pressable>
          {values.length - 1 !== index && <Divider style={styles.divider} />}
        </Fragment>
      ))}
      <Animated.View style={[styles.border, { width: widthElement, transform: [{ translateX: offsetXElement }] }]} />
    </Row>
  );
};
