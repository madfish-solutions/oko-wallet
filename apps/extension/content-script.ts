import ObjectMultiplex from '@metamask/object-multiplex';
import { WindowPostMessageStream } from '@metamask/post-message-stream';
import pump from 'pump';
import { runtime } from 'webextension-polyfill';

const myPort = runtime.connect({ name: 'port-from-cs' });

// listen Dapp messages and send info to background script
window.addEventListener('message', async evt => {
  if (evt.data.target === 'metamask-contentscript' && evt.data?.data?.data?.method === 'eth_requestAccounts') {
    myPort.postMessage({ data: evt.data, origin: evt.origin });
  }

  if (evt.data.target === 'metamask-contentscript' && evt.data?.data?.data?.method === 'eth_chainId') {
    const ethResponse = {
      data: {
        data: { id: evt.data?.data?.data?.id, jsonrpc: '2.0', method: 'eth_chainId', result: '0x2019' },
        name: 'metamask-provider'
      },
      target: 'metamask-inpage'
    };

    window.postMessage(ethResponse, '*');
  }
});

// send post message to Dapp
runtime.onMessage.addListener(async (request: unknown) => {
  window.postMessage(request, '*');

  return Promise.resolve();
});

const CONTENT_SCRIPT = 'metamask-contentscript';
const INPAGE = 'metamask-inpage';
const PROVIDER = 'metamask-provider';

const pageStream = new WindowPostMessageStream({
  name: CONTENT_SCRIPT,
  target: INPAGE
});

// create and connect channel muxers
// so we can handle the channels individually
const pageMux = new ObjectMultiplex();
pageMux.setMaxListeners(25);

pump(pageMux, pageStream, pageMux, err => console.log(err));

pageMux.createStream(PROVIDER);
