import { isDefined, isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import React from 'react';
import { Controller, RegisterOptions } from 'react-hook-form';
import { FieldPath } from 'react-hook-form/dist/types';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { Control } from 'react-hook-form/dist/types/form';
import { View } from 'react-native';

import { Button } from '../../../../../../components/button/button';
import { ButtonThemesEnum } from '../../../../../../components/button/enums';
import { Label } from '../../../../../../components/text-input/components/label/label';
import { TextInput } from '../../../../../../components/text-input/text-input';
import { Text } from '../../../../../../components/text/text';
import { ViewStyleProps } from '../../../../../../interfaces/style.interface';
import { Token as TokenType } from '../../../../../../interfaces/token.interface';
import { AnyType } from '../../../../../../utils/memoize.util';

import { DollarAmount } from './components/dollar-amount/dollar-amount';
import { SelectToken } from './components/select-token/select-token';
import { styles } from './token-input.styles';

interface Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
  label: string;
  control: Control<TFieldValues, AnyType>;
  rules?: Pick<RegisterOptions<TFieldValues>, 'required'>;
  error?: string;
  token?: TokenType;
  amountInDollar: string;
  name: TName;
  isReadOnly?: boolean;
  tokenParam: string;
  amount: string;
  availableFormattedBalance?: string;
  errorStyle?: ViewStyleProps;
  selectTokensWithBalance?: boolean;
  onMaxButtonPress?: OnEventFn;
}

export const TokenInput = <TType extends FieldValues & Record<string, AnyType>>({
  control,
  rules,
  error,
  token,
  amountInDollar,
  name,
  label,
  isReadOnly = false,
  selectTokensWithBalance = true,
  availableFormattedBalance,
  tokenParam,
  amount,
  errorStyle,
  onMaxButtonPress
}: Props<TType>) =>
  isReadOnly ? (
    <View>
      <Label title={label} />
      <View style={styles.readOnlyBlock}>
        <View style={styles.readOnlySelect}>
          <SelectToken
            token={token}
            tokenParam={tokenParam}
            isReadOnly={isReadOnly}
            availableBalance={availableFormattedBalance}
            withBalanceTokens={selectTokensWithBalance}
          />
        </View>
        <View style={styles.readOnlyInput}>
          <DollarAmount amount={amount} amountInDollar={amountInDollar} isReadOnly={isReadOnly} />
          <View>
            <Text style={styles.readOnlyAmount}>{isNotEmptyString(amount) ? amount : '0.00'}</Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
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
            errorStyle={errorStyle}
          >
            <View>
              <SelectToken
                token={token}
                tokenParam={tokenParam}
                isReadOnly={isReadOnly}
                availableBalance={availableFormattedBalance}
                withBalanceTokens={selectTokensWithBalance}
              />
              <DollarAmount amount={amount} amountInDollar={amountInDollar} isReadOnly={isReadOnly} />
            </View>
          </TextInput>
        )}
      />
      {isDefined(onMaxButtonPress) && (
        <Button title="Max" onPress={onMaxButtonPress} theme={ButtonThemesEnum.Ternary} style={styles.max} />
      )}
    </View>
  );
