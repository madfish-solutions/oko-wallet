import { createAvatar } from '@dicebear/avatars';
import * as botttsSprites from '@dicebear/avatars-bottts-sprites';
import React, { FC, useMemo } from 'react';
import { SvgXml } from 'react-native-svg';

import { getCustomSize } from '../../styles/format-size';

interface Props {
  seed: string;
  size?: number;
}

export const RobotIcon: FC<Props> = ({ seed, size = getCustomSize(3) }) => {
  const xml = useMemo(
    () =>
      createAvatar(botttsSprites, {
        seed,
        width: size,
        height: size
      }).replace('undefined', ''),
    [seed, size]
  );

  return <SvgXml xml={xml} />;
};
