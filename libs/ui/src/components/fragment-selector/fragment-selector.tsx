import { OnEventFn } from '@rnw-community/shared';
import React, { Fragment, FC } from 'react';

import { Button } from '../button/button';
import { Divider } from '../divider/divider';
import { Row } from '../row/row';

import { styles } from './fragment-selector.styles';

interface Option {
  title: string;
  value: string;
}
interface Props {
  selectedItem: Option;
  onSelect: OnEventFn<Option>;
  options: Option[];
}

export const FragmentSelector: FC<Props> = ({ selectedItem, onSelect, options }) => (
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
