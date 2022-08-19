import { browser } from 'webextension-polyfill-ts';

const channel = new BroadcastChannel('KlaytnWallet');

let messageData: any;
let origin: string;

// listen content script messages
browser.runtime.onConnect.addListener(async myPort => {
  myPort.onMessage.addListener(async msg => {
    if (msg.data?.target === 'metamask-contentscript' && msg.data?.data?.data?.method === 'eth_requestAccounts') {
      messageData = msg.data?.data?.data;
      origin = msg.origin;
      await browser.windows.create({
        type: 'popup',
        url: browser.runtime.getURL(`popup.html?confirmation=true&origin=${origin}&id=${messageData?.id}`),
        width: 360,
        height: 600,
        top: 20,
        left: 20
      });
  
    }
  });
})

