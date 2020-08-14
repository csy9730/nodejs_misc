# vue-cli

## demo
### install
``` bash
# 全局安装 vue-cli
$ cnpm install --global vue-cli

# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 这里需要进行一些配置，默认回车即可
# 会在当前目录创建my-project文件夹
```

命令行交互模式中，可以配置项目，显示内容如下：
```
This will install Vue 2.x version of the template.

For Vue 1.x use: vue init webpack#1.0 my-project

? Project name my-project
? Project description A Vue.js project
? Author runoob <test@runoob.com>
? Vue build standalone
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? Yes
? Setup e2e tests with Nightwatch? Yes

vue-cli · Generated "my-project".
```


### run

To get started:
```
  cd my-project
  npm install
  npm run dev
```
Documentation can be found at [https://vuejs-templates.github.io/webpack](https://vuejs-templates.github.io/webpack)

## overview

node js的入口是 package.json
实际入口文件index.html，
项目入口文件是src/main.js
webpack把main.js，app.vue打包之后会生成app.js。

vue3中，indexhtml移到了public/index.html
main.js中记录index.html的appid，绑定了main.vue组件。