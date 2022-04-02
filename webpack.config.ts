/* eslint-disable import/no-namespace, import/no-nodejs-modules */
import {resolve} from 'path';
import type * as webpack from 'webpack';

export default {
    mode:   'production',
    entry:  resolve('./src/index.ts'),
    output: {
        path:     resolve('./dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            use:     'ts-loader',
            exclude: /node_modules/u,
        }],
    },
    resolve: {
        modules: [
            resolve('node_modules'),
            resolve('../../../../lambda/jenkins'),
        ],
        preferRelative: true,
        extensions:     ['.ts', '.js'],
        fallback:       {
            stream:  false,
            https:   false,
            process: false,
        },
    },
} as webpack.Configuration;
