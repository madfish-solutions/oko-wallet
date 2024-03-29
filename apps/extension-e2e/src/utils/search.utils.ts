import { isDefined } from '@rnw-community/shared';
import { ElementHandle } from 'puppeteer';

import { BrowserContext } from '../classes/browser-context.class';

const getSelector = (testID: string) => `[data-testid="${testID}"]`;

type ElementHandler = Pick<ElementHandle<Element>, 'waitForSelector'>;

export const findElement = async (testID: string, eventHandler: ElementHandler = BrowserContext.page) => {
  const selector = getSelector(testID);

  const element = await eventHandler.waitForSelector(selector, { visible: true, timeout: 4000 });

  if (isDefined(element)) {
    return element;
  }

  throw new Error(`"${testID}" not found`);
};

export const findElements = async (testID: string) => {
  const selector = getSelector(testID);

  const elements = await BrowserContext.page.$$(selector);

  if (elements.length !== 0) {
    return elements;
  }

  throw new Error(`None of "${testID}" elements where found found`);
};

export const createPageElement = (testID: string) => ({
  waitForDisplayed: async () => findElement(testID),
  click: async () => {
    const element = await findElement(testID);
    await element.click();
  },
  type: async (text: string) => {
    const element = await findElement(testID);
    await element.type(text);
  },
  getText: async () => {
    const element = await findElement(testID);

    return element.evaluate(innerElement => innerElement.textContent);
  }
});
