import React, { FC } from 'react';

import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { TouchableIcon } from '../../../components/touchable-icon/touchable-icon';
import { ViewStyleProps } from '../../../interfaces/style.interface';

import { styles } from './modal-search.styles';

interface Props {
  onPress: () => void;
  style?: ViewStyleProps;
}

export const ModalSearch: FC<Props> = ({ onPress, style }) => (
  <Row style={[styles.root, style]}>
    <TouchableIcon name={IconNameEnum.Search} />
    <TouchableIcon name={IconNameEnum.Add} onPress={onPress} />
  </Row>
);
