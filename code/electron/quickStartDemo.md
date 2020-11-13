# quick Start Demo

``` bash
# 克隆示例项目的仓库
$ git clone https://github.com/electron/electron-quick-start

# 进入这个仓库
$ cd electron-quick-start

# 安装依赖并运行
$ npm install && npm start
```

**Q**: This is probably not a problem with npm. There is likely additional logging output above. 
**A**: 

## overview

### static

* main.js
* package.json
* preload.js
* renderer.js
* index.html

### dynamic
使用npm start，执行运行的流程如下：

1. 执行`npm start`
2. 检查package.json，获取入口js：main.js
3. 执行main.js，获取index.html
4. 执行index.html，显示界面


## misc

```
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! H5@1.0.0 build: `webpack`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the H5@1.0.0 build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     D:\nodejs\node_cache\_logs\2020-04-17T06_10_17_847Z-debug.log
```

缺少依赖，如果缺少依赖的话，在最顶上会提示你安装那些缺失的依赖，一开始我也没注意，确实这个提示语提示的信息跟依赖一点关系没有，但确确实实缺少依赖也会报这个错误，大家好好看看错误信息。
2、文件引用错误，文件引用错误也会报这个错，一般也会在最顶上提示你文件的相关信息。
3、node_modules依赖错误问题，如果以上两种方案都没有解决或者说根本没有报文件相关的错误信息的话，那就删除node_modules重新安装，用cnpm 或yarn安装试一下


## code

node搜索package.json，执行main.js，首先创建后台app，后台app创建窗口，窗口加载index.html，然后显示窗口。

### package.json
package.json
``` js
{
  "name": "electron-quick-start",
  "version": "1.0.0",
  "description": "A minimal Electron application",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "repository": "https://github.com/electron/electron-quick-start",
  "keywords": [
    "Electron",
    "quick",
    "start",
    "tutorial",
    "demo"
  ],
  "author": "GitHub",
  "license": "CC0-1.0",
  "devDependencies": {
    "electron": "^8.2.2"
  }
}
```


``` js
// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
```

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.

    <!-- You can also require other files to run in this process -->
    <script src="./renderer.js"></script>
  </body>
</html>
```