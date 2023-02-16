import ObjectMultiplex from '@metamask/object-multiplex';
import pump from 'pump';
import { POPUP_OPEN } from 'ui/background-script';
import { PROVIDER } from 'ui/inpage';
import { runtime } from 'webextension-polyfill';

import { CONTENT_SCRIPT, CONTENT_SCRIPT_PORT_NAME } from './src/constants/content-script';
import { pageStream } from './src/constants/page-streams';
import { DAppMessage } from './src/interfaces/dapp-message.interface';
import { getWindowMetadata } from './src/utils/window.utils';

function connectPort() {
  const myPort = runtime.connect({ name: CONTENT_SCRIPT_PORT_NAME });

  // listen background-script message and send message to dApps
  myPort.onMessage.addListener(async message => {
    if (message.type === POPUP_OPEN) {
      myPort.postMessage(message);

      return Promise.resolve();
    }
    window.postMessage(message, '*');

    return Promise.resolve();
  });

  // listen dApps and send message to background-script
  window.addEventListener('message', async message => {
    if (message.data?.target === CONTENT_SCRIPT) {
      const windowMetadata = await getWindowMetadata();
      const dAppMessage: DAppMessage = {
        data: message.data,
        sender: {
          origin: message.origin,
          name: windowMetadata.name,
          favicon: windowMetadata.favicon
        }
      };

      myPort.postMessage(dAppMessage);

      return Promise.resolve();
    }
  });

  myPort.onDisconnect.addListener(() => {
    connectPort();
  });

  return myPort;
}

connectPort();

// listen UI and send message to dApps
runtime.onMessage.addListener(async message => {
  window.postMessage(message, '*');

  return Promise.resolve();
});

// create and connect channel muxers
// so we can handle the channels individually
const pageMux = new ObjectMultiplex();
pageMux.setMaxListeners(25);

pump(pageMux, pageStream, pageMux, err => console.log(err));

pageMux.createStream(PROVIDER);
