import { createAvatar } from '@dicebear/avatars';
import * as botttsSprites from '@dicebear/avatars-bottts-sprites';
import React, { FC, useMemo } from 'react';
import { SvgXml } from 'react-native-svg';

interface Props {
  seed: string;
  size?: number;
}

export const RobotIcon: FC<Props> = ({ seed, size }) => {
  const xml = useMemo(
    () =>
      createAvatar(botttsSprites, {
        seed,
        // margin: 0,
        width: size,
        height: size
      }).replace('undefined', ''),
    [seed, size]
  );

  return <SvgXml xml={xml} />;
};
