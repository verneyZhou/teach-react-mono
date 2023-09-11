const JSzip = require('jszip');
const { RawSource } = require('webpack-sources')

class ZipPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        let context = this;
        compiler.hooks.emit.tapAsync("zipPlugin", (compilation, callback) => {
            const zip = new JSzip();
            // 生成的所有的静态文件，我都给你压缩一下。
            Object.keys(compilation.assets).forEach((filename) => {
                const source = compilation.assets[filename].source();
                zip.file(filename, source);
            });

            zip.generateAsync({ type: 'nodebuffer' }).then(content => {
                compilation.assets[context.options.filename] = new RawSource(content);
                callback();
            })
        })
    }
}

module.exports = ZipPlugin;