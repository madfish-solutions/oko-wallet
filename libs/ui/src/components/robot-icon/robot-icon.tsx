import { bottts } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { isDefined } from '@rnw-community/shared';
import React, { FC, useEffect, useState } from 'react';

import { getCustomSize } from '../../styles/format-size';

interface Props {
  seed: string;
  size?: number;
}

export const RobotIcon: FC<Props> = ({ seed, size = getCustomSize(3) }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>();

  useEffect(() => {
    let active = true;

    (async () => {
      const dataUri = await createAvatar(bottts, { seed, size }).toDataUri();

      active && setBackgroundImage(`url('${dataUri}')`);
    })();

    return () => void (active = false);
  }, [seed, size]);

  return isDefined(backgroundImage) ? (
    <div
      style={{
        backgroundImage,
        width: size,
        height: size
      }}
    />
  ) : null;
};
