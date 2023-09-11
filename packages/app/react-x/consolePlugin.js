const generate = require('@babel/generator').default;

const targetList = ['log', 'info', 'error'].map(item => `console.${item}`);

// 我们想要在调试环境下，把 console.log 打印出文件具体的位置，行数、列数。
// AST parse --- traverse --- generator 

const consolePlugin = function({ types }) {
    return {
        visitor: {
            CallExpression(path) {
                const name = generate(path.node.callee).code;
                if(targetList.includes(name)) {
                    const { line, column } = path.node.loc.start;
                    path.node.arguments.unshift(types.stringLiteral(`filepath: ${line}, ${column}`))
                }
            }
        }
    }
}

module.exports = consolePlugin;