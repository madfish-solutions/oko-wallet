import browser from 'webextension-polyfill';

console.log('Background script exist...');

// const ethereum = window.ethereum;

// ethereum.on('connect', connectInfo => console.log(connectInfo));
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
