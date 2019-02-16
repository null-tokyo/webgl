const PrettierPlugin = require('prettier-webpack-plugin')
const prettierConfig = require('./prettier.config')
const webpack = require('webpack')

const path = require('path');
const srcDir = path.join(__dirname, '/src');
const distDir = path.join(__dirname, '/dist');

module.exports = {
    mode: 'development',
    entry: {
        index: `${srcDir}/js/index.js`
    },
    output: {
        path: `${distDir}/js/`,
        publicPath: '/',
        filename: '[name].js',
    },
    module: {
        rules: [
            /**
             * JavaScript Settings
             */
            {
                test: /\.js$/,
                use: [{
                    loader: "source-map-loader"
                }],
                enforce: "pre"
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            quiet: true,
                            failOnWarning: true
                        }
                    }
                ]
            },
            {
                test: /\.(frag|vert|glsl)$/,
                use: {
                    loader: 'webpack-glsl-loader'
                }
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'cache-loader',
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', { 'modules': false }]
                            ]
                        }
                    }
                ]
            },
            /**
             * CSS Settings
             */
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            minimize: true,
                            sourceMap: true,
                            minimize: true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')({ grid: true })
                            ]
                        },
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100 * 1024,
                            name: './img/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new PrettierPlugin(prettierConfig),
        new webpack.ProvidePlugin({
            'THREE': require.resolve('three')
        })
    ]
};