import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { TestScreenStyles } from './test-screen.styles';

import { Button } from '../../app/components/button';
import { NavigationBar } from "../../components/navigation-bar/navigation-bar";
import { addTokenMetadataAction } from '../../store/wallet/wallet-actions';
import { useTokensMetadataSelector } from '../../store/wallet/wallet-selectors';
import { Wrapper } from '../../app/components/wrapper';
import { TokenMetadataInterface } from '../../interfaces/token';
import { tokenMetadata } from '../../constants/token/defaults';
import { useTokensListSelector } from '../../store/tokens/tokens-selectors';
import { getTokensListAction } from '../../store/tokens/tokens-actions';

const generateTokenMetadata = (): TokenMetadataInterface => {
  const randomNumber = Math.floor(Math.random() * 999);
  return {
    ...tokenMetadata,
    tokenId: randomNumber,
  };
};

export const TestScreen: React.FC = () => {
  const dispatch = useDispatch();
  const tokensMetadata = useTokensMetadataSelector();
  const tokensList = useTokensListSelector();

  // DEBUGGING
  useEffect(() => {
    console.log(`Action: get 'tokensMetadata' with selector =>`, tokensMetadata);
  }, [tokensMetadata]);
  useEffect(() => {
    console.log(`Action: get 'tokensList' with selector =>`, tokensList);
  }, [tokensList]);

  const handleAddMetadata = useCallback(() => {
    dispatch(
      addTokenMetadataAction(
        generateTokenMetadata(),
      ),
    );
    console.log(`Action: call 'addTokenMetadataAction' dispatch`);
  }, [dispatch]);

  const handleGetTokensList = useCallback(() => {
    dispatch(
      getTokensListAction(),
    );
    console.log(`Action: call 'getTokensListAction' dispatch`);
  }, [dispatch]);

  return (
    <Wrapper>
      <NavigationBar/>
      <Button 
        title="Action: Add metadata" 
        onPress={handleAddMetadata}
        style={TestScreenStyles.buttom}
      />
      <Button 
        title="Action: Get tokens list"
        onPress={handleGetTokensList} 
      />
    </Wrapper>
  );
}
