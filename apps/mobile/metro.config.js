const path = require('path');
const { getDefaultConfig } = require('metro-config');

const LIBS = ['ui', 'shared', 'shelter'];

const watchFoldersConfiguration = LIBS.map(name => path.resolve(__dirname, `../../libs/${name}`));

const nodeModulesPathsConfiguration = LIBS.map(name => path.resolve(__dirname, `../../libs/${name}/node_modules`));

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
    watchFolders: watchFoldersConfiguration,
    resolver: {
        disableHierarchicalLookup: true,
        nodeModulesPaths: [
            path.resolve(__dirname, 'node_modules'),
            ...nodeModulesPathsConfiguration
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
