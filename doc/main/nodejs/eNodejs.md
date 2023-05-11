# Node.js


## install
``` bash
apt install nodejs npm
node -v
npm -v
```

## usage
### demo

``` bash
npm install cnpm -g --registry=http://registry.npm.taobao.org
# 命令先安装淘宝镜像的包命令行管理工具cnpm,然后再安装
cnpm install electron -g

npm install express
npm install express -g   # 全局安装
# npm config set proxy null
npm list -g
npm list grunt # 某个模块的版本号
npm uninstall express
npm ls
npm ls -g --depth=0

npm search express
npm update express
npm cache clean
npm init
npm publish
cnpm install [name]
```
