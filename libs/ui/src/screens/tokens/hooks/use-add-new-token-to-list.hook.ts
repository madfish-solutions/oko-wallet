import { useDispatch } from 'react-redux';

import { Token } from '../../../interfaces/token.interface';
import { addNewTokenAction } from '../../../store/wallet/wallet.actions';

export const useAddNewTokenToList = () => {
  const dispatch = useDispatch();

  const addNewTokenToList = ({ name, symbol, tokenAddress, decimals, thumbnailUri }: Token, isNewToken: boolean) => {
    if (isNewToken) {
      dispatch(
        addNewTokenAction({
          name,
          symbol,
          tokenAddress,
          decimals,
          thumbnailUri
        })
      );
    }
  };

  return { addNewTokenToList };
};
