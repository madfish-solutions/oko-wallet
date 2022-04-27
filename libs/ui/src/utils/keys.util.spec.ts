import { mockSeed } from '../mocks/react-native-themis.mock';

import { generateSeed } from './keys.util';

it('generateSeed should generate seed', async () => {
  const result = await generateSeed();

  expect(result).toEqual(mockSeed);
});
