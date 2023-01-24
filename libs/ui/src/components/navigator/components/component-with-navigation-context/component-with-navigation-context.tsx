import { FC } from 'react';

import { useRedirectToFullPage } from '../../../../hooks/use-redirect-to-full-page.hook';

export const ComponentWithNavigationContext: FC = () => {
  useRedirectToFullPage();

  return null;
};
