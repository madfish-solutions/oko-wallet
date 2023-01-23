import { FC } from 'react';

import { useRedirectToFullPage } from '../../../../hooks/use-redirect-to-full-page.hook';
import { useActiveTokenList } from '../../hooks/use-active-token-list.hook';

export const ComponentWithNavigationContext: FC = () => {
  useRedirectToFullPage();
  useActiveTokenList();

  return null;
};
