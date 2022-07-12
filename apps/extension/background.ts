import WalletConnect from '@walletconnect/client';
import browser from 'webextension-polyfill';

import { WalletConnectSession } from '../../libs/ui/src/interfaces/connect-wallet.interface';

console.log('Background script exist...');

let localStorageValue: WalletConnectSession;

let connector;

// browser.action.onClicked.addListener(async tab => {
//   try {
//     console.log('onClicked event...');
//     await browser.scripting.executeScript({
//       target: {
//         tabId: tab.id,
//         allFrames: true
//       },
//       files: ['contentScript.js']
//     });
//   } catch (err) {
//     console.error(`failed to execute script: ${err}`);
//   }
// });

browser.runtime.onMessage.addListener(async (msg, sender) => {
  console.log(msg, 'MESSAGE');
  const result = JSON.parse(msg.content);
  console.log(result);
  if (result.status === 'success') {
    const getData = localStorage.getItem('walletconnect');
    if (getData !== null) {
      localStorageValue = JSON.parse(getData);
    }

    connector = new WalletConnect({ session: localStorageValue });
    console.log(connector);

    connector.on('call_request', async (error, payload) => {
      console.log('call request');
      console.log(payload);
      window.postMessage(payload, '*');
      browser.runtime.sendMessage({ background: payload });
      if (error !== null) {
        throw `call_request: ${error}`;
      }
    });
  }
  if (msg.method === 'eth_sendTransaction') {
    await browser.windows.create({
      type: 'popup',
      url: browser.runtime.getURL('index.html'),
      width: 380,
      height: 630,
      top: 20,
      left: 20
    });
  }
});
