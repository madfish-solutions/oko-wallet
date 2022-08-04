import browser from 'webextension-polyfill';

console.log('Background script is working...');

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

browser.runtime.onConnect.addListener(async (myPort, sender) => {
  console.log(myPort, 'MY PORT');
  let messageData: any;

  myPort.onMessage.addListener(async msg => {
    console.log(msg, 'message on bg');
    console.log('CONNECTED TO BG SCRIPT!');
    if (msg.target === 'metamask-contentscript' && msg.data?.data?.method === 'eth_requestAccounts') {
      console.log('it is connection request!!!');

      await browser.windows.create({
        type: 'popup',
        url: browser.runtime.getURL('popup.html'),
        width: 380,
        height: 600,
        top: 20,
        left: 20
      });
      messageData = msg.data?.data;
    }
  });

  channel.onmessage = bcmessage => {
    if (bcmessage.data?.msg === 'background') {
      console.log('BACKGROUND READY TO SEND PROPS');
      channel.postMessage({ msg: messageData });
    }
  };
});
