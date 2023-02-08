import { OnEventFn } from '@rnw-community/shared';
import React, { Fragment } from 'react';

import { Button } from '../button/button';
import { Divider } from '../divider/divider';
import { Row } from '../row/row';

import { styles } from './fragment-selector.styles';

interface Option<T> {
  title: T;
  value: string;
}
interface Props<T> {
  selectedItem: Option<T>;
  onSelect: OnEventFn<Option<T>>;
  options: Option<T>[];
}

export const FragmentSelector = <T extends string>({ selectedItem, onSelect, options }: Props<T>) => (
  <Row style={styles.root}>
    {options.map(({ title, value }, index) => (
      <Fragment key={title}>
        <Button
          title={title}
          onPress={() => onSelect({ title, value })}
          style={[styles.item, selectedItem.value === value && styles.activeItem]}
          styleText={styles.itemText}
        />
        {options.length - 1 !== index && <Divider style={styles.borderRight} />}
      </Fragment>
    ))}
  </Row>
);
