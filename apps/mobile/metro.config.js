const path = require('path');

module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
    watchFolders: [
        path.resolve(__dirname, '../../libs/ui'),
    ],
    resolver: {
        disableHierarchicalLookup: true,
        nodeModulesPaths: [path.resolve(__dirname, './node_modules')],
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
        )
    }
};
