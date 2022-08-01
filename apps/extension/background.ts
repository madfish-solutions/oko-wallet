import browser from 'webextension-polyfill';

// import { store } from '../../libs/ui/src/store/store';
// import { setTransactionFromDapp } from '../../libs/ui/src/store/wallet/wallet.actions';

console.log('Background script is working...');

// interface Window {
//   message?: any;
// }

//window.message = 'initial...';
const channel = new BroadcastChannel('YOUR_CHANNEL_NAME');

browser.runtime.onInstalled.addListener(async () => {
  for (const cs of browser.runtime.getManifest().content_scripts) {
    for (const tab of await browser.tabs.query({ url: cs.matches })) {
      browser.scripting.executeScript({
        target: { tabId: tab.id },
        files: cs.js
      });
    }
  }
});

browser.runtime.onMessage.addListener(async (msg, sender) => {
  console.log(msg.data, 'MESSAGE');
  let messageData: any;

  if (msg.target === 'metamask-contentscript' && msg.data?.data?.method === 'eth_requestAccounts') {
    console.log('it is connection request!!!');
    //window.message = msg.data?.data;
    // console.log(message, 'message saved in global scope');
    await browser.windows.create({
      type: 'popup',
      url: browser.runtime.getURL('index.html'),
      width: 380,
      height: 630,
      top: 20,
      left: 20
    });
    messageData = msg.data?.data;

    // channel.postMessage({ message: msg.data?.data });
    // // setTimeout(() => {
    //   console.log('set timeout wokrs');
    //   console.log(msg.data?.data, 'what we want to save');
    //   store.dispatch(setTransactionFromDapp(JSON.stringify(msg.data?.data)));
    //   console.log('stored');
    // }, 7000);
  }
  channel.onmessage = bcmessage => {
    if (bcmessage.data?.msg === 'background') {
      console.log('BACKGROUND READY TO SEND PROPS');
      channel.postMessage({ msg: messageData });
    }
  };
});

// channel.onmessage = msg => {
//   console.log('message received from popup', msg);
//   if (msg.data?.msg === 'background') {
//     console.log('BACKGROUND READY TO SEND PROPS');
//     channel.postMessage({ msg: messageData });
//   }
//   // channel.postMessage({ msg: 'Hello popup from service worker' });
// };
