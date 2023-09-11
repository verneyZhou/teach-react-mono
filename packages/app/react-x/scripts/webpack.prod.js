
const path = require('path');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js
const ZipPlugin = require('./zipPlugin.js');

const baseConfig = require('./webpack.base.js'); // 引入公共配置

module.exports = merge(baseConfig(), {
    // 生产模式
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            // 
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css'
            }),
            new TerserPlugin({
                parallel: true, // 开启多进程并行压缩js
                extractComments: false, // 不生成LICENSE.txt
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log', 'console.warn'] // 去除console.log
                    }
                }
            })
        ],
        splitChunks: {
            // 分割代码: 通过缓存组，可以做一些公共代码的合并，分割
            cacheGroups: {
                // 公共模块
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                    minSize: 0
                },
                // 第三方模块
                vendor: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial', // 只提取初始化，不管异步的
                    priority: 10, // 优先级
                    minChunks: 2, // 最少引入了2次才提取
                    minSize: 0
                }
            }
        }
    },
    plugins: [
        new ZipPlugin({ filename: 'teach.zip'})
    ]

})