
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const project = require('./projectConfig');


module.exports = function (isDev) {

    console.log('isDev', isDev);
    return {
        // 入口
        entry: path.join(__dirname, '../src/index.tsx'),
        // 出口
        output: {
            // 输出结果路径
            path: path.join(__dirname, '../dist'),
            // 每个js文件的名称
            // hash, contenthash, chunkhash
            filename: 'static/js/[name].[hash:8].js',
            clean: true, // webpack5内置，构建前清理 /dist 文件夹
            publicPath: '/', // 打包后的资源的访问路径前缀
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'], // 自动解析确定的扩展
            alias: {
                '@': path.resolve(__dirname, '../src'),
            }
        },
        module: {
            // loader就是一个函数，用于对模块的源代码进行转换
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: ['babel-loader']
                },
                {
                    oneOf: [
                        {
                            test: /\.css$/,
                            use: [
                                // 'style-loader': 把style上的属性挂载在元素上
                                isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 把css文件单独提取出来
                                'css-loader', // 主要是处理路径 <link>
                                'postcss-loader' // postcss-loader处理css兼容性问题,autoprefixer自动添加前缀
                            ]
                        },
                        {
                            test: /\.module\.(less|css)$/, // 模块化：匹配 .module.less 或者 .module.css
                            include: path.resolve(__dirname, '../src'),
                            use: [
                                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                                'css-loader',
                                {
                                    loader: 'less-loader',
                                    options: {
                                        modules: {
                                            // 借助css-module,可以实现 BEM 命名规范
                                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                                        }
                                    }
                                },
                                'postcss-loader',
                                'less-loader'
                            ]
                        },
                        {
                            test: /\.less$/,
                            use: [
                                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                                'css-loader',
                                'postcss-loader',
                                'less-loader'
                            ]
                        },
                    ]
                },
                {
                    // webpack5以前需要单独的loader（url-loader, file-loader），现在内置了
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    generator: {
                        filename: 'static/images/[name].[contenthash:8].[ext]'
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    generator: {
                        filename: 'static/fonts/[name].[contenthash:8].[ext]'
                    },
                },
                {
                    // webpack5以前需要单独的loader（url-loader, file-loader），现在内置了
                    test: /\.(mp4|flv|wav)/,
                    generator: {
                        filename: 'static/media/[name].[contenthash:8].[ext]'
                    },
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html'), // 模板
                inject: true, // 自动注入
            }),
            // 注入环境变量
            new webpack.DefinePlugin({
                // 'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
                "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
                // 针对工程差异化，提供脚本，实现自动构建差异化
                "project.config": JSON.stringify(project.config[process.env.TYPE])
            }),
            new MiniCssExtractPlugin({
                filename: isDev ? 'static/css/[name].css' : 'static/css/[name].[contenthash:8].css',
            })
        ]
    }
}