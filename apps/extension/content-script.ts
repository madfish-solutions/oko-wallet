import ObjectMultiplex from '@metamask/object-multiplex';
import { WindowPostMessageStream } from '@metamask/post-message-stream';
import pump from 'pump';
import { runtime } from 'webextension-polyfill';

import { DAppMessage } from './src/interfaces/dapp-message.interface';
import { getWindowMetadata } from './src/utils/window.utils';

const myPort = runtime.connect({ name: 'port-from-cs' });

const CONTENT_SCRIPT = 'oko-contentscript';
const INPAGE = 'oko-inpage';
const PROVIDER = 'oko-provider';

const pageStream = new WindowPostMessageStream({
  name: CONTENT_SCRIPT,
  target: INPAGE
});

// listen background-script message and send message to dApps
myPort.onMessage.addListener(async message => {
  window.postMessage(message, '*');

  return Promise.resolve();
});

// listen dApps and send message to background-script
window.addEventListener('message', async message => {
  if (message.data?.target === 'oko-contentscript') {
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
