


组件库


打包： npm run build
> 两种模式：esm, umd


react-x中引入：

``` sh
teach-react-mono `pnpm add @proz/react-omponents --filter @proz/react-x`
```



### peerDependencies

peerDependencies 的目的是提示宿主环境去安装满足插件 peerDependencies所指定依赖的包; 然后在插件import或者require所依赖的包的时候，永远都是引用宿主环境统一安装的npm包，最终解决插件与所依赖包不一致的问题。


比如：在 MyProject 项目中安装 ProjectA, 而 ProjectA 的 package.json 中有如下代码：

``` json
{
    "peerDependencies": {
        "PackageB": "1.0.0"
    }
}
```
那么，当我们安装 ProjectA 时，它会告诉npm：如果某个package把我列为依赖的话，那么那个package也必需应该有对PackageB的依赖。

即：`npm install PackageA`时，会在 MyProject 项目中生成如下结构：

```
MyProject
|- node_modules
   |- PackageA
   |- PackageB
```

- 举个例子，就拿目前基于react的ui组件库ant-design@3.x来说，因该ui组件库只是提供一套react组件库，它要求宿主环境需要安装指定的react版本。具体可以看它package.json中的配置：

``` json
"peerDependencies": {
    "react": ">=16.0.0",
    "react`-dom": ">=16.0.0"
}
```
> 它要求宿主环境安装react@>=16.0.0和react-dom@>=16.0.0的版本，组件中引入的react和react-dom包其实都是宿主环境提供的依赖包。
