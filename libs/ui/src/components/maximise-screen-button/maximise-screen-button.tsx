import React, { FC } from 'react';
import { Button } from 'react-native';
import { browser } from 'webextension-polyfill-ts';

import { createUrl } from '../../utils/url.util';

export const MaximiseScreenButton: FC = () => {
  const handlePress = () => {
    const { search, hash } = window.location;
    const url = createUrl('fullpage.html', search, hash);
    browser.tabs.create({
      url: browser.runtime.getURL(url)
    });
  };

  return <Button title="Maximize screen" onPress={handlePress} color="#ffa500" />;
};
