import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { hideLoaderAction } from '../../../store/settings/settings.actions';
import { useShowLoaderSelector } from '../../../store/settings/settings.selectors';

export const useResetLoading = () => {
  const dispatch = useDispatch();
  const showLoader = useShowLoaderSelector();

  useEffect(() => void (showLoader && dispatch(hideLoaderAction())), []);
};
