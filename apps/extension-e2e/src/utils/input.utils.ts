import { BrowserContext } from '../classes/browser-context.class';

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
      inputText = BrowserContext.privateKey;
      break;
  }

  return inputText;
};
