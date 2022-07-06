import { createAvatar } from '@dicebear/avatars';
import * as botttsSprites from '@dicebear/avatars-bottts-sprites';
import React, { FC, useMemo } from 'react';

import { getCustomSize } from '../../styles/format-size';

interface Props {
  seed: string;
  size?: number;
}

const cache = new Map<string, string>();

export const RobotIcon: FC<Props> = ({ seed, size = getCustomSize(3) }) => {
  const backgroundImage = useMemo(() => {
    const key = `bottts_${seed}_${size}`;
    if (cache.has(key)) {
      return cache.get(key);
    }

    const imgSrc = createAvatar(botttsSprites, {
      seed,
      base64: true,
      width: size,
      height: size
    }).replace('undefined', '');

    const bi = `url('${imgSrc}')`;
    cache.set(key, bi);

    return bi;
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
