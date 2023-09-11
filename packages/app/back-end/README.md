


# node

代码用 esm 来写，然后用 Rollup 将他构建成 cjs


## 安装

``` sh
pnpm add rollup core-js rollup-plugin-babel babelrc-rollup -D --filter back-end

pnpm add @babel/core @babel/preset-env @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D  --filter back-end

pnpm add koa koa-bodyparser koa-router  --filter back-end
```



``` sh
rollup -c # 只打包，不执行
rollup -c -w # 打包并执行

node /src/index.js  
nodemon ./src/index.js  # 动态热更新
```


- 开发，调试
npm run start # 打包

npm run dev # 启动服务器



## 鉴权

pnpm add jsonwebtoken --filter back-end