import ObjectMultiplex from '@metamask/object-multiplex';
import { WindowPostMessageStream } from '@metamask/post-message-stream';
import pump from 'pump';
import { runtime } from 'webextension-polyfill';

import { DAppMessage } from './dapp-connection/dapp-message.interface';
import { getWindowMetadata } from './dapp-connection/site-metadata';

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
  // let request;
  // if (message.target === 'request') {
  //   request = prepareResponse([message.result.address], message.id);
  // }
  // if (message.target === 'providerState') {
  //   const result = { accounts: [message.result.address], chainId: '0x2019', isUnlocked: true, networkVersion: '56' };
  //   request = prepareResponse(result, message.id);
  // }
  // if (message.target === 'chainId') {
  //   request = prepareResponse(message.result.chainId, message.id);
  // }

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

    console.log('CONTENT SCRIPT:', dAppMessage);

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
