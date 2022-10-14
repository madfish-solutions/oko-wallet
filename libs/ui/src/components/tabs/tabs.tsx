import React, { FC, Fragment, useCallback, useRef, useState } from 'react';
import { Animated, Easing, GestureResponderEvent, LayoutChangeEvent, Pressable, View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { getCustomSize } from '../../styles/format-size';
import { isAndroid } from '../../utils/platform.utils';
import { Divider } from '../divider/divider';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './tabs.styles';

interface Props {
  values: { id: number; title: string; Component: FC }[];
  tabsStyle?: ViewStyleProps;
}

export const Tabs: FC<Props> = ({ values, tabsStyle }) => {
  const [activeElementId, setActiveElementId] = useState(values[0].id);

  const firstElement = useRef<View | null>(null);

  const offsetXElement = useRef(new Animated.Value(0)).current;

  const [tabsXOffsetForAndroid, setTabsXOffsetForAndroid] = useState<number[]>([]);

  const onTabLayout = (props: LayoutChangeEvent) => {
    const layout = props.nativeEvent.layout;
    setTabsXOffsetForAndroid(prev => [...prev, layout.x]);
  };

  const handleActiveItem = useCallback(
    (id: number, el: GestureResponderEvent) => {
      setActiveElementId(id);
      // @ts-ignore
      el.currentTarget.measure((...props: number[]) => {
        let offsetX;

        if (isAndroid) {
          offsetX = tabsXOffsetForAndroid[id - 1];
        } else {
          offsetX = props[0];
        }

        animatedOffset(offsetX);
      });
    },
    [activeElementId, tabsXOffsetForAndroid]
  );

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
    <View style={styles.root}>
      <Row style={[styles.tabs, tabsStyle]}>
        {values.map(({ id, title }, index) => (
          <Fragment key={id}>
            <Pressable
              ref={el => (index === 0 ? (firstElement.current = el) : null)}
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
