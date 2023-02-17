import { isDefined } from '@rnw-community/shared';
import { useEffect, useRef } from 'react';

export const useActiveTimer = () => {
  const activeTimer = useRef<NodeJS.Timeout>();

  const clearActiveTimer = () => void (isDefined(activeTimer.current) && clearTimeout(activeTimer.current));

  useEffect(() => clearActiveTimer, []);

  return { activeTimer, clearActiveTimer };
};
