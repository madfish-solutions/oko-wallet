import React from 'react';
import RNPickerSelect, { PickerStyle, PickerSelectProps } from 'react-native-picker-select';

type DropdownProps = {
  style?: PickerStyle;
} & PickerSelectProps;

export const Dropdown: React.FC<DropdownProps> = ({ style, ...props }) => {
  return <RNPickerSelect {...props} style={style} />;
};
