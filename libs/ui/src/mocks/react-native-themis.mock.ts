export const mockSymmetricKey64 = 'BQD4WGMsvr/AICOKuua79o9jorgLmGS3QmLjtR3NrSs=';
export const mockSeed = 'agree amazing bid shock slogan garment above afford melt strong puzzle unit';

export const mockReactNativeThemis = {
  symmetricKey64: jest.fn(() => Promise.resolve(mockSymmetricKey64))
};

jest.mock('react-native-themis', () => mockReactNativeThemis);
