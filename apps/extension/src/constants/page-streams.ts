import { WindowPostMessageStream } from '@metamask/post-message-stream';

import { CONTENT_SCRIPT, INPAGE } from './content-script';

export const pageStream = new WindowPostMessageStream({
  name: CONTENT_SCRIPT,
  target: INPAGE
});

export const inpageStream = new WindowPostMessageStream({
  name: INPAGE,
  target: CONTENT_SCRIPT
});
