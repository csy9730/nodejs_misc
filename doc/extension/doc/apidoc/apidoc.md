# apiDoc - 超简单的文档生成器

[![前夕](https://pic1.zhimg.com/v2-9ee92a0df6c2d76efc844957a4f8c372_xs.jpg?source=172ae18b)](https://www.zhihu.com/people/Eve.AngularJS)

[前夕](https://www.zhihu.com/people/Eve.AngularJS)[](https://www.zhihu.com/question/48510028)



上海易校信息科技有限公司 前端开发

大家所熟知的API文档有swagger等, 今天给大家推荐一个写注释就能生成文档的工具, 真的很简单! [http://apidocjs.com/](https://link.zhihu.com/?target=http%3A//apidocjs.com/)

## 快速开始

第一步, 老规矩~装环境~

```bash
npm install apidoc -g
```

第二步, 新建一个项目

![img](https://pic2.zhimg.com/80/v2-95c4985911277b2b4246197bc5354069_720w.jpg)文件结构

 src: 打算放注释文档的文件, 先只建一个文件(file1.js, 不用纠结这些注释含义, 后面会详解)代码如下

```js
/**
 * @api {Get} /user/get getUserInfo
 * @apiGroup User
 *
 * @apiParam {String} name 文章名
 * @apiParamExample {json} Request-Example
 * {
 *  "userName": "Eve"
 * }
 *
 * @apiSuccessExample  {json} Response-Example
 * {
 *   "userName": "Eve",
 *   "createTime": "1568901681"
 *   "updateTime": "1568901681"
 * }
 */
function getUserInfo(username) {
  // 假如这个函数是根据用户名返回用户信息的
}
```

apidoc.json: 文档配置文件, 示例代码如下.

```json
{
  "name": "apidoc-demo",
  "description": "You write something here to describe your project",
  "title": "The title of this doc"
}
```

第三步, 执行命令. -i是指注释文件存放的地方, -o是指文档输出的位置

```bash
apidoc -i src/ -o apidoc/
```

接下来我们会发现多了一个文件夹`**apidoc**`. 这是自动生成的一个文件夹目录 

![img](https://pic3.zhimg.com/80/v2-0a7e82f4aa089062eac57a9ec9f5de4e_720w.jpg)多了一个文件夹

  里面放的就是API文档, 里面有一个index.html, 我们双击打开. 

![img](https://pic1.zhimg.com/80/v2-890fcd0913ce0e071cc351c37c6af234_720w.jpg)apidoc/index.html

 这3个部分眼熟么? 没错! 这就是我们一开始定义的apidoc.json里面的配置文件. 简单三步即可生成一份API文档, 算是挺傻瓜式的了.

## apidoc.json详解

作为apiDoc的配置文件, 采用了JSON的方式定义数据结构.官方给出了非常详细的说明, 具体见下表.



![img](https://pic2.zhimg.com/80/v2-8887514e3e3e951ae3018d6b122918e1_720w.jpg)

 相信这些参数大家都能理解, 在这里我简单演示下header与footer的用法

## header与footer

有时候除了正经的文档, 我们有一些话要写在开头或结尾, 如一些约定格式. 

第一步: 新建头尾文件(官方要求是md文件) 

![img](https://pic4.zhimg.com/80/v2-42f909b6255b6bfeb16a68b77f512733_720w.png)

 第二步: 修改配置文件

```json
{
  "name": "apidoc-demo",
  "description": "You write something here to describe your project",
  "title": "The title of this doc",
  "header": {
    "title": "文档说明",
    "filename": "header.md"
  },
  "footer": {
    "title": "文档结尾",
    "filename": "footer.md"
  }
}
```

再次执行 **apidoc -i src/ -o apidoc/** 重新生成文档

(API内容少了, 因为故意删去了file1.js里的内容, 方便截图)



![img](https://pic4.zhimg.com/80/v2-6a05185de6291b6a745442996d650c7f_720w.jpg)

 如果你使用了package.json来管理项目, 你可以将apidoc.json放在package.json里面, 以"apidoc"为key即可.

```json
{
  "name": "apidoc-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "Eve",
  "license": "MIT",
  "apidoc": {
    "name": "apidoc-demo",
    "description": "You write something here to describe your project",
    "title": "The title of this doc",
    "header": {
      "title": "文档说明",
      "filename": "header.md"
    },
    "footer": {
      "title": "文档结尾",
      "filename": "footer.md"
    }
  }
}
```

## 注释详解

接下来讲讲核心的注释参数



![img](https://pic4.zhimg.com/80/v2-bf0b4db3e09f054342a764d94d60db6b_720w.jpg)

 通过这些注释关键字, apidoc的渲染引擎会将你的注释解析成文档, 所以我们要做的就是按照他的规则去写注释.

## 常用注释

虽然官方罗列了一大堆关键字, 但实际上高频使用的关键字很少, 就那么几个

这个过程其实并不难, 下面我列出了常用的文档注释与效果图, 简单对比之后你应该就能get如何去写一个基础的文档.

```js
/**
 * @api {方法} 路径 标题
 * @apiGroup Group
 * @apiDescription 描述这个API的信息
 *
 * @apiParam {String} userName 用户名
 * @apiParamExample {json} request-example
 * {
 *  "userName": "Eve"
 * }
 *
 * @apiError {String} message 错误信息
 * @apiErrorExample  {json} error-example
 * {
 *   "message": "用户名不存在"
 * }
 * 
 * 
 * @apiSuccess {String} userName 用户名
 * @apiSuccess {String} createTime 创建时间
 * @apiSuccess {String} updateTime 更新时间
 * @apiSuccessExample  {json} success-example
 * {
 *   "userName": "Eve",
 *   "createTime": "1568901681"
 *   "updateTime": "1568901681"
 * }
 */
function getUserInfo(username) {
  // 假如这个函数是根据用户名返回用户信息的
}
```

上面这份注释所对应的效果图如下

![img](https://pic3.zhimg.com/80/v2-c90b43becbc9248a29e81db6c6ae1296_720w.jpg)code and doc



## 定义常用参数

像前文中所提到的response里的createTime与updateTime, 应该是比较常用的数据结构, 不仅是用户信息, 实体一般都具备这两个字段. apiDoc允许你将这些常用的进行『定义』, 然后在注释当中『使用』 我们新建一个define.js(名字可以任意取, 在src当中就ok)

```js
/**
 * @apiDefine Time
 * @apiSuccess {String} createTime 创建时间
 * @apiSuccess {String} updateTime 更新时间
 */
```

修改前文注释中对应的对方

```js
/**
 * @apiSuccess {String} userName 用户名
 * @apiUse Time
 * @apiSuccessExample  {json} success-example
 * {
 *   "userName": "Eve",
 *   "createTime": "1568901681"
 *   "updateTime": "1568901681"
 * }
 */
```

## 结语

这篇文章主要目的是向大家介绍这个工具, 起到快速入门的目的. 这款工具有许多的细节如自定义状态码, 过期API, 权限管理等, 因官网解释已经足够通俗易懂, 就不再此赘述了.建议移步官方[http://apidocjs.com/](https://link.zhihu.com/?target=http%3A//apidocjs.com/)