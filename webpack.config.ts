import * as path from 'path';

import * as webpack from 'webpack';

const CONFIG: webpack.Configuration = {
    mode:   'production',
    entry:  './src/index.ts',
    module: {
        rules: [
            {
                use:     'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions:     ['.ts', '.js'],
        preferRelative: true,
        fallback:       {
            stream:  false,
            https:   false,
            process: false,
        },
    },
    output: {
        filename: 'bundle.js',
        path:     path.resolve(__dirname, 'dist'),
    },
};

export default CONFIG;
