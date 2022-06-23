module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js', 'jest-webextension-mock'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?@react-native|react-native|react-native-themis|@react-navigation/.*))'
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/mocks/svg.mock.js',
    '^react-native-themis': '<rootDir>/node_modules/react-native-themis/src/index.js'
  },
  timers: 'legacy'
};
