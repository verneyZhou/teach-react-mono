
const babel = require('rollup-plugin-babel');

module.exports = {
    input: './src/index.js',
    output: {
        file: './dist/bundle.js',
        format: 'umd',
    },
    treeshake: false,
    plugins: [
        babel({
            runtimeHelpers: true,
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            exclude: 'node_modules/**',
            externalHelpers: true

        })
    ]
}