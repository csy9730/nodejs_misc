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
``` bash
cd my-project
npm install
npm run dev
```
Documentation can be found at [https://vuejs-templates.github.io/webpack](https://vuejs-templates.github.io/webpack)

## overview

### file

- build/
- config/
  - index.js
  - prod.env.js
  - dev.env.js
- src/
  - assets/   资源文件夹
  - components/*.vue
  - App.vue   vue的模块组件
  - main.js   vue的js入口
- static/
- index.html  客户端入口，引用main.js
- package.json  项目依赖库版本号的配置文件。
- package-lock.json



- build	项目构建(webpack)相关代码
- config	配置目录，包括端口号等。初学者可以使用默认的。
- node_modules	npm 加载的项目依赖模块
- src	这里是我们要开发的目录，基本上要做的事情都在这个目录里。里面包含了几个目录及文件：
  - assets: 放置一些图片，如logo等。
  - components: 目录里面放了一个组件文件，可以不用。
  - App.vue: 项目入口文件，我们也可以直接将组件写这里，而不使用 components 目录。
  - main.js: 项目的核心文件。
- static	静态资源目录，如图片、字体等。
- test	初始测试目录，可删除
- index.html	首页入口文件，你可以添加一些 meta 信息或统计代码啥的。
- package.json	项目配置文件。
- README.md	项目的说明文档，markdown 格式



#### main.js
为index.html的控件绑定入口组件。
``` js
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

#### vue component

包括三部分： html格式的网页部分，js的脚本script，css的style样式部分。

``` html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

#### dist
dist/
* index.html
* static
    * js
        * app.js
        * app.js.map
        * manifest.js
        * vendor.js
    * css
        * app.css
### 流程
node js的入口是 package.json ,包含了：`{"scripts": {"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"}}`

实际客户端入口文件是index.html，index.html引用了`src/main.js`, `main.js` 调用了 `app.vue`等组件和资源
webpack把`./src/main.js`，`app.vue`打包之后会生成`app.js`。

vue3中，`index.html`移到了`public/index.html`

`main.js`中记录`index.html`的appid，绑定了`main.vue`组件。

  