import { forwardRef } from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle } from 'react-native';

import { StyledTextInputStyles } from './text-input.styles';

type StyledTextInputProps = {
  style?: StyleProp<TextStyle>
};

export const StyledTextInput = forwardRef<TextInput, TextInputProps & StyledTextInputProps>(({
  style,
  ...props
}, ref) => (
  <TextInput 
    ref={ref} 
    autoCapitalize="none"
    multiline={true}
    style={[StyledTextInputStyles.root, style]}
    {...props} 
  />
));
