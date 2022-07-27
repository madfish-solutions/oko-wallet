import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAllNetworksSelector } from '../../../../store/wallet/wallet.selectors';
import { useAddTokenFieldsRules } from '../../../hooks/use-validate-add-token-fields.hook copy';
import { AddTokenContainer } from '../components/add-token-container/add-token-container';
import { FormTypes } from '../types/form-types.interface';

const defaultValues = {
  address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  tokenId: '',
  symbol: 'ETH',
  decimals: '18',
  iconUrl: 'https://cdn.sheepfarm.io/nft/decor/img/31001.png'
};

export const EditToken: FC = () => {
  const networks = useAllNetworksSelector();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const resetDynamicFields = () => {
    resetField('symbol');
    resetField('decimals');
    resetField('iconUrl');
  };

  const watchAddressUrl = watch('address');

  useEffect(() => {
    if (!isNotEmptyString(watchAddressUrl.trim())) {
      resetDynamicFields();
    }
  }, [watchAddressUrl]);

  const rules = useAddTokenFieldsRules({
    tokens: networks,
    defaultValues
  });

  const onSubmit = (fields: FormTypes) => {
    console.log('Submit', fields);
  };

  return (
    <AddTokenContainer
      screenTitle="Edit token"
      submitTitle="Save"
      onSubmitPress={handleSubmit(onSubmit)}
      control={control}
      rules={rules}
      errors={errors}
      setValue={setValue}
    />
  );
};
