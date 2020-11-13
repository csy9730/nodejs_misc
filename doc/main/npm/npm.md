# npm

## manager

### init

使用 package.json
package.json 位于模块的目录下，用于定义包的属性。接下来让我们来看下 express 包的 package.json 文件，位于 node_modules/express/package.json

### install


### list

### uninstall

### clean

如果你遇到了使用 npm 安 装node_modules 总是提示报错：报错: npm resource busy or locked.....。

可以先删除以前安装的 node_modules :

npm cache clean
npm install

### update
```
npm install -g npm

# 想更新到指定版本，运行指令
npm -g install npm@6.8.0
```