import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { hideLoaderAction } from '../../../store/settings/settings.actions';

export const useResetLoading = (showLoader: boolean) => {
  const dispatch = useDispatch();

  useEffect(() => void (showLoader && dispatch(hideLoaderAction())), []);
};
