import React, { useCallback, useEffect } from 'react';
import { Button, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { tokenMetadata } from '../../constants/token/defaults';
import { TokenMetadataInterface } from '../../interfaces/token';
import { getTokensListAction } from '../../store/tokens/tokens-actions';
import { useTokensListSelector } from '../../store/tokens/tokens-selectors';
import { addTokenMetadataAction } from '../../store/wallet/wallet-actions';
import { useTokensMetadataSelector } from '../../store/wallet/wallet-selectors';

const generateTokenMetadata = (): TokenMetadataInterface => {
  const randomNumber = Math.floor(Math.random() * 999);

  return {
    ...tokenMetadata,
    tokenId: randomNumber
  };
};

export const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const tokensMetadata = useTokensMetadataSelector();
  const tokensList = useTokensListSelector();

  // DEBUGGING
  useEffect(() => {
    console.log("Action: get 'tokensMetadata' with selector =>", JSON.stringify(tokensMetadata, null, 2));
  }, [tokensMetadata]);
  useEffect(() => {
    console.log("Action: get 'tokensList' with selector =>", tokensList);
  }, [tokensList]);

  const handleAddMetadata = useCallback(() => {
    dispatch(addTokenMetadataAction(generateTokenMetadata()));
    console.log("Action: call 'addTokenMetadataAction' dispatch");
  }, [dispatch]);

  const handleGetTokensList = useCallback(() => {
    dispatch(getTokensListAction());
    console.log("Action: call 'getTokensListAction' dispatch");
  }, [dispatch]);

  return (
    <View>
      <NavigationBar />
      <Button title="Action: Add metadata" onPress={handleAddMetadata} />
      <Button title="Action: Get tokens list" onPress={handleGetTokensList} />
    </View>
  );
};
