import { OnEventFn } from '@rnw-community/shared';
import React, { Fragment } from 'react';

import { Button } from '../button/button';
import { Divider } from '../divider/divider';
import { Row } from '../row/row';

import { styles } from './fragment-selector.styles';

interface Option<OptionTitle> {
  title: OptionTitle;
  value: string;
}
interface Props<OptionTitle> {
  selectedItem: Option<OptionTitle>;
  onSelect: OnEventFn<Option<OptionTitle>>;
  options: Option<OptionTitle>[];
}

export const FragmentSelector = <OptionTitle extends string>({
  selectedItem,
  onSelect,
  options
}: Props<OptionTitle>) => (
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
