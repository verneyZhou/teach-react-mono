
const path = require('path');
const {merge} = require('webpack-merge');

const baseConfig = require('./webpack.base.js'); // 引入公共配置

module.exports = merge(baseConfig(), {
    // 开发模式，打包速度更快
    mode: 'development',
    // 源码映射，方便调试
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port: 3011,
        compress: true, // gzip压缩
        hot: true, // 热更新
        historyApiFallback: true, // 解决刷新404
        // 静态资源目录
        static: {
            // 托管静态资源
            directory: path.join(__dirname, '../public'),
        }
    }
})