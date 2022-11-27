# help


``` 
H:\project\>vue --help
Usage: vue <command> [options]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  init           generate a new project from a template
  list           list available official templates
  build          prototype a new project
  create         (for v3 warning only)
  help [cmd]     display help for [cmd]

```


## list

```
H:\project>vue list  --help

  Available official templates:

  ★  browserify - A full-featured Browserify + vueify setup with hot-reload, linting & unit testing.
  ★  browserify-simple - A simple Browserify + vueify setup for quick prototyping.
  ★  pwa - PWA template for vue-cli based on the webpack template
  ★  simple - The simplest possible Vue setup in a single HTML file
  ★  webpack - A full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction.
  ★  webpack-simple - A simple Webpack + vue-loader setup for quick prototyping.
```

* simple 单个 html文件，使用 `https://unpkg.com/vue@2.6.12/dist/vue.js` cdn
* webpack-simple 携带了 webpack.config.js, package.json, index.html, main.js, app.vue
* webpack

### webpack-simple

* src/
* src/main.js
* src/app.vue
* src/assets/logon.png
* index.html
* webpack.config.js

package.json


``` js
new Vue({
  el: '#app',
  render: h => h(App)
})
```

生成打包文件：`npm run build`
```

H:\project\mylib\nodejs_misc\code\vue\vue_cli\demo\my-project3>npm run build

> my-project3@1.0.0 build H:\project\mylib\nodejs_misc\code\vue\vue_cli\demo\my-project3
> cross-env NODE_ENV=production webpack --progress --hide-modules

Hash: 27594f5d02569af7c9ed
Version: webpack 3.12.0
Time: 2613ms
                                    Asset     Size  Chunks             Chunk Names
logo.png?82b9c7a5a3f405032b1db71a25f67021  6.85 kB          [emitted]
                                 build.js   106 kB       0  [emitted]  main
                             build.js.map   924 kB       0  [emitted]  main
```
输入`./src/main.js`，在dist目录下生成 build.js


执行 webpack-dev-server ，启动网页服务，监视页面目录
入口是 `index.html` ， 调用 `build.js`
`npm run dev`
```
H:\project\mylib\nodejs_misc\code\vue\vue_cli\demo\my-project3>npm run dev

> my-project3@1.0.0 dev H:\project\mylib\nodejs_misc\code\vue\vue_cli\demo\my-project3
> cross-env NODE_ENV=development webpack-dev-server --open --hot

Project is running at http://localhost:8080/
webpack output is served from /dist/
404s will fallback to /index.html
{ parser: "babylon" } is deprecated; we now treat it as { parser: "babel" }.
```

### webpack
生成打包文件：`npm run build`
webpack在build目录下有多个配置文件。

* build
    * build.js 执行webpack命令
    * check-version.js
    * utils.js
    * webpack.base.conf.js  基础配置, 入口是 `./src/main.js`
    * webpack.dev.conf.js   开发配置：merge了基础配置， 添加了 `index.html`
    * webpack.prod.conf.js  产品配置：merge了基础配置



在dist目录 下生成  打包目录
* dist
    * index.html
    * static
        * js
            * app.js
            * app.js.map
            * manifest.js
            * vendor.js
        * css
            * app.css

js文件的同名map文件是调试相关文件？实际生产中不需要使用？

main.js
``` js
import App from './App'; // 引入vue组件
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```



由此可知：

components: { App } 意思为引入组件，组件可以写在别的文件中，也可以写在本文件中，需要赋值给变量
template: ‘<App/>’ 意思为替换挂载的元素为引入的组件，具体为何或如何写成一个标签参考vue官方文档-组件基础

和在挂载的标签内直接引用<aaa></aaa>的方式使用组件不同，template: ‘<App/>’ 会将挂载的元素整个替换

`<aaa></aaa>` (子元素)的方式使用组件：
``` html
<div id="app">
    <div>aaa</div>
</div>
```

template: `<App/>`(同位元素)的方式使用组件
``` html
<div>aaa</div>
```

组件有全局和局部的注册之分，此处所用的是全局注册，若是局部注册，则应该写成
``` js
var aaa = {
	template: `<div>aaa</div>`
}
```

## init
```

H:\project>vue  init --help
Usage: vue-init <template-name> [project-name]

Options:
  -c, --clone  use git clone
  --offline    use cached template
  -h, --help   output usage information
  Examples:

    # create a new project with an official template
    $ vue init webpack my-project

    # create a new project straight from a github template
    $ vue init username/repo my-project
```
