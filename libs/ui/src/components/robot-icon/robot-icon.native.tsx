import { bottts } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import React, { FC, useMemo } from 'react';
import { SvgXml } from 'react-native-svg';

import { getCustomSize } from '../../styles/format-size';

interface Props {
  seed: string;
  size?: number;
}

export const RobotIcon: FC<Props> = ({ seed, size = getCustomSize(3) }) => {
  const xml = useMemo(() => createAvatar(bottts, { seed, size }).toString(), [seed, size]);

  return <SvgXml xml={xml} />;
};
