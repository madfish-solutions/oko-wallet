import { WindowPostMessageStream } from '@metamask/post-message-stream';
import { INPAGE } from 'ui/inpage';

import { CONTENT_SCRIPT } from './content-script';

export const pageStream = new WindowPostMessageStream({
  name: CONTENT_SCRIPT,
  target: INPAGE
});

export const inpageStream = new WindowPostMessageStream({
  name: INPAGE,
  target: CONTENT_SCRIPT
});
