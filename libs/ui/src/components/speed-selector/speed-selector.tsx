import { OnEventFn } from '@rnw-community/shared';
import React, { Fragment, FC } from 'react';

import { Button } from '../button/button';
import { Divider } from '../divider/divider';
import { Row } from '../row/row';

import { styles } from './speed-selector.styles';

interface Option {
  title: string;
  value: string;
}
interface Props {
  selectedItem: Option;
  onSelect: OnEventFn<Option>;
  options: Option[];
}

export const SpeedSelector: FC<Props> = ({ selectedItem, onSelect, options }) => (
  <Row style={styles.speedContainer}>
    {options.map(({ title, value }, index) => (
      <Fragment key={title}>
        <Button
          title={title}
          onPress={() => onSelect({ title, value })}
          style={[styles.speedItem, selectedItem.value === value && styles.activeSpeedItem]}
          styleText={styles.speedItemText}
        />
        {options.length - 1 !== index && <Divider style={styles.borderRight} />}
      </Fragment>
    ))}
  </Row>
);
