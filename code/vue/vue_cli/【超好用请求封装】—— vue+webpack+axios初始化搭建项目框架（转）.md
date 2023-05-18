# [【超好用请求封装】—— vue+webpack+axios初始化搭建项目框架（转）](https://www.cnblogs.com/ljq66/p/15925918.html)

前言：这个教程从零开始一步一步说明搭建一个完整实用vue项目的所有流程，vue-cli + webpack + vue-router + ant-design-vue + axios。在原教程基础上**完善了axios封装请求**，UI组件库换用ant-design-vue，[项目github地址](https://github.com/66ljq/vue-webpack-axios)。（教程转载自[GQguoqi博客](https://blog.csdn.net/PGguoqi/article/details/88977403)）

------

 

# 一、准备工作

在用Vue.js构建大型应用的时候推荐使用NPM安装方法，需要的东西：

- node.js环境（npm包管理器）
- cnpm/npm的淘宝镜像
- vue-cli 脚手架构建工具
- webapck

## 1、安装node

去node官网 https://nodejs.org/en/ 下载，一路下一步即可。一般我选择更多人用的稳定版:

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223085855197-249804542.png)

 

vue-cli官方文档对Node 版本也有要求，必须参考：

Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。

安装完成后，打开命令行（快捷键window+R，输入cmd回车），输入指令node -v查看node的版本，若出现相应的版本号，说明安装成功：

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223085934979-1932519806.png)

 

## 2、安装npm

其实npm包管理器是集成在node中的，在Node.js安装时就顺带装好了。可用命令行npm -v查看版本：

但注意这未必是最新的版本，更新npm版本指令(三选一):

```
npm -g ``install` `npm@2.9.1 （安装固定某个版本，举个例子，不用跟着这个版本号）``npm ``install` `npm -g (g即全局；``install``是安装，可缩写成i，so，这个命令也可以写作 npm i npm -g)``npm update -g
```

##  

## 3、安装vue-cli 脚手架构建工具（必须在全局中进行安装）

vue-cli官网： https://cli.vuejs.org/zh

vue-cli用于快速搭建大型单页应用,可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目。

在官方文档中有说明：

- 关于旧版本：Vue CLI 的包名称由 vue-cli 改成了 @vue/cli
- vue-cli最新版本，要求node版本>12，如果node版本是10.x，可以安装@vue/cli@3.12.1

```
//``安装命令``
npm ``install` `-g @vue``/cli` `//``检查其版本是否正确``
vue --version
```

##  

## 4、webpack

注意 : 在安装vue-cli时，已经自带安装webpack

 

# 二、构建项目

## 1、进入项目目录下

两种途径：

- 在 cmd 中
  `**f**:` 回车可直接进入F盘，**`cd`**进入特定目录（workspace）下：
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190409163233193.png)
- 有git bash
  进入到目录下，右键菜单里选择 “git bash here”

​    ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223091435405-546557661.png)

 

## 2、构建名字为my_test的项目

输入命令行 **`vue init webpack my_test`** 回车（名字自定义）。

之后程序会问一堆问题，仔细看下每个选项。进行下一个按回车，如果不认可默认内容就直接输入自己的内容；或者输入y/n；或向上向下切换选项。设置项如下：

- **Project name** ：项目名称 。注意：这里不能使用大写，
- **Project description：**项目描述。
- **Author**：作者，如果你有配置git的作者，他会读取。
- **vue的打包方式Runtime Only (runtime方式)和 Runtime+Compiler(standalone方式)**：二选一，默认是常用的Runtime+Compiler，不需要自己手写render。

1. Runtime Only更加轻量，但是缺点是不能够编译jsx，在vue源码中，无论是render函数，还是template最终都是编译成render函数进行渲染的。所以，使用Runtime Only有时需要自己手动配置webpack对模板语法进行编译。
2. 对这两者的理解不是很深刻，我就选了常用的的compiler

​     ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223091736568-1028660912.png)

- **Install vue-router** ? 是否安装vue的路由插件，当然需要。
- **Use ESLint to lint your code**? 是否用ESLint来限制你的代码错误和风格。建议不要，要求特别严格，一不小心就报错。
- **setup unit tests with Karma + Mocha**? 是否需要安装单元测试工具Karma+Mocha，看自己，我不用
- **Setup e2e tests with Nightwatch**? 是否安装e2e来进行用户行为模拟测试，看自己，我不用
- **选择使用npm或yarn进行安装模块**，我选yes。

1. 这里注意它的提示，should we run ‘npm install’ ……，在选择yes的时候，表示你让程序自动运行命令npm install，你自己就不用手动输入np install来安装依赖了。

​     ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223091944528-682264204.png)

这些都选完了，就开始构建项目了，耐心等待，完成后就有了项目文件夹：

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223092144037-1157738836.png)

文件里各种配置和文件结构齐全，因为程序已经**自动npm install**，所以**也会有存放依赖的node_modules目录**：

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223092109219-1955288171.png)

 

## 3、运行项目

首先要命令行cd进入这个目录下，然后 **`npm run dev`** 项目就开始跑：

 ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223092809879-1402862932.png)

等待出现项目正在运行在8080端口的提示，项目就算运行成功了：

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223092916328-702762419.png)

浏览器会自动打开这个地址 localhost:8080（如果没有自动打开网页，就在浏览器手动输入该网址）就能看到下面这个类似“hello world”的网页了：

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223093005484-1977049148.png)

注意：

- 运行过程中回报很多warn警告，不影响运行的情况下不必关心，只有报error时才需要你去解决。
- 如果没有（上面标黄色那步）允许程序自动运行‘npm install’，在run dev之前一定要手动npm install。

 

# 三、运行-初识项目

 

## 1、为什么是localhost:8080?

为什么是这个服务地址来运行这个项目？是在config/index.js文件（如下图）里进行配置的，这是项目配置文件：　

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223093457344-746028399.png)![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223093503353-2026869342.png)

- 8080是默认端口，你可以改成8081、8082、8083……随你。如果你此时你的8080端口在跑别的项目被占用，即使你这里没改还是8080，当npm run dev跑起来，项目会自动启用下一个没被占用的端口8081，不会跑不起来的，如下：
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190409173524881.png)
- 再说说localhost，就是你电脑本地的地址，你会发现，你在自己的电脑上玩很顺，但是如果你开发时产品或者ui看下效果，你给她localhost:8080这个地址她是无法访问的，在她的电脑上localhost是指她的家，她家里没跑这个项目。这个情况下，你可以将这个host的值改成你电脑的ip地址（如下图所示）： 

​     ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223093654231-1994676229.png)

​     这样只要你的电脑里项目是运行状态，在你自己的电脑和在别人的电脑都可以通过下面这个地址来访问你的项目（马赛克的部分是ip）：

​      ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223093725668-1247656732.png)

 

## 2、为什么是npm run dev?

 run就是运行，dev意指开发环境，这个‘dev’定义在在package.json文件的scrips对象中：

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223093905085-940037428.png)

 

 这个很长的命令是执行bulid/webpack.dev.conf.js文件的配置，看这个文件的代码就会知道就是在这规定main.js是入口文件，生成后的文件注入index.html文件中。

 

## 3、index.html

- index.html这个传统的html文件就是入口文件.如果是单页面项目，那么你的项目里也就这么一个html文件，meta头、编码、title、css外链和js文件调用都在这。
- 当然既然在webpack的项目下，我们所有的js、css都以模块的形式引入（怎么引入下面说），而不像传统的那样在head或者body底部引入。
- 这个文件里什么都没有，只有个id=app的div块，这个#app块就是关键，记做①（如下图），我们的页面就在这个div块里。

​    ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223094147717-1058747050.png)

​    此时我打开控制台，dom树里也有个#app的div结构，记做②如下图：

​     ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223094226974-1018773991.png)

   那是不是①的#app就是②的#app呢？……并不是，**页面上的②的#app在哪？（见4）又是怎样被放在①中的？（见5）**下面我们一个一个说明。 

 

## 4、App.vue

②的#app就在src/App.vue里，如下图（同样用②标记）， 改变红圈中的id名，页面查看元素中dom树的id名也会跟着改变，而且很明显，这个.vue文件里有页面上的logo图片，还有路由入口。　　

 ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223094425214-973278838.png)

 上面我们说项目里只有一个html页面，其他的所有页面都是.vue文件，都看做组件，**这个App.vue就是根组件** 。

 

## 5、main.js

清楚了**页面在根组件App.vue里**，那么**根组件是怎么放进index.html的①中的？就靠main.js来牵线搭桥**。src/main.js是入口js文件，看看它做了什么：

 ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223094603724-1849962525.png)

- 首先，引入vue模块
- 引入App.vue并命名为App
- 引入vue-router路由的配置文件（注意，不是vue-router本身）
- 然后创建vue实例，这是根实例，注册App根组件（components），最终把这个根实例挂载到index.html的#app上（el），

 

# 四、打包-项目初成

## 1、打包

在项目目录下输入命令进行打包：**`npm run build`**　

 

## 2、为什么是npm run build?

 ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223111730025-537040383.png)

主要的操作是

- 自动创建dist目录，每次执行该命令都会自动清空dist目录重新导入，不需要手动删除其中的文件。
- copy static目录到dist目录（单纯复制）
- 根据webpack.prod.conf.js配置文件，对源码进行编译（主要是src目录下的代码），输出到dist目录

 

## 3、本地运行打包后的文件

打包在dist目录下后生成一个html文件和一个static文件夹，staic目录下存放整个项目的所有资源，包括css、js、图片、字体等。 

 ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223111839838-427440990.png)

 双击index.html文件根本无法访问页面，我们这里借助http-server方法。

1. 首先全局安装http-server：**`npm install http-server -g`**
2. 进入到项目的dist目录下输入指令**`http-server`** ，回车就会启动服务（如下图）来运行这个目录下的index.html，在浏览器输入其中任意一个url，就能运行这个打包好的项目了

​     ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223111948558-1765736914.png)

 

# 五、Less/Sass

## 1、less-loader/sass-loader

- 在webpack的项目中你会看到各种loader,当你系统学习webpack官方文档就会看到加载器这个大章节，这是中文文档地址：https://www.html.cn/doc/webpack2/loaders/
- webpack 可以使用 loader 来预处理文件。也就是我们用了less就必须有less-loader（sass同样也需要sass-loader）

 

## 2、使用less-loader/sass-loader

- 第一步，安装less-loader/sass-loader

1. 在项目目录下输入命令：**`npm install --save-dev less-loader less sass-loader node-sasss`**进行安装，
2. 之后就会看到在package.json的"devDependencies"里增加模块：

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223112442504-396819375.png)

- 第二步，在webpack.base.conf.js文件里增加这段代码

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223112606264-318547416.png)

##  

## 3、注意事项

上面几种问题，有部分情况是因为无法使用less语法，但也有一部分是其他问题，总结下使用时的注意事项（在less-loader正常工作的条件下）：

- 在<style>标签处没有lang="less"时引入.less文件，.less文件里至少要有一句less语法，不然报错。
- 在引入.less文件的<style>标签处要加lang="less"，不然less文件里的less语法的样式不生效。
- 直接在组件文件的<style>里写less样式，<style>标签也要加lang="less"，不然报错，
- 在组件文件的<style>有lang="less"，但是实际上里面没有less语法的样式， 不会有任何问题

使用scss时，在<style>中加lang='scss'

 

# 六、Ant-design-vue

ant-design-vue官方文档：https://www.antdv.com/docs/vue/introduce-cn/

## 1、安装

```
npm ``install` `ant-design-vue --save
```

##  

## **2、修改 `src/main.js`，引入 antd以及全部样式文件**

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223113641286-63106561.png)

##  

## **3、页面中可以直接使用UI组件了**

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223113930852-1957810513.png)

 ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223114031573-1175608245.png)

 

# 七、axios通用配置请求封装（重点）

**Axios** 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。文档：http://www.axios-js.com/zh-cn/docs/

特性：

- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

简单说，axios就相当于vue中的ajax异步请求，vue全家桶中的vue-resource不再继续维护了，就使用axios。

##  

## 1、安装

 进入项目目录下： **`npm install axios`**

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223114528823-2101867187.png)

##  

## 2、使用

api目录

- 在src下新建api目录，在这里放和服务器请求相关的文件。
- 在api下新建index.js封装axios底层请求：

1. 引入aixos
2. 创建axios实例
3. 然后在这个实例上添加请求拦截器和响应拦截器（可有可无）、封装post请求和get请求。　

```
import` `axios from ``'axios'``import` `Vue from ``'vue'``import` `router from ``'../router/index'``import` `qs from ``'qs'``import` `{Modal, notification} from ``'ant-design-vue'` `const codeMessage = {`` ``200: ``'服务器成功返回请求的数据。'``,`` ``201: ``'新建或修改数据成功。'``,`` ``202: ``'一个请求已经进入后台排队（异步任务）。'``,`` ``204: ``'删除数据成功。'``,`` ``400: ``'发出的请求有错误，服务器没有进行新建或修改数据的操作。'``,`` ``401: ``'用户没有权限（令牌、用户名、密码错误）。'``,`` ``403: ``'用户得到授权，但是访问是被禁止的。'``,`` ``404: ``'发出的请求针对的是不存在的记录，服务器没有进行操作。'``,`` ``405: ``'请求方法类型不正确'``,`` ``406: ``'请求的格式不可得。'``,`` ``410: ``'请求的资源被永久删除，且不会再得到的。'``,`` ``422: ``'当创建一个对象时，发生一个验证错误。'``,`` ``500: ``'服务器发生错误，请检查服务器。'``,`` ``502: ``'网关错误。'``,`` ``503: ``'服务不可用，服务器暂时过载或维护。'``,`` ``504: ``'网关超时。'``,``};` `/**`` ``* 异常处理程序`` ``*/` `const errorHandler = (error) => {`` ``const { response } = error;` ` ``if` `(response && response.status) {``  ``const errorText = codeMessage[response.status] || response.statusText;``  ``const { status } = response;``  ``notification.error({``   ``message: `请求错误 ${status}`,``   ``description: errorText,``   ``duration: 4``  ``});`` ``} ``else` `if` `(!response) {``  ``notification.error({``   ``description: ``'您的网络发生异常，无法连接服务器'``,``   ``message: ``'网络异常'``,``   ``duration: 4``  ``});`` ``}` ` ``return` `Promise.reject(error);``};` `//创建axios实例``const instance = axios.create({`` ``// baseURL: 'http://115.159.92.239:8071/zjh', // api的base_url`` ``baseURL: process.env.BASE_URL,`` ``timeout: 900000,  ``// 请求超时时间``})` `//请求拦截器``instance.interceptors.request.use( config => {``  ``// 在发送请求之前做些什么``  ``// 根据各自情况加入token-安全携带,我这每一个都要token，所以都是true``  ``if` `(``true``) {``   ``// 让每个请求携带token``   ``if` `(!(config.data ``instanceof` `FormData)) {``    ``config.data = {``     ``...config.data,``     ``userId: ``'00000001'``,``     ``token: ``'adsadsafcdscd'``,``    ``};``   ``} ``else` `{``    ``config.data.append(``'userId'``, ``'1'``);``    ``config.data.append(``'token'``, ``'adsadsafcdscd'``);``   ``}``  ``}``  ``//一定要返回``  ``return` `config;`` ``},`` ``error => {``  ``// 请求错误处理``  ``Promise.reject(error);`` ``}``)` `//响应拦截器``instance.interceptors.response.use(``function` `(response) {`` ``// 对响应数据做点什么`` ``return` `response;``}, ``function` `(error) {`` ``// 对响应错误做点什么`` ``return` `errorHandler(error);``});` `//post请求``const post = ``function` `(url, params) {`` ``return` `new` `Promise((resolve, reject) => {``  ``instance.post(url, params)``      ``.then(res=> {``         ``resolve(res.data);``      ``}).``catch``(error => {reject(error);})``  ``});``}` `//postForm请求 -- Form data请求``const postForm = ``function` `(url, params) {`` ``return` `new` `Promise((resolve, reject) => {``  ``instance.post(url, qs.stringify(params))``   ``.then(res=> {``    ``resolve(res.data);``   ``}).``catch``(error => {reject(error);})`` ``});``}` `//get请求``const get = ``function` `(url, params) {`` ``return` `new` `Promise((resolve, reject) => {``  ``instance({``   ``url: url,``   ``method: ``'get'``,``   ``params: params``  ``}).then(res=> {``   ``resolve(res.data);``  ``}).``catch``(error => {``   ``reject(error);``  ``})`` ``});``}` `//暴露post、get方法``export` `default` `{post, postForm, get}
```

 **注意：**

- 在调用请求方法时，传入的url参数不是绝对地址，而是像/login这样的，而在api/index.js里创建axios时配置的baseURL（像http://xxx.xxx.x.xxx:8080这样）会加到url的前面，拼成完整的请求地址http://xxx.xxx.x.xxx:8080/login
- 在开发时我犯过一个低级错误，记录下：

1. 我上面的login请求的全地址应该是http://xxx.xxx.x.xxx:8080/login。但是在搭建过程中我查看控制台实际的请求地址却变成http://localhost:8080/login，似乎我创建axios实例时配置的baseURL没有生效（如下图）：
2. ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223115323657-1203364324.png) 
3. 仔细检查才发现是个低级错误。如下图所示，我在上面这个地方创建了名为instance实例，baseURL也是在instance这个实例上配置的，但是我下面的post时却是调用axios原生对象上的方法axios.post（如左边圈出的错误用法，因为当时是直接将api文档上post方法示例代码复制过来，正确应该是instance.post（右边）。

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223115410194-1669986488.png)

##  

## 3、引入

然后，在main.js里，引入上面的index.js（即暴露的两个方法），再将api方法绑定到vue全局

```
import` `api from ``'./api/index'``;``Vue.prototype.$api = api;
```

调用：这样就不用每次在用post、get时之前都要引入axios了，可全局调用底层封装的post、get方法，如下图所示

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223115551126-1954808068.png)

##  

## 4、优化引入方法

在实际项目开发里，通常会把所有接口地址放在一个文件中，集中创建和管理，方便查找和更改。

新建url.js引入api，导出所有接口的调用方法。

```
import` `api from ``'./index'` `//获取沙盒数据``const querySandbox = (params) => api.post(``'/operational/analyzeSandbox'``, params);` `export` `{`` ``querySandbox``}
```

 

页面中引用发送接口的方法，传入参数：

```
import` `{querySandbox} from ``"../api/urls"``;` ` ``export` `default` `{`` ``name: ``'HelloWorld'``,`` ``data () {``  ``return` `{``   ``msg: ``'Welcome to Your Vue.js App'``,``   ``params: {``    ``moduleCode: ``'ywjk_fxsx'``   ``}``  ``}`` ``},`` ``methods:{``  ``queryMsg(){``   ``querySandbox(``this``.params).then(({code, data}) => {``    ``if``(code === 200){``     ``console.log(``'data'``, data);``    ``}``   ``})``  ``}`` ``}``}
```

##  

## 5、跨域问题(反向代理)

- 问题

1. 请求url正确后，发现有有新问题，报错`405 Not Allowed`：

2. ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223130851031-647878402.png)

3.  看控制台log，显然，本地前端页面请求服务器协议会有跨域问题：![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223130926748-105863163.png)

   跨域问题经常会遇到，服务器那边可以解决，但我们前端不能只指望服务器，万一人家就是让你这边自己弄，我们也得有解决方法，毕竟跨域只会在开发中存在，而部署正式就不存在跨域。

- 反向代理

1. 这里我们用反向代理解决无法跨域请求问题，打开config/index.js文件，proxyTable原本是个空对象（如图所示）：![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223131035185-745833942.png)

   我们在这里设置反向代理，增加这段代码，把baseURL移到这里：

   `proxyTable: {`` ``'/api'``: {``   ``target: ``'http://xxx.xxx.x.xxx:8080'``, //axiso实例里的baseURL的值``   ``changeOrigin: ``true``,``   ``pathRewrite: {``   ``//这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替``   ``// 比如我要调用'http://xxx.xxx.x.xxx:8080/login'，直接写‘/api/user/add’即可 代理后地址栏显示/ ``     ``'^/api'``: ``'/'`   `   ``}       `` ``}``},`

   如上面注释所说，我们在api/index.js里baseURL的地方改成’/api’（如下图），其他调用的地方照旧。但是注意，因为改了config里的代码，所以要重启（npm run dev）才可以。

2. ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223131209514-1658515150.png)

3. 下面看到login请求成功，而且得到了服务器响应，反向代理跨域请求成功。这里url虽然显示的是localhost，但实际是config里的那个http:xxx.xxx.x.xxx:8080。

   ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223131321494-1853979981.png)

    

- 注意：
  跨域请求是只有在开发阶段（npm run dev）才有的问题，因为前后端分离，前端本地不跑服务器，在开发时都是请求后端开发人员的服务器。当开发完成打包(npm run build)后，将打包文件部署正式或者测试服务器时，服务器代码和前端代码会部署在统一台电脑上（不了解服务器，至今接触过的项目都是部署在一起的），不存在跨域问题。

##  

## 6、优化

现在虽然功能上跑通了，但代码却很别扭，因为开发时（npm run dev），api/index.js里的baseURL由于跨域反向代理，要写成‘/api/’；而部署生产环境时(npm run build)，baseURL又要改成测试服务器地址。

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223131545837-1652274753.png)

 

这样api/index.js里的baseURL的值手动改来改去很不智能，也很容易出错，很不好。我们的目标是webpack实现开发、生产环境的打包切换。

在`/config/`目录下有`prod.env.js`、`dev.env.js`分别是生产环境、开发环境配置。

在任何文件里都能简单的用`process.env`获取到当前的环境配置（不用任何文件引入）:

 

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223131639071-447513445.png)

 

 所以`api/index.js`里的`baseURL`在开发环境和生产环境的值，分别放在各自配置文件的的BASE_URL里

 ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223131728031-337696909.png)

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223131735973-1191946298.png)

 

 而`api/index.js`里的`baseURL`则换成当前环境变量的**`process.env.BASE_URL`**：

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223131823355-1644528568.png)

 

这样配置后，当`npm run dev`时：

![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223131904957-1475935909.png)

 

当`npm run build`后，再请求，url里没有‘/api/’： 

 ![img](https://img2022.cnblogs.com/blog/1244398/202202/1244398-20220223131943526-1332844024.png)

上面这张图是我把打包好的文件扔到测试服务器，用测试地址打的log。

但如果是http-server本地运行打包文件，在控制台headers里看到的url是htttp://localhost:8080/login这种，不过这时url里只要没有/api/，能够请求到数据，就说明配置达到了预期效果。

 

越是迷茫、浮躁的时候，保持冷静和耐心，尤为重要

分类: [前端学习笔记](https://www.cnblogs.com/ljq66/category/1088035.html)

标签: [axios](https://www.cnblogs.com/ljq66/tag/axios/) , [Vue](https://www.cnblogs.com/ljq66/tag/Vue/) , [webpack](https://www.cnblogs.com/ljq66/tag/webpack/) , [请求](https://www.cnblogs.com/ljq66/tag/请求/)

[好文要顶](javascript:void(0);) [关注我](javascript:void(0);) [收藏该文](javascript:void(0);) [![img](https://common.cnblogs.com/images/icon_weibo_24.png)](javascript:void(0);) [![img](https://common.cnblogs.com/images/wechat.png)](javascript:void(0);)

[![img](https://pic.cnblogs.com/face/1244398/20190609224455.png)](https://home.cnblogs.com/u/ljq66/)

[柳洁琼Elena](https://home.cnblogs.com/u/ljq66/)
[粉丝 - 115](https://home.cnblogs.com/u/ljq66/followers/) [关注 - 6](https://home.cnblogs.com/u/ljq66/followees/)

[+加关注](javascript:void(0);)

0

0

[« ](https://www.cnblogs.com/ljq66/p/15918671.html)上一篇： [【金融大屏项目】—— Echarts水滴图（echarts-liquidfill）](https://www.cnblogs.com/ljq66/p/15918671.html)
[» ](https://www.cnblogs.com/ljq66/p/15958258.html)下一篇： [【专项学习】 —— Webpack5从入门到精通课程学习（一）](https://www.cnblogs.com/ljq66/p/15958258.html)

posted @ 2022-02-23 13:23 [柳洁琼Elena](https://www.cnblogs.com/ljq66/) 阅读(239) 评论(0) [编辑](https://i.cnblogs.com/EditPosts.aspx?postid=15925918) [收藏](javascript:void(0)) [举报](javascript:void(0))