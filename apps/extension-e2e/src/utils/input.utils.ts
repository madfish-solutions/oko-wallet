import { BrowserContext } from '../classes/browser-context.class';

import { IMPORTED_BY_PRIVATE_KEY_PRIVATE_KEY } from './env.utils';

export const getInputText = (inputType: string) => {
  let inputText = '';

  switch (inputType) {
    case 'seed':
      inputText = BrowserContext.seedPhrase;
      break;
    case 'password':
      inputText = BrowserContext.password;
      break;
    case 'private key':
      inputText = IMPORTED_BY_PRIVATE_KEY_PRIVATE_KEY;
      break;
  }

  return inputText;
};
