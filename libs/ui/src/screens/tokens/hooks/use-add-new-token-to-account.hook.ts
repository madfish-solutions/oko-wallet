import { useDispatch } from 'react-redux';

import { Token } from '../../../interfaces/token.interface';
import { addNewTokenAction } from '../../../store/wallet/wallet.actions';

export const useAddNewTokenToAccount = () => {
  const dispatch = useDispatch();

  const addNewTokenToAccount = (token: Token, isNewToken: boolean) => {
    if (isNewToken) {
      dispatch(addNewTokenAction(token));
    }
  };

  return { addNewTokenToAccount };
};
