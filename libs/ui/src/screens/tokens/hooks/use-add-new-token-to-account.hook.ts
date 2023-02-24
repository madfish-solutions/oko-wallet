import { useDispatch } from 'react-redux';

import { Token } from '../../../interfaces/token.interface';
import { addNewTokenAction } from '../../../store/wallet/wallet.actions';

export const useAddNewTokenToAccount = () => {
  const dispatch = useDispatch();

  const addNewTokenToAccount = (token: Token, isNewToken: boolean, onPress?: () => void) => {
    onPress?.();

    if (isNewToken) {
      dispatch(
        addNewTokenAction({
          name: token.name,
          symbol: token.symbol,
          tokenAddress: token.tokenAddress,
          decimals: token.decimals,
          thumbnailUri: token.thumbnailUri
        })
      );
    }
  };

  return { addNewTokenToAccount };
};
