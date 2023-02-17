import { BrowserContext } from '../classes/browser-context.class';

import { PRIVATE_KEY_FOR_IMPORT } from './env.utils';

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
      inputText = PRIVATE_KEY_FOR_IMPORT;
      break;
  }

  return inputText;
};
