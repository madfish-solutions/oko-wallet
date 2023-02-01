import { isDefined } from '@rnw-community/shared';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { FieldPath } from 'react-hook-form/dist/types';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { View } from 'react-native';

import { Button } from '../../../../../../components/button/button';
import { ButtonThemesEnum } from '../../../../../../components/button/enums';
import { TextInput } from '../../../../../../components/text-input/text-input';
import { Token as TokenType } from '../../../../../../interfaces/token.interface';

import { DollarAmount } from './components/dollar-amount/dollar-amount';
import { SelectToken } from './components/select-token/select-token';
import { styles } from './token-input.styles';

interface Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
  label: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  error?: string;
  token?: TokenType;
  amountInDollar: string;
  tokenParam: string;
  availableFormattedBalance?: string;
  availableBalance?: string;
}

export const TokenInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
  error,
  token,
  amountInDollar,
  label,
  availableFormattedBalance,
  tokenParam,
  availableBalance
}: Props<TFieldValues, TName>) => {
  const showMaxButton = isDefined(token) && isDefined(availableBalance);

  const onMaxButtonPress = () => field.onChange(availableBalance);

  return (
    <View>
      <TextInput
        field={field}
        label={label}
        placeholder="0.00"
        inputContainerStyle={styles.assetContainer}
        inputStyle={styles.amountInput}
        decimals={token?.decimals}
        error={error}
        keyboardType="numeric"
        showClearIcon={false}
        editable={isDefined(token)}
      >
        <View>
          <SelectToken token={token} tokenParam={tokenParam} availableBalance={availableFormattedBalance} />
          <DollarAmount amount={field.value} amountInDollar={amountInDollar} />
        </View>
      </TextInput>

      {showMaxButton && (
        <Button title="Max" onPress={onMaxButtonPress} theme={ButtonThemesEnum.Ternary} style={styles.maxButton} />
      )}
    </View>
  );
};
