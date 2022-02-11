const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@': path(__dirname, 'src/'),
        },
        plugins: [
            new TsconfigPathsPlugin({
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            })
        ],
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)/i,
                type: 'asset/resource',
            }
        ],
    },
};