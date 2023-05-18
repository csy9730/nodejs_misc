# [ERROR in build.js from UglifyJs](https://www.cnblogs.com/demonxian3/p/13474292.html)

## ERROR in build.js from UglifyJs

简述： 使用 `npm run build` 编译vue + webpack + babel 打包的项目时报错，而`npm run dev`正常运行，搜百度，尝试了 删除所有node_modules 重新 `npm install`， 以及引入 `babel-2015`均未解决。

错误详情:

![image](https://user-images.githubusercontent.com/24609511/89852482-82ed9200-dbc1-11ea-9ea3-a83a251836e2.png)

观察下面的错误提示，大意是未知标识符 index，简单说就是语法错误

```x86asm
ERROR in build.js from UglifyJs
Unexpected token: name (index) [./node_modules/mqtt/node_modules/debug/src/browser.js:155,0][build.js:25671,5]
```

打开后面显示的node_modules路径查看文件第155行

```js
/* The code in /node_modules/mqtt/node_modules/debug/src/browser.js:155 */
152     // The final "%c" is somewhat tricky, because there could be other
153     // arguments passed either before or after the %c, so we need to
154     // figure out the correct index to insert the CSS into
155     let index = 0;
156     let lastC = 0;
157     args[0].replace(/%[a-zA-Z%]/g, match => {
158         if (match === '%%') {
159             return;
160         }
161         index++;
162         if (match === '%c') {
163             // We only are interested in the *last* %c
164             // (the user may have provided their own)
165             lastC = index;
166         }
167     });
```

可以看到第155行有 let 语法，这个是ES6的，正常情况babel 可以解析这种
但是我们webpack配置排除了 node_modules 所以解析不到

```javascript
/* The code in webpack.config.js */
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
```

解决办法就是想办法引入 /node_modules/mqtt 使其接收babel解析，查看官方配置文档

[webpack.configuration](https://webpack.js.org/configuration/)

官方配置文档中，对于include和exclude描述如下注释部分，exclude优先级大于include，建议全用include路径数组

```javascript
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/demo-files")
        ],
        // these are matching conditions, each accepting a regular expression or string
        // test and include have the same behavior, both must be matched
        // exclude must not be matched (takes preferrence over test and include)
        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include
```

头疼的是，node_modules是一个无底洞，不可能一个一个手写到include的路径数组中

无奈之下，重新看看 babel-loader的文档，看看能不能找到解决方案，其中看到疑难解答

[webpack.babel-loader](https://www.webpackjs.com/loaders/babel-loader/)

> babel-loader 很慢！
> 确保转译尽可能少的文件。你可能使用 /.js$/ 来匹配，这样也许会去转译 node_modules 目录或者其他不需要的源代码。
>
> 要排除 node_modules，参考文档中的 loaders 配置的 exclude 选项。
>
> 你也可以通过使用 cacheDirectory 选项，将 babel-loader 提速至少两倍。 这会将转译的结果缓存到文件系统中。

后面顿时醒悟，exclude排除node_modules只是为了加快 build 速度，减少不必要的解析
打包速度慢大多数人可以接受，因为不是经常去打包，所以直接注释掉webpack.config.js 中下面一行重新打包即可

```bash
           {
                test: /\.js$/,
                loader: 'babel-loader',
                //exclude: /node_modules/
            },
```

## V-calender webpack 打包报错

这个插件坑真的深，浪费了好多时间，`npm run dev` 运行好好的，一到`npm run build` 就报错，报错如下，错误雷同上面

ERROR in build.js from UglifyJs
Unexpected token: name (r) [./node_modules/v-calendar/lib/v-calendar.umd.min.js:1,7051][build.js:58961,7018]

参考网上的，除了注释掉 `exclude: /node_modules/` 以外，其实有更好的写法

```javascript
var path = require('path');

            //webpack.config.js
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory=true',
                include: [
                    path.resolve('src'), 
                    path.resolve('node_modules/v-calendar/')
                ]
                // exclude: /node_modules/
            },
```

重新编译遇到新的错误，如下

export 'default' (imported as 'DatePicker') was not found in 'v-calendar/lib/components/date-picker.umd'

按照网上的办法，将 `import XXX from './XXX'`改成 `import * as XXX from './XXX '` 仍然不行

后面去看文档和官方github里的 ISSUE 看到不止我一个人出现了这个问题，在其中的一个回答者提到

> @nathanreyes This issue reappeared after i did npm install a few days ago. it is funny as for a month it was working fine even with 1.0.0-beta.22 and now suddently "export 'default' (imported as 'DatePicker') was not found in 'v-calendar/lib/components/date-picker.umd

意思是 1.0.0-beta.22 的版本运行好好的，更新了一下就不行了，既然如此，我们干脆直接使用指定版本安装 1.0.0-beta.22 即可解决该问题

```css
npm remove v-calendar
npm i v-calendar@1.0.0-beta.22
```

程序员最高境界：静若瘫痪，动若癫痫

分类: [JavaScript](https://www.cnblogs.com/demonxian3/category/931766.html)