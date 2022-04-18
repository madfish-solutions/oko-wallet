import React from 'react';
import { StyleProp, TextInputProps, TextStyle, View } from 'react-native';

import { SectionStyles } from './from-section.styles';

import { Title } from '../title';
import { StyledTextInput } from '../text-input';

type FormSectionProps = {
  title: string;
  description?: string;
  style?: StyleProp<TextStyle>;
} & TextInputProps;

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  style,
  ...props
}) => {
  return (
    <View style={[SectionStyles.root, style]}>
      <Title 
        description={description}
      >
        {title}
      </Title>
      <StyledTextInput style={SectionStyles.input} {...props} />
    </View>
  )
}
