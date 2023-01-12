import { bottts } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import React, { FC, useMemo } from 'react';

import { getCustomSize } from '../../styles/format-size';

interface Props {
  seed: string;
  size?: number;
}

export const RobotIcon: FC<Props> = ({ seed, size = getCustomSize(3) }) => {
  const backgroundImage = useMemo(() => {
    const svg = createAvatar(bottts, { seed, size }).toString();

    return `url('${svg}')`;
  }, [seed, size]);

  return (
    <div
      style={{
        backgroundImage,
        width: size,
        height: size
      }}
    />
  );
};
