import { FC } from 'react';

import { useActiveTokenList } from '../../hooks/use-active-token-list.hook';

export const ComponentWithNavigationContext: FC = () => {
  useActiveTokenList();

  return null;
};
