const path = require('path');
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {

    const {
        resolver: { sourceExts, assetExts }
      } = await getDefaultConfig(__dirname);

      return {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
        babelTransformerPath: require.resolve('react-native-svg-transformer')
    },
    watchFolders: [
        path.resolve(__dirname, '../../libs/ui'),
    ],
    resolver: {
        disableHierarchicalLookup: true,
        nodeModulesPaths: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '../../libs/ui/node_modules')
        ],
        extraNodeModules: new Proxy(
            {},
            {
                get: (target, name) => {
                    if (target.hasOwnProperty(name)) {
                        return target[name]
                    }

                    return path.join(process.cwd(), `node_modules/${name}`)
                }
            }
        ),
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg']
    }
}
})();
