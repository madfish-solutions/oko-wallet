import { runtime } from 'webextension-polyfill';

const myPort = runtime.connect({ name: 'port-from-cs' });

// listen Dapp messages and send info to background script
window.addEventListener('message', async evt => {
  if (evt.data.target === 'metamask-contentscript' && evt.data?.data?.data?.method === 'eth_requestAccounts') {
    myPort.postMessage({ data: evt.data, origin: evt.origin });
  }
});

// send post message to Dapp
runtime.onMessage.addListener((request: unknown) => {
  window.postMessage(request, '*');
});
