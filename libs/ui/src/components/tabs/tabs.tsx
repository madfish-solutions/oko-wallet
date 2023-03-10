import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, GestureResponderEvent, LayoutChangeEvent, Pressable, View } from 'react-native';
import { isAndroid } from 'shared';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { getCustomSize } from '../../styles/format-size';
import { Divider } from '../divider/divider';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { AccountAddingMethodsTestIDs } from './tabs-test-ids';
import { styles } from './tabs.styles';

interface Props {
  values: { id: number; title: string; Component: FC }[];
  tabsStyle?: ViewStyleProps;
  activeItemId?: number;
  activeItemCallback?: OnEventFn<number>;
}

export const Tabs: FC<Props> = ({ values, tabsStyle, activeItemId, activeItemCallback }) => {
  const [activeElementId, setActiveElementId] = useState(isDefined(activeItemId) ? activeItemId : values[0].id);

  const [tabsXOffsetForAndroid, setTabsXOffsetForAndroid] = useState<number[]>([]);
  const tabRef = useRef<View | null>(null);
  const offsetXElement = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isDefined(activeItemId)) {
      setActiveElementId(activeItemId);
    }
  }, [activeItemId]);

  useEffect(() => {
    isDefined(tabRef.current)
      ? tabRef.current.measure((...props: number[]) => {
          let offsetX = props[0];

          if (isAndroid) {
            offsetX = tabsXOffsetForAndroid[activeElementId - 1];
          }

          if (isDefined(offsetX)) {
            animatedOffset(offsetX, 0);
          }
        })
      : null;
  }, [tabRef, isAndroid, tabsXOffsetForAndroid]);

  const onTabLayout = (props: LayoutChangeEvent) => {
    const layout = props.nativeEvent.layout;
    setTabsXOffsetForAndroid(prev => [...prev, layout.x]);
  };

  const handleActiveItem = useCallback(
    (id: number, el: GestureResponderEvent) => {
      setActiveElementId(id);
      activeItemCallback?.(id);

      // @ts-ignore
      el.currentTarget.measure((...props: number[]) => {
        let offsetX = props[0];

        if (isAndroid) {
          offsetX = tabsXOffsetForAndroid[id - 1];
        }

        animatedOffset(offsetX);
      });
    },
    [tabsXOffsetForAndroid]
  );

  const animatedOffset = (toValue: number, duration?: number) => animated(offsetXElement, toValue, duration);

  const animated = (animatedValue: Animated.Value, toValue: number, duration = 200) =>
    Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: false,
      easing: Easing.linear
    }).start();

  const ActiveComponent = values[activeElementId - 1].Component;

  return (
    <View style={styles.root}>
      <Row style={[styles.tabs, tabsStyle]}>
        {values.map(({ id, title }, index) => (
          <Fragment key={id}>
            <Pressable
              testID={AccountAddingMethodsTestIDs.MethodButton}
              ref={el => (index === (activeElementId - 1 ?? 0) ? (tabRef.current = el) : null)}
              onLayout={onTabLayout}
              onPress={el => handleActiveItem(id, el)}
              style={styles.element}
            >
              <Text style={[styles.text, activeElementId === id && styles.active]}>{title}</Text>
            </Pressable>
            {values.length - 1 !== index && <Divider style={styles.divider} />}
          </Fragment>
        ))}
        <Animated.View
          style={[styles.border, { width: getCustomSize(4), transform: [{ translateX: offsetXElement }] }]}
        />
      </Row>

      <View style={styles.component}>
        <ActiveComponent />
      </View>
    </View>
  );
};
