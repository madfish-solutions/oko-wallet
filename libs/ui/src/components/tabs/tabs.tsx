import { isDefined } from '@rnw-community/shared';
import React, { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, GestureResponderEvent, Pressable, View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { Divider } from '../divider/divider';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './tabs.styles';

interface Props {
  values: { id: number; title: string; Component: FC }[];
  style?: ViewStyleProps;
}

export const Tabs: FC<Props> = ({ values, style }) => {
  const [activeElementId, setActiveElementId] = useState(values[0].id);

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
    (id: number, el: GestureResponderEvent) => {
      setActiveElementId(id);
      // @ts-ignore
      el.currentTarget.measure(setBorderParams);
    },
    [activeElementId]
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

  const ActiveComponent = values[activeElementId - 1].Component;

  return (
    <>
      <Row style={[styles.root, style]}>
        {values.map(({ id, title }, index) => (
          <Fragment key={id}>
            <Pressable
              ref={el => (index === 0 ? (firstElement.current = el) : null)}
              onPress={el => handleActiveItem(id, el)}
              style={styles.element}
            >
              <Text style={[styles.text, activeElementId === id && styles.active]}>{title}</Text>
            </Pressable>
            {values.length - 1 !== index && <Divider style={styles.divider} />}
          </Fragment>
        ))}
        <Animated.View style={[styles.border, { width: widthElement, transform: [{ translateX: offsetXElement }] }]} />
      </Row>
      <View style={styles.component}>
        <ActiveComponent />
      </View>
    </>
  );
};
