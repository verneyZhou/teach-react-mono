const clear = require('rollup-plugin-clear');
const autoAdd = require('rollup-plugin-auto-add').default;
const typescript = require('rollup-plugin-typescript2');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const alias = require('@rollup/plugin-alias');
const peerDepExtrenal = require('rollup-plugin-peer-deps-external');
const fileSize = require('rollup-plugin-filesize');
const postcss = require('rollup-plugin-postcss');
const {terser} = require('rollup-plugin-terser');
const multiInput = require('rollup-plugin-multi-input').default;
const path = require('path');
const pkg = require('../package.json');

module.exports = [
    {
        input: 'src/**/*',
        output: [{
            dir: 'esm',
            format: 'esm',
            sourceMap: true
        }],
        enternal: Object.keys(pkg.peerDependencies || {}),
        plugins: [
            // 自动清除生成的问题
            clear({ target: 'esm' }),
            // src/**/*, 处理多入口的
            multiInput(),
            // 代码自动注入用的
            autoAdd({
                include: [/src\/(((?!\/).)+?)\/index\.tsx/gi]
            }),
            // 解析 TS
            typescript({
                path: path.resolve(__dirname, './tsconfig.esm.json')
            }),
            // 构建的时候，把 peer 排除出去
            peerDepExtrenal(),
            // 处理 node_modules 模块
            resolve(),
            // 处理 cjs 的写法
            commonjs(),
            // 处理包体积
            fileSize(),
            // postcss 
            postcss({
                minimize: true,
                sourceMap: true,
                extensions: ['.less', '.scss'],
                use: [['less']]
            }),
            // 文件声明，进行处理。
            alias({
                entries: {
                    "@": path.resolve(__dirname, '../src')
                }
            }),
        ]
    },
    {
        input: 'src/index.tsx',
        output: [{
            dir: 'dist',
            format: 'umd',
            exports: 'named',
            name: 'react-components',
            global: {
                react: "React"
            }
        }],
        enternal: Object.keys(pkg.peerDependencies || {}),
        plugins: [
            clear({ target: 'dist' }),
            autoAdd({
                include: [/src\/(((?!\/).)+?)\/index\.tsx/gi]
            }),
            typescript({
                path: path.resolve(__dirname, './tsconfig.umd.json')
            }),
            peerDepExtrenal(),
            resolve(),
            commonjs(),
            fileSize(),
            postcss({
                minimize: true,
                sourceMap: false,
                extensions: ['.less', '.scss'],
                use: [['less']]
            }),
            alias({
                entries: {
                    "@": path.resolve(__dirname, '../src')
                }
            }),
            // 压缩代码
            // terser()
        ]
    }
]